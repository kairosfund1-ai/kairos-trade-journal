import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory storage for now (we'll add database later)
let trades = [];

app.get('/api/trades', (req, res) => {
  res.json(trades);
});

app.post('/api/trades', (req, res) => {
  const trade = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  trades.push(trade);
  res.json(trade);
});

app.delete('/api/trades/:id', (req, res) => {
  trades = trades.filter(t => t.id != req.params.id);
  res.json({ message: 'Trade deleted' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});