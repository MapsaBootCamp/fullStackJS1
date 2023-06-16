FROM base_image_uber_rabbit

COPY --chown=node:node . .

USER root
CMD ["npm", "run", "start:dev"]