# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copiar archivos al contenedor
COPY ServerCertificate.crt /ServerCertificate.crt
COPY serverBCE.key /serverBCE.key


# Establecer variable de entorno para la contraseña
ENV KEY_PASSWORD=Cert*bce01

# Copia los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 443

# Comando para ejecutar la aplicación
CMD [ "node", "--experimental-modules", "server.mjs" ]
