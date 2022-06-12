# BUMI-Cloud-Computing

## Description
This repository contains a backend application used for our android app, BUMI (Bangun UMKM Indonesia), which includes endpoints of CRUD of user, and recommendation. If you're looking for the machine learning API, please refer to [this repo](github.com/elangaditya/recommendation-api) instead.

We use javascript as the programming language running in a node.js environment, and use express.js as our web service application to handle the endpoints.

## Requirements
1. Any text editor (preferably [Visual Studio Code](https://code.visualstudio.com/)).
3. [Node.js](https://nodejs.org/en/). 
4. [Postman](https://www.postman.com/downloads/).
5. [Docker Engine](https://docs.docker.com/engine/install/).

## Installation
1. Clone this repository
```
git clone https://github.com/BUMI-Team/BUMI-Cloud-Computing
cd BUMI-Cloud-Computing
```
2. Install all the dependencies needed.
```
npm install
```
3. Create a firebase project and download the API key for the Web Firebase Client SDK and `serviceAccountKey.json` from Firebase Admin SDK. 
4. Make a `.env` file (template given in `.env.example`) and fill all the variables according to the key downloaded. 
5. Run the server (test). This should run on `localhost:8080`.
```
npm run dev
```
## Deployment
In order to deploy our REST API, containerize the app into a docker image, push the image to the cloud container registry, then deploy it using Cloud Run.

1. Build the docker image.
```
docker build -t asia.gcr.io/<your-gcp-project>/bumi-team/bumi-api:latest .
```
2. Push the image the container registry.
```
docker push asia.gcr.io/<your-gcp-project>/bumi-team/bumi-api:latest .
```
## API Endpoints
### 1. SignUp
- URL: `/api/auth/signup`
- Method: POST
- Request Data
```json
{
    "displayName":"<your-name>",
    "email":"<your-name>@example.com",
    "password":"<your-password>"
}
```
- Success Response
```json
{
    "code": 200,
    "userCredential": {
        "uid": "<uid>",
        "email": "<your-name>@example.com",
        "emailVerified": false,
        "displayName": "<your-name>",
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "<uid>",
                "displayName": "<your-name>",
                "email": "<your-name>@example.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "<your-refresh-token>",
            "accessToken": "<your-access-token>",
            "expirationTime": <epoch-time>
        },
        "createdAt": "<epoch-time>",
        "lastLoginAt": "<epoch-time>",
        "apiKey": "<api-key>",
        "appName": "[DEFAULT]"
    }
}
```
- Error Response
```json
{
    "code": 400,
    "error": <error-message-here>
}
```
### 2. SignIn
- URL: `/api/auth/signin`
- Method: POST
- Request Data
```json
{
    "email":"<your-name>@example.com",
    "password":"<your-password>"
}
```
- Success response
```json
{
    "code": 200,
    "userCredential": {
        "uid": "<uid>",
        "email": "<your-name>@example.com",
        "emailVerified": false,
        "displayName": "<your-name>",
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "<uid>",
                "displayName": "<your-name>",
                "email": "<your-name>@example.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "<your-refresh-token>",
            "accessToken": "<your-access-token>",
            "expirationTime": <epoch-time>
        },
        "createdAt": "<epoch-time",
        "lastLoginAt": "<epoch-time>",
        "apiKey": "<api-key>",
        "appName": "[DEFAULT]"
    }
}
```
- Error response
```json
{
    "code": 400,
    "error": <error-message>
}
```

### 2. SignOut
- URL: `/api/auth/signout`
- Method: GET
- Success Response
```json
{
    "code": 200,
    "message": "User signed out"
}
```
**Note: For the next endpoint onwards, please include a bearer token on the request header.**
`Authorization: Bearer <your-access-token>`
### 3. Get User by UID
- URL: `/api/user`
- Method: GET
- Success Response
```json
{
    "code": 200,
    "userRecord": {
        "uid": "<your-uid>",
        "email": "<your-email>@example.com",
        "emailVerified": true,
        "displayName": "<your-name>",
        "disabled": false,
        "metadata": {
            "lastSignInTime": "<timestamp>",
            "creationTime": "<timestamp>"
        },
        "tokensValidAfterTime": "<timestamp>",
        "providerData": [
            {
                "uid": "<your-name>@example.com",
                "displayName": "<your-name>",
                "email": "<your-name>@example.com",
                "providerId": "password"
            }
        ]
    }
}
```
- Error Response
```json
{
    "code": 403,
    "error": <error-message>
}
```
