# Use a imagem base oficial do Node.js
FROM node:20.16

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]