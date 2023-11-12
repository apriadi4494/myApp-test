FROM node AS base

# development stage
FROM base AS development
ARG APP
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package.json package-lock.json ./ 
RUN npm install
COPY . .
RUN npm run build ${APP} 

# production stage
FROM base AS production
ARG APP
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=development /usr/src/app/dist ./dist
