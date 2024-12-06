# Use uma imagem base do Ubuntu
FROM ubuntu:latest

# Defina o diretório de trabalho
WORKDIR /app

# Copie todos os arquivos locais para o diretório de trabalho no contêiner
COPY . /app

# Instale o Azure CLI
RUN apt-get update && \
    apt-get install -y curl apt-transport-https lsb-release gnupg && \
    curl -sL https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    AZ_REPO=$(lsb_release -cs) && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | tee /etc/apt/sources.list.d/azure-cli.list && \
    apt-get update && \
    apt-get install -y azure-cli

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para manter o contêiner em execução
CMD ["npm", "start", "tail", "-f", "/dev/null"]