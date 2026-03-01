const express = require('express');
const { Kafka } = require('kafkajs');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const app = express();
const port = 80;

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Kafka setup
const kafka = new Kafka({
  clientId: 'rachaels-conscious',
  brokers: ['localhost:9092'],
  connectionTimeout: 5000,
  requestTimeout: 30000,
  retry: { initialRetryTime: 300, retries: 10 },
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'memory-stream' });

const ssmClient = new SSMClient({ region: 'us-west-1' });

// Store connected SSE clients
let clients = [];
let memoryClients = [];

// Initialize Kafka
(async () => {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'memories', fromBeginning: true });
  
  // Consume from Kafka and broadcast to SSE clients
  await consumer.run({
    eachMessage: async ({ message }) => {
      const memory = JSON.parse(message.value.toString());
      console.log('Received memory from Kafka:', memory);
      
      // Broadcast to all SSE clients
      memoryClients.forEach(client => {
        client.write(`data: ${JSON.stringify(memory)}\n\n`);
      });
    }
  });
})();

// POST bulk memories from uploaded JSON file
app.post('/api/memories/upload', express.json(), async (req, res) => {
  const { memories } = req.body;

  if (!Array.isArray(memories) || memories.length === 0) {
    return res.status(400).json({ success: false, error: 'Body must contain a non-empty "memories" array.' });
  }

  try {
    const messages = memories.map((m) => ({
      value: JSON.stringify({
        id: Date.now() + Math.random(), // avoid collisions across batch
        position: m.position,
        name: m.name,
        fearState: m.fearState,
        courageState: m.courageState,
        timestamp: new Date().toISOString()
      })
    }));

    await producer.send({
      topic: 'memories',
      messages,
    });

    console.log(`Uploaded ${messages.length} memories to Kafka`);
    res.json({ success: true, count: messages.length });
  } catch (error) {
    console.error('Error uploading memories to Kafka:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST endpoint: Produce to Kafka instead of broadcasting directly
app.post('/api/memories', express.json(), async (req, res) => {
  const memory = {
    id: Date.now(),
    position: req.body.position,
    name: req.body.name,
    fearState: req.body.fearState,
    courageState: req.body.courageState,
    timestamp: new Date().toISOString()
  };
  
  // Send to Kafka
  await producer.send({
    topic: 'memories',
    messages: [{ value: JSON.stringify(memory) }]
  });
  
  res.json({ success: true, memory });
});

app.get('/api/memories/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  memoryClients.push(res);
  console.log(memoryClients, 'memoryClients')
  console.log(`Memory client connected. Total: ${memoryClients.length}`);

  req.on('close', () => {
    memoryClients = memoryClients.filter(c => c !== res);
    console.log(`Memory client disconnected. Total: ${memoryClients.length}`);
  });
});

// Cache for flags
let cachedFlags = { fear: true };

// Function to fetch flags from Parameter Store
async function fetchFlags() {
  try {
    const command = new GetParameterCommand({ Name: 'fear' });
    const response = await ssmClient.send(command);
    return {
      fear: response.Parameter.Value === 'true',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching flags:', error);
    return cachedFlags; // Return cached on error
  }
}

// Broadcast to all connected clients
// function broadcastFlags(flags) {
//   console.log(`Broadcasting to ${clients.length} clients:`, flags);
//   clients.forEach(client => {
//     console.log("i'm sending/broadcasting to this client now", client)
//     client.write(`data: ${JSON.stringify(flags)}\n\n`);
//   });
// }

// // Poll Parameter Store every 30 seconds
// setInterval(async () => {
//   const newFlags = await fetchFlags();
//   console.log("polling occured to Parameter Storage", newFlags);
  
//   // Only broadcast if something changed
//   if (newFlags.fear !== cachedFlags.fear) {
//     console.log('Flags changed! Broadcasting update...');
//     cachedFlags = newFlags;
//     broadcastFlags(cachedFlags);
//   }
// }, 30000);

// Initialize cached flags on startup
(async () => {
  cachedFlags = await fetchFlags();
  console.log('Initial flags loaded:', cachedFlags);
})();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, Deckard',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/flags', async (req, res) => {
  res.json(cachedFlags);
});

// SSE endpoint for real-time flag updates
app.get('/api/flags/stream', async (req, res) => {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Send initial flags immediately
  res.write(`data: ${JSON.stringify(cachedFlags)}\n\n`);
  
  // Add this client to the list
  clients.push(res);
  console.log(`Client connected. Total clients: ${clients.length}`);
  
  // Remove client when they disconnect
  req.on('close', () => {
    clients = clients.filter(client => client !== res);
    console.log(`Client disconnected. Total clients: ${clients.length}`);
  });
});

app.listen(port, () => {
  console.log(`Replicant listening on port ${port}`);
});
