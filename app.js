const express = require('express');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const app = express();
const port = 80;

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const ssmClient = new SSMClient({ region: 'us-west-1' });

// Store connected SSE clients
let clients = [];

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
function broadcastFlags(flags) {
  console.log(`Broadcasting to ${clients.length} clients:`, flags);
  clients.forEach(client => {
    console.log("i'm sending/broadcasting to this client now", client)
    client.write(`data: ${JSON.stringify(flags)}\n\n`);
  });
}

// Poll Parameter Store every 30 seconds
setInterval(async () => {
  const newFlags = await fetchFlags();
  console.log("polling occured to Parameter Storage", newFlags);
  
  // Only broadcast if something changed
  if (newFlags.fear !== cachedFlags.fear) {
    console.log('Flags changed! Broadcasting update...');
    cachedFlags = newFlags;
    broadcastFlags(cachedFlags);
  }
}, 30000);

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
