const http = require('http');

function reverseString(str) {
    return str.split('').reverse().join('');
}

const server = http.createServer((req, res) => {
    const textToReverse = req.url.slice(1) || "hello";
    const reversed = reverseString(textToReverse);

    const welcomeHeader = process.env.CUSTOM_HEADER || "🚀 Standard String Reversal Service 🚀";

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <h1>${welcomeHeader}</h1>
        <p>Original: <b>${textToReverse}</b></p>
        <p>Reversed: <b>${reversed}</b></p>
        <p>Current Time: <b>${new Date().toLocaleString()}</b></p>
    `);
});

// We ONLY export our modules now. We do NOT start the listener here!
module.exports = { reverseString, server };