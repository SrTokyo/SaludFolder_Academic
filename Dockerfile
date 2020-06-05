FROM node:13.12.0-alpine
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install 
RUN npm install react-scripts@3.4.1
COPY . . 
EXPOSE 3000
CMD ["npm","start"]