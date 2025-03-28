const express = require('express');
const cors = require('cors');
const config = require('./config/config.js');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const errorHandler = require('./middleware/errorHandler');
const instituteRoutes = require('./routes/institutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', testRoutes);
app.use('/api', instituteRoutes);

// Error handler
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});