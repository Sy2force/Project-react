/**
 * 🚀 SERVEUR SIMPLE - SOLUTION IMMÉDIATE
 * 
 * ✅ Serveur HTTP natif Node.js (pas d'Express)
 * ✅ Aucune dépendance externe problématique
 * ✅ API d'authentification intégrée
 * ✅ Interface web simple
 */

import http from 'http';
import url from 'url';
import querystring from 'querystring';

const PORT = 4000;

// Base de données en mémoire
const users = [
  {
    id: 1,
    email: 'shayacoca20@gmail.com',
    fullName: 'Shay Acoca',
    password: 'Qwerty2121@', // En production, utilisez bcrypt
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@test.com',
    fullName: 'User Test',
    password: 'password123',
    role: 'user'
  }
];

// Sessions simples (en mémoire)
const sessions = new Map();

// Fonction pour générer un ID de session
function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Fonction pour parser le body des requêtes POST
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
  });
}

// Fonction pour envoyer une réponse JSON
function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.end(JSON.stringify(data));
}

// Fonction pour envoyer du HTML
function sendHTML(res, html) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}

// Serveur HTTP
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Gestion CORS
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // Routes API
  if (path.startsWith('/api/')) {
    
    // Route de connexion
    if (path === '/api/auth/login' && method === 'POST') {
      const body = await parseBody(req);
      const { email, password } = body;

      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const sessionId = generateSessionId();
        sessions.set(sessionId, { userId: user.id, email: user.email, role: user.role });
        
        sendJSON(res, {
          ok: true,
          success: true,
          message: 'Connexion réussie',
          user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
          sessionId
        });
      } else {
        sendJSON(res, { message: 'Email ou mot de passe incorrect' }, 401);
      }
      return;
    }

    // Route d'inscription
    if (path === '/api/auth/register' && method === 'POST') {
      const body = await parseBody(req);
      const { fullName, email, password, vipCode } = body;

      if (users.find(u => u.email === email)) {
        sendJSON(res, { message: 'Email déjà utilisé' }, 400);
        return;
      }

      let role = 'user';
      if (vipCode === '2323') role = 'admin';
      else if (vipCode === '1234' || vipCode === '5678') role = 'business';

      const newUser = {
        id: users.length + 1,
        email,
        fullName,
        password,
        role
      };

      users.push(newUser);

      const sessionId = generateSessionId();
      sessions.set(sessionId, { userId: newUser.id, email: newUser.email, role: newUser.role });

      sendJSON(res, {
        ok: true,
        success: true,
        message: 'Inscription réussie',
        user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role },
        sessionId
      }, 201);
      return;
    }

    // Route de santé
    if (path === '/api/health' && method === 'GET') {
      sendJSON(res, {
        ok: true,
        message: 'Serveur simple opérationnel',
        timestamp: new Date().toISOString(),
        users: users.length,
        sessions: sessions.size
      });
      return;
    }

    // Route API non trouvée
    sendJSON(res, { message: 'Route API non trouvée' }, 404);
    return;
  }

  // Page d'accueil
  if (path === '/' || path === '/index.html') {
    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 Portfolio React - Serveur Simple</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255,255,255,0.2);
            max-width: 800px;
            margin: 20px;
        }
        h1 { font-size: 3rem; margin-bottom: 20px; }
        .subtitle { font-size: 1.3rem; margin-bottom: 30px; opacity: 0.9; }
        .status { 
            background: rgba(0,255,0,0.2); 
            padding: 15px 25px; 
            border-radius: 15px; 
            margin: 30px 0;
            border: 1px solid rgba(0,255,0,0.3);
            font-size: 1.1rem;
        }
        .accounts {
            background: rgba(255,255,255,0.1);
            padding: 25px;
            border-radius: 15px;
            margin: 30px 0;
            text-align: left;
        }
        .account { 
            margin: 12px 0; 
            font-family: 'Courier New', monospace; 
            font-size: 1rem;
            padding: 8px;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        }
        .btn {
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 15px 30px;
            border-radius: 12px;
            text-decoration: none;
            display: inline-block;
            margin: 15px;
            transition: all 0.3s ease;
            font-size: 1rem;
            font-weight: 500;
        }
        .btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .api-test {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
        }
        .success { color: #4ade80; }
        .error { color: #f87171; }
        input, button {
            padding: 12px;
            margin: 8px;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 1rem;
        }
        input::placeholder { color: rgba(255,255,255,0.7); }
        button {
            background: rgba(59, 130, 246, 0.8);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        button:hover {
            background: rgba(59, 130, 246, 1);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Portfolio React</h1>
        <p class="subtitle">Serveur Simple Opérationnel - Solution Sans Conflit</p>
        
        <div class="status">
            ✅ Serveur HTTP natif actif sur le port ${PORT}
        </div>
        
        <div class="accounts">
            <h3>🔑 Comptes de test disponibles :</h3>
            <div class="account">👤 <strong>Admin:</strong> shayacoca20@gmail.com / Qwerty2121@</div>
            <div class="account">👤 <strong>User:</strong> user@test.com / password123</div>
            <div class="account">🏆 <strong>Code VIP Admin:</strong> 2323</div>
            <div class="account">💼 <strong>Code VIP Business:</strong> 1234 ou 5678</div>
        </div>

        <div class="api-test">
            <h3>🧪 Test de l'API d'authentification :</h3>
            <div>
                <input type="email" id="email" placeholder="Email" value="user@test.com">
                <input type="password" id="password" placeholder="Mot de passe" value="password123">
                <button onclick="testLogin()">🔐 Tester la connexion</button>
            </div>
            <div id="result" style="margin-top: 15px;"></div>
        </div>
        
        <div>
            <a href="/api/health" class="btn">🔍 API Health Check</a>
            <a href="http://localhost:3000" class="btn">🚀 Frontend React (si actif)</a>
        </div>

        <div style="margin-top: 30px; opacity: 0.8;">
            <p>✅ <strong>Problème des serveurs résolu !</strong></p>
            <p>Ce serveur simple fonctionne sans conflit de port ni dépendance problématique.</p>
        </div>
    </div>

    <script>
        async function testLogin() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = document.getElementById('result');
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    result.innerHTML = '<div class="success">✅ Connexion réussie ! Utilisateur: ' + data.user.fullName + ' (' + data.user.role + ')</div>';
                } else {
                    result.innerHTML = '<div class="error">❌ ' + data.message + '</div>';
                }
            } catch (error) {
                result.innerHTML = '<div class="error">❌ Erreur de connexion: ' + error.message + '</div>';
            }
        }
    </script>
</body>
</html>`;
    
    sendHTML(res, html);
    return;
  }

  // Page 404
  sendHTML(res, `
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f0f0;">
        <h1>404 - Page non trouvée</h1>
        <p><a href="/">Retour à l'accueil</a></p>
      </body>
    </html>
  `);
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`\n🚀 ===== SERVEUR SIMPLE DÉMARRÉ =====`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔧 Type: Serveur HTTP natif Node.js`);
  console.log(`🌐 API: http://localhost:${PORT}/api/*`);
  console.log(`\n👥 COMPTES DE TEST:`);
  console.log(`   🔑 Admin: shayacoca20@gmail.com / Qwerty2121@`);
  console.log(`   👤 User: user@test.com / password123`);
  console.log(`\n📋 CODES VIP:`);
  console.log(`   🏆 Admin: 2323`);
  console.log(`   💼 Business: 1234 ou 5678`);
  console.log(`\n✅ AUCUNE DÉPENDANCE PROBLÉMATIQUE !`);
  console.log(`✅ AUCUN CONFLIT DE PORT !`);
  console.log(`✅ SOLUTION DÉFINITIVE !`);
  console.log(`=====================================\n`);
});
