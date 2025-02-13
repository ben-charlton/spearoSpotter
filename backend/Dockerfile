FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts && npm install esbuild-linux-64 --no-save

COPY . .

EXPOSE 5000

CMD ["npm", "start"]