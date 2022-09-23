# Base image
FROM node:16-alpine as builder

# Create app directory
RUN npm --global install pnpm
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install app dependencies
RUN pnpm install --frozen-lockfile
# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build

FROM node:16-alpine

RUN npm --global install pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
# Start the server using the production build
CMD [ "pnpm", "run", "server" ]
