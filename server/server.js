require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log('[sentinelzone] server running on http://localhost:' + PORT);
    console.log('[sentinelzone] model provider: ' + (process.env.MODEL_PROVIDER || 'mock'));
  });
})();
