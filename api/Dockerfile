FROM node:carbon
WORKDIR /api

COPY package.json .
RUN npm install
COPY . .
COPY wait-for-it.sh /
RUN chmod +x /wait-for-it.sh
EXPOSE 3001

ENTRYPOINT ["/bin/bash"]