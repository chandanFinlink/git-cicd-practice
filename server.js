// Import the server configuration from app.js
const { server } = require('./app');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});