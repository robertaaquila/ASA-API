# Use a imagem base oficial do Node.js
FROM node:20.16

# Defina argumentos de construção
ARG DB_CONN
ARG JWT_SECRET

# Defina variáveis de ambiente usando os argumentos de construção
ENV DB_CONN=${DB_CONN}
ENV JWT_SECRET=${JWT_SECRET}

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