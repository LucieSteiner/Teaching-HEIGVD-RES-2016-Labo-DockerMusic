FROM node:4.3.1

COPY src /opt/app
RUN npm install moment
EXPOSE 2205
CMD ["node", "/opt/app/Auditor.js"]