FROM node:carbon

WORKDIR /usr/src/client

COPY package.json ./
RUN npm install
COPY . .
RUN npm run-script build

EXPOSE 3000
CMD ["npm", "start"]