FROM node:4.3.1

COPY src /opt/app
RUN npm install moment --save
EXPOSE 2205
CMD ["node", "/opt/app/Auditor.js"]