FROM node:9
WORKDIR /node/app
COPY . /node/app
RUN npm install -g yarn \
    && yarn
CMD ["yarn", "run", "start"]