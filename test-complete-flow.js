#!/usr/bin/env node

// Test complet du flow d'inscription et connexion
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5001/api';

async function testRegistration() {
  console.log('🧪 Test d\'inscription...');
  
  const userData = {
    name: 'Test Complete User',
    email: `testcomplete${Date.now()}@example.com`,
    password: 'password123'
  };

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Inscription réussie:', result.user.email);
      return userData;
    } else {
      console.log('❌ Échec inscription:', result.message);
      return null;
    }
  } catch (error) {
    console.log('💥 Erreur inscription:', error.message);
    return null;
  }
}

async function testLogin(email, password) {
  console.log('🔐 Test de connexion...');
  
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Connexion réussie:', result.user.email);
      return true;
    } else {
      console.log('❌ Échec connexion:', result.message);
      return false;
    }
  } catch (error) {
    console.log('💥 Erreur connexion:', error.message);
    return false;
  }
}

async function testDemoAccounts() {
  console.log('🎭 Test des comptes démo...');
  
  const demoAccounts = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'password123' },
    { email: 'business@example.com', password: 'password123' }
  ];

  for (const account of demoAccounts) {
    const success = await testLogin(account.email, account.password);
    if (success) {
      console.log(`✅ Compte démo ${account.email} fonctionne`);
    } else {
      console.log(`❌ Compte démo ${account.email} ne fonctionne pas`);
    }
  }
}

async function runCompleteTest() {
  console.log('🚀 Démarrage des tests complets...\n');
  
  // Test 1: Inscription d'un nouvel utilisateur
  const newUser = await testRegistration();
  
  // Test 2: Connexion avec le nouvel utilisateur
  if (newUser) {
    await testLogin(newUser.email, newUser.password);
  }
  
  console.log('');
  
  // Test 3: Comptes démo
  await testDemoAccounts();
  
  console.log('\n🎯 Tests terminés!');
}

runCompleteTest().catch(console.error);
