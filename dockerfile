# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia los archivos de la aplicación al directorio de trabajo
COPY . .

# Copia los certificados SSL al contenedor
COPY server.key server.cer

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "node", "--experimental-modules", "server.mjs" ]
