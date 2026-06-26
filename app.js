const http = require('http');

function reverseString(str) {
    return str.split('').reverse().join('');
}

const server = http.createServer((req, res) => {
    const textToReverse = req.url.slice(1) || "hello";
    const reversed = reverseString(textToReverse);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <h1>🚀 Chandan's Advanced String Reversal Service 🚀</h1>
        <p>Original: <b>${textToReverse}</b></p>
        <p>Reversed: <b>${reversed}</b></p>
        <p>Current Time: <b>${new Date().toLocaleString()}</b></p>
    `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = reverseString;