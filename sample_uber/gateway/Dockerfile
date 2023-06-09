FROM base_image_uber

RUN npm install -g pm2 

COPY --chown=node:node . .

RUN npm run build

USER root
CMD ["pm2", "start", "--no-daemon","./dist/main.js"]