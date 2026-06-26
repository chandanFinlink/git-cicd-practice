const http = require('http');

function reverseString(str) {
    return str.split('').reverse().join('');
}

const server = http.createServer((req, res) => {
    // Isolate the base path from any appended query parameters
    const [pathname, queryString] = req.url.split('?');
    
    const welcomeHeader = process.env.CUSTOM_HEADER || "🚀 Enterprise String Reversal API 🚀";

    // Route 1: System Health Check Status
    if (pathname === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "healthy", uptime: Math.floor(process.uptime()) }));
    }

    // Route 2: The Core Reversal API endpoint
    if (pathname === '/reverse') {
        let textToReverse = "hello";
        
        // Safely extract the 'text' value out of the query parameter string manually
        if (queryString) {
            const params = queryString.split('&');
            for (let param of params) {
                const [key, value] = param.split('=');
                if (key === 'text' && value) {
                    textToReverse = decodeURIComponent(value);
                    break;
                }
            }
        }

        const reversed = reverseString(textToReverse);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
            <h1>${welcomeHeader}</h1>
            <p>API Mode: <b>Query Parameter Detected</b></p>
            <p>Original: <b>${textToReverse}</b></p>
            <p>Reversed: <b>${reversed}</b></p>
            <p>Current Time: <b>${new Date().toLocaleString()}</b></p>
        `);
    }

    // Route 3: Default Homepage (Fallback)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <h1>${welcomeHeader}</h1>
        <p>Welcome! To use this service, pass a string to the API using query parameters:</p>
        <code>/reverse?text=Chandan</code>
    `);
});

module.exports = { reverseString, server };