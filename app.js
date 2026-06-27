const http = require('http');

function reverseString(str) {
    return str.split('').reverse().join('');
}

const server = http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const welcomeHeader = process.env.CUSTOM_HEADER || "🚀 Enterprise String Reversal API 🚀";

    // Route 1: System Health Check Status
    if (pathname === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "healthy", uptime: Math.floor(process.uptime()) }));
    }

    // Route 2: The Core Reversal API endpoint (Now handles pure text requests too!)
    if (pathname === '/reverse') {
        let textToReverse = "hello";
        
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

        // If the frontend asks for pure text, give it pure text; otherwise give it HTML
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ original: textToReverse, reversed: reversed, timestamp: new Date().toLocaleString() }));
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
            <h1>${welcomeHeader}</h1>
            <p>Original: <b>${textToReverse}</b></p>
            <p>Reversed: <b>${reversed}</b></p>
        `);
    }

    // Route 3: Upgraded Interactive Frontend Homepage
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Enterprise String Processing Dashboard</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #f4f7f6;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .card {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                }
                h1 { color: #333; font-size: 24px; margin-bottom: 20px; }
                input {
                    width: 80%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 6px;
                    font-size: 16px;
                    outline: none;
                    transition: border-color 0.3s;
                }
                input:focus { border-color: #007bff; }
                button {
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                button:hover { background: #0056b3; }
                .result-box {
                    margin-top: 25px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 6px;
                    text-align: left;
                    display: none;
                }
                .result-item { margin: 5px 0; font-size: 15px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>${welcomeHeader}</h1>
                <p>Enter text below to reverse it instantly via your live API:</p>
                <input type="text" id="textInput" placeholder="Type something here..." value="Finlink">
                <br>
                <button onclick="handleReverse()">Reverse Text</button>
                
                <div class="result-box" id="resultBox">
                    <div class="result-item"><strong>Original:</strong> <span id="origText"></span></div>
                    <div class="result-item"><strong>Reversed:</strong> <span id="revText"></span></div>
                    <div class="result-item" style="font-size:12px; color:#777; margin-top:10px;">
                        <small>Processed at: <span id="timeText"></span></small>
                    </div>
                </div>
            </div>

            <script>
                async function handleReverse() {
                    const inputVal = document.getElementById('textInput').value;
                    const resultBox = document.getElementById('resultBox');
                    
                    try {
                        // Call your backend API endpoint asynchronously
                        const response = await fetch('/reverse?text=' + encodeURIComponent(inputVal), {
                            headers: { 'Accept': 'application/json' }
                        });
                        const data = await response.json();
                        
                        // Inject the API response values into the DOM elements
                        document.getElementById('origText').innerText = data.original;
                        document.getElementById('revText').innerText = data.reversed;
                        document.getElementById('timeText').innerText = data.timestamp;
                        
                        resultBox.style.display = 'block';
                    } catch (err) {
                        console.error('Error fetching API:', err);
                    }
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = { reverseString, server };