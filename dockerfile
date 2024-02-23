# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./
COPY WildCard-BCE.key /WildCard-BCE.key
COPY ServerCertificate.crt /ServerCertificate.crt
COPY ChainBundle2.crt /ChainBundle2.crt

# Instala las dependencias de la aplicación
RUN npm install

# Copia los archivos de la aplicación al directorio de trabajo
COPY . .

#certificados


# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 443

# Comando para ejecutar la aplicación
CMD [ "node", "--experimental-modules", "server.mjs" ]
