# Use uma imagem base oficial do Node.js
FROM node:16

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]