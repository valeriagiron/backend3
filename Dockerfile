# Usa la imagen oficial de Node.js (ajusta a la versión que usas en tu proyecto)
FROM node:alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

# Instala las dependencias DENTRO del contenedor para compilar correctamente bcrypt
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto que usas (debe coincidir con el de tu .env)
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]