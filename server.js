// Import the server configuration from app.js
const { server } = require('./app');
// Deliberately breaking the import to simulate a bad developer mistake
const { server } = require('./app-BROKEN-FILE');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});