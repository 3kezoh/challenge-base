ARG NODE_TAG=lts

FROM node:${NODE_TAG} as base

RUN npm install --global pnpm

WORKDIR /home/node/api

COPY package.json pnpm-lock.yaml ./

RUN pnpm fetch

RUN pnpm install --offline

COPY tsconfig.json .



FROM base as development

CMD ["pnpm", "run", "start:dev"]



FROM base as production_base

COPY src src

RUN pnpm build

RUN pnpm prune --prod



FROM node:${NODE_TAG} as production

WORKDIR /home/node/api

COPY --from=production_base /home/node/api/node_modules ./node_modules

COPY --from=production_base /home/node/api/dist .

EXPOSE 3000

ENV NODE_ENV production

USER node

CMD ["node", "main.js"]