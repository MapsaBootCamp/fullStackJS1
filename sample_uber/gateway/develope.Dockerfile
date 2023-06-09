FROM base_image_uber

COPY --chown=node:node . .

USER root
CMD ["npm", "run", "start:dev"]