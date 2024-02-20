import express from 'express';
import https from 'https';
import fs from 'fs';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para configurar CORS
app.use(cors({
  origin: '*',
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Ruta para obtener el token
app.post('/get-token', async (req, res) => {
  try {
    // Datos para la solicitud del token
    const tokenData = new URLSearchParams({
      'grant_type': 'password',
      'resource': 'https://analysis.windows.net/powerbi/api',
      'username': process.env.PBI_USERNAME,
      'password': process.env.PBI_PASSWORD,
      'client_id': process.env.PBI_CLIENT_ID,
      'client_secret': process.env.PBI_CLIENT_SECRET,
      'scope': 'Dataset.ReadWrite.all'
    });

    // Configuración de la solicitud del token
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenData,
    };

    // Realizar la solicitud del token a Microsoft
    const response = await fetch('https://login.microsoftonline.com/common/oauth2/token', requestOptions);

    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      console.error('Error al obtener el token:', response.statusText);
      return res.status(response.status).json({ error: 'Error al obtener el token' });
    }

    // Extraer datos de la respuesta
    const data = await response.json();

    // Devolver el token como respuesta al cliente
    res.json(data);
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Configuración de opciones HTTPS
const options = {
  key: fs.readFileSync('server.key'),  // Reemplaza con la ruta completa si es necesario
  cert: fs.readFileSync('server.cert'), // Reemplaza con la ruta completa si es necesario
};

// Crear servidor HTTPS
const server = https.createServer(options, app);

server.on('error', (error) => {
  console.error('Error en el servidor HTTPS:', error);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT} con HTTPS`);
});
