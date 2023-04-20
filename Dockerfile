# Basisimage
FROM node:16

# Arbeitsverzeichnis
WORKDIR /app

# Kopieren der Abhängigkeiten
COPY package*.json ./
COPY prisma ./prisma/

# Installieren der Abhängigkeiten
RUN npm install

RUN npx prisma generate

# Kopieren des Rests des Codes
COPY . .

RUN npm run build

# Port
EXPOSE 3000

