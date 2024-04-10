FROM node:20-alpine

# copies files in the folder app
COPY package.json /app/
COPY Marker-based /app/

WORKDIR /app

# create node modules folder inside container
RUN npm install

CMD ["node", "server.js"]