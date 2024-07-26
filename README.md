# Athlete-Reserve-App

## Updated Local Dev Environment

### Prerequisites:

- Install Docker and Docker Compose
- Install Orbstack (Container management software)
  - Note for Windows Users:
    Orbstack is not necessary on Windows; Docker and Docker Compose are sufficient for local development.

### How to run:

- Update files `./server/db/db-setup.ts` and `./server/db/knexfile.ts` as per comments to run locally
- Update the .env files for local dev per the comment inside the file
- Change directories into the `./server` directory
- Run `docker-compose build` to build the images specified in the docker-compose file
- Run `docker-compose up` to start containers
- or another option Run `docker-compose up -d` which runs the containers in detached mode,This allows to continue
  using the same terminal session while your containers are running.
- Open new termimal and run below commands in `./server` directory
- run `npm install` to install necessary dependencies
- Run `npm run migrate` to run all database migrations (will be automated eventually)
- Run `npm run seed` to seed local DB with data from SMA (will be automated eventually)

You should now have a container running a backend server (`localhost:8000`), a container running a postgres database (`localhost:5432`) and a container running a PGAdmin instance (`localhost:5050`). Simply run the frontend and direct all requests to the backend server in your local environment to simulate the full stack application locally

## Running the backend (NO LONGER NEEDED BUT can also be used for local development without using the docker)

The backend server is an Express.js application which can be run by doing the following:

1. Clone this repo locally
2. Navigate to the `/server` directory
3. Run `npm install`
4. Run `npm start`

# Running the frontend

### Admin Frontend

The admin frontend is a React App which can be run by doing the following after cloning the repo and installing npm:

-Update `./admin/src/url.js` file per comments to run locally

1. Navigate to the `./admin` directory
2. Run `npm install` to install dependencies
3. Run `npm start`, when deploying to production run `npm run build`
