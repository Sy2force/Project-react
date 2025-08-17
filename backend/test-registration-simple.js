// Test simple registration without external dependencies
const http = require('http');

const testData = JSON.stringify({
  name: 'Test User Simple',
  email: `test${Date.now()}@example.com`,
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('🧪 Testing registration with:', JSON.parse(testData));

const req = http.request(options, (res) => {
  console.log(`📊 Status: ${res.statusCode}`);
  console.log(`📄 Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📝 Response Body:', data);
    if (res.statusCode === 201) {
      console.log('✅ Registration successful!');
    } else {
      console.log('❌ Registration failed');
    }
  });
});

req.on('error', (error) => {
  console.error('💥 Request error:', error);
});

req.write(testData);
req.end();
