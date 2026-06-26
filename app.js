const http = require('http');

// Our core logic remains the same
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Create a server that responds to web requests
const server = http.createServer((req, res) => {
    // Get the text from the URL path, e.g., /hello -> hello
    const textToReverse = req.url.slice(1) || "hello";
    const reversed = reverseString(textToReverse);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // res.end(`
    //     <h1>String Reversal Service</h1>
    //     <p>Original: <b>${textToReverse}</b></p>
    //     <p>Reversed: <b>${reversed}</b></p>
    // `);

    res.end(`
    <h1>🚀 Chandan's Advanced String Reversal Service 🚀</h1>
    <p>Original: <b>${textToReverse}</b></p>
    <p>Reversed: <b>${reversed}</b></p>
`);
});

// Use the port provided by the cloud platform, or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Keep this export at the bottom so our test file doesn't break!
module.exports = reverseString;