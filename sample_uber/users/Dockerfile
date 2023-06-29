FROM base_image_uber_rabbit_kafka

COPY --chown=node:node . .

USER root
CMD ["npm", "run", "start:dev"]