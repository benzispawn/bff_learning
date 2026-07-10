# BFF Microservices

This folder contains the code to run the backend application that will provide data to mobile apps.

## Running 

You will need to install Docker to run this application. The Docker version used in the development was `27.4.0, build bde2b89`.

To start MongoDB via Docker Compose, navigate to this directory and run:

```
docker compose up
```

To start the applications locally (after Mongo is up):

```
npm run start:all
```

The Swagger documentation will be avaliable at `http://localhost:3001/api/v1`.

OBS: If you are running for the second time (after feching changes from the remote repository), it is recommended to run this command with the `--build` flag, as follows:

```
docker compose up --build
```

## Bruno API Client

Install Bruno from: https://www.usebruno.com/downloads

Open the `bruno/` collection in the repo to run the API requests.

## Tests

From this folder, you can run:

```
npm run test
npm run test:e2e:one
npm run test:e2e:one:record-snapshot
npm run test:e2e:one:record-fixture
```

# API Documentation

## Authentication

### Login
- **Endpoint**: `POST /api/v1/login`
- **Request Body**:
  ```json
  {
    "user": "trailblazers",
    "password": "12345"
  }

### Response:
- **Response from**: `POST /api/v1/login`
  ```json 
  {
    "accessToken": "ABC.."
  }

### Logout
- **Endpoint**: `POST /api/v1/logout`

## Presentation (Onboarding)
- **Endpoint**: `GET /api/v1/presentation`
- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Response**:
  - text1: ""
  - carousel: 
    - name: "image1"
    - title: ""
    - subtitle: "test <bold>test</bold> test"
    - (3 more objects)
  - buttonText: "Continue"

## Home
- **Endpoint**: `GET /api/v1/home`
- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Description**: Returns stories, images, titles, and a carousel with images and text.
- **Response**: 
  - Response structure to be defined

## Research
- **Endpoint**: `GET /api/v1/research`
- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Description**: Returns CI&T clients with links and images.
- **Response**: 
  - Response structure to be defined

## User Profile
- **Endpoint**: `GET /api/v1/me`
- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Description**: Returns user profile information.
- **Response**: 
  - Response structure to be defined
