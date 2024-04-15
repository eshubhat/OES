const express = require('express');
const cors = require('cors');
const dbConfig = require('./src/config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const examAttemptRoutes = require('./routes/examAttemptRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Use express.json() instead of bodyParser.json()

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/exam-attempts', examAttemptRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});