// import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5001/api';

async function testRegister() {
  console.log('🧪 Testing user registration...');
  
  const testUser = {
    name: 'Test User Registration',
    email: `test${Date.now()}@example.com`,
    password: 'password123'
  };

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });

    const data = await response.text();
    
    console.log('📊 Response Status:', response.status);
    console.log('📄 Response Headers:', Object.fromEntries(response.headers));
    console.log('📝 Response Body:', data);

    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('📧 Test email:', testUser.email);
      console.log('🔑 Test password:', testUser.password);
    } else {
      console.log('❌ Registration failed');
    }

  } catch (error) {
    console.error('💥 Error testing registration:', error.message);
  }
}

testRegister();
