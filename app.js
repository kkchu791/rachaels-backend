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

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, Kirk',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/flags', async (req, res) => {
  try {
    const command = new GetParameterCommand({
      Name: 'fear'
    });
    
    const response = await ssmClient.send(command);
    const fearActive = response.Parameter.Value === 'true';
    
    res.json({
      fear: fearActive,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching flags:', error);
    res.status(500).json({ error: 'Failed to fetch flags' });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
