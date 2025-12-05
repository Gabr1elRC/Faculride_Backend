# =====================================================
# FASE 1 - BUILD (compila o TypeScript para JavaScript)
# =====================================================
FROM node:20-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os manifests primeiro (melhor uso de cache)
COPY package*.json ./

# Instala TODAS as dependências (inclui dev, pq vamos compilar TS)
RUN npm ci

# Copia o restante do código
COPY . .

# Compila o TypeScript (precisa ter "build": "tsc" no package.json)
RUN npm run build

# =====================================================
# FASE 2 - RUNTIME (imagem final, mais leve, só com deps de produção)
# =====================================================
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copia apenas package.json/package-lock.json
COPY package*.json ./

# Instala só dependências de produção
RUN npm ci --omit=dev

# Copia os arquivos compilados da FASE 1
COPY --from=builder /app/dist ./dist

# Porta que a API usa (ajuste se for diferente)
EXPOSE 3000

# Comando para iniciar a API
# Certifique-se de que o build gera dist/app.js
CMD ["node", "dist/app.js"]
