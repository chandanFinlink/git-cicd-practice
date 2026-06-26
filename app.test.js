const reverseString = require('./app');

console.log("Running test: reverseString('hello')...");

if (reverseString('hello') === 'olleh') {
    console.log("✅ TEST PASSED");
    process.exit(0); 
} else {
    console.error("❌ TEST FAILED");
    process.exit(1); 
}