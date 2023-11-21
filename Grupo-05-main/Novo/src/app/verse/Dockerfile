# Escolha uma imagem oficial do Node com versão 18 como imagem base
FROM node:18.17

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Informe a porta que o container irá expor
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start", "--turbo"]
