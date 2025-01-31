# SpearoSpotter

SpearoSpotter is an app designed to help divers with recommendations on dive spots based on real-time weather and water conditions. It provides users with data on water visibility, temperature, wave height, wind speed, and other dive-related factors to help them plan their next dive. This app is built using a full-stack approach with a Node.js (TypeScript) backend and a React frontend

## Backend 

The backend is built using Node.js and TypeScript, with Express.js for handling HTTP requests. The backend is responsible for serving data to the frontend, as well as performing computations (like generating recommendations) based on real-time dive conditions.

Data about dive locations and conditions are persisted with PostgreSQL, using Knex.js for query building and db migrations

### dependencies

```
npm install express cors body-parser
npm install --save-dev typescript ts-node @types/express @types/node @types/cors
npm install knex pg
```

## Frontend

The frontend is built using React and TypeScript, and bundled using [Vite](https://vite.dev/) for fast development and build times. Vite was chosen due to its performance improvements over traditional bundlers like Webpack. It supports modern TypeScript features and is highly optimized for fast development workflows.

Nginx is used to serve the build.

### dependencies
```
npm install vite @vitejs/plugin-react typescript --save-dev
```

## Spinning up the app 
```
docker-compose up --build
```