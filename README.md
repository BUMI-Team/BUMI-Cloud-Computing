
# BUMI-Cloud-Computing
## Table of Contents
- [Contributor](#contributor)
- [Description](#description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
	- [Sign Up](#1-sign-up)
	- [Sign In](#2-sign-in)
	- [Sign Out](#3-sign-out)
	- [Get User by UID](#4-get-user-by-uid)
	- [Update User by UID](#5-update-user-by-uid)
	- [Add Recommender](#6-add-recommender)
	- [Get Recommender](#7-get-recommender)
## Contributor
| Name | Bangkit ID |
| ------ | ------ | 
| Hilbert Hasiholan Purba | C2003F0132 |
## Overview
This repository contains a backend application used for our android app, BUMI (Bangun UMKM Indonesia), which includes endpoints of CRUD of user, and recommendation. If you're looking for the machine learning API, please refer to [this repo](https://github.com/BUMI-Team/recommendation-api) instead.

We use javascript as our programming language running in a node.js environment, and use express.js as our web service application to handle the endpoints.

Cloud services that we use are as follows:
- [Cloud Run](https://cloud.google.com/run) (App Deployment).
- [Firebase Auth](https://firebase.google.com/docs/auth) (User Management).
- [Cloud Firestore](https://firebase.google.com/docs/firestore) (Data Management).

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
Test the endpoint using Postman before deployment, refer to [this section](#api-endpoints) for more information.
## Deployment
In order to deploy our REST API, containerize the app into a docker image, push the image to the cloud container registry, then deploy it using Cloud Run.

1. Build the docker image.
```
docker build -t asia.gcr.io/<your-gcp-project>/bumi-team/bumi-api:latest .
```
2. Push the image the container registry.
```
docker push asia.gcr.io/<your-gcp-project>/bumi-team/bumi-api:latest
```
3. Deploy the image to cloud run.
	- One the GCP (Google Cloud Platform) console, go to **"Navigation Menu --> Cloud Run"**.
	- Click on "**New Service**".
	- Choose **"Deploy one revision from an existing container image"**, and choose the docker image that has been pushed.
	- Select the region **"asia-southeast-2"**.
	- For the authentication, select **"Allow unauthenticated invocations"**.
	- Click **"Create"**.
## API Endpoints
### 1. Sign Up
- URL: `/api/auth/signup`
- Method: POST
- Request Body:
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
            "expirationTime": "<epoch-time>"
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
    "error": "<error-message-here>"
}
```
### 2. Sign In
- URL: `/api/auth/signin`
- Method: **POST**
- Request Body:
```json
{
    "email": "<your-name>@example.com",
    "password": "<your-password>"
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
            "expirationTime": "<epoch-time>"
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
    "error": "<error-message>"
}
```

### 3. Sign Out
- URL: `/api/auth/signout`
- Method: **GET**
- Success Response
```json
{
    "code": 200,
    "message": "User signed out"
}
```
**Note: For the next endpoint onwards, please include a bearer token on the request header.**
`Authorization: Bearer <your-access-token>`
### 4. Get User by UID
- URL: `/api/user`
- Method: **GET**
- Request Header: `Authorization: Bearer <your-access-token>`
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
                "uid": "<your-uid>",
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
    "error": "<error-message>"
}
```
### 5. Update User by UID
- URL: `/api/user`
- Method: **PATCH**
- Request Header: `Authorization: Bearer <your-access-token>`
- Request Body, e.g:
```json
{
    "displayName": "<your-new-name>",
    "email": "<your-new-email>@example.com"
}
```
- Success Response
```json
{
    "code": 200,
    "userRecord": {
        "uid": "<your-uid>",
        "email": "<your-new-email>@example.com",
        "emailVerified": true,
        "displayName": "<your-new-name>",
        "disabled": false,
        "metadata": {
            "lastSignInTime": "<timestamp>",
            "creationTime": "<timestamp>"
        },
        "tokensValidAfterTime": "<timestamp>",
        "providerData": [
            {
                "uid": "<your-uid>",
                "displayName": "<your-new-name>",
                "email": "<your-new-email>@example.com",
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
    "error": "<error-message>"
}
```
### 6. Add Recommender
- URL: `/api/recommender`
- Method: **POST**
- Request Header: `Authorization: Bearer <your-access-token>`
- Request Body: 
```json
{
    "punya_usaha": true,
    "bidang_keahlian": ["kesehatan"],
    "hobi": ["baca", "nonton", "makan", "travelling", "olahraga"],
    "modal_usaha": "between_50_and_100",
    "nama_usaha": "nama_usaha-1"
}
```
- Success Response: 
```json
{
    "code": 200,
    "message": "Successfully added input recommender with ID: <your-uid>"
}
```
- Error Response:
```json
{
    "code": 403,
    "error": "<error-message>"
}
```
### 7. Get Recommender
- URL: `/api/recommender`
- Method: **GET**
- Request Header: `Authorization: Bearer <your-access-token>`
- Success Response:
```json
{
    "code": 200,
    "doc": {
	    "uid": "<your-uid>",
	    "punya_usaha": true,
	    "bidang_keahlian": [
            "kesehatan"
        ],
        "hobi": [
            "baca",
            "nonton",
            "makan",
            "travelling",
            "olahraga"
        ],
        "modal_usaha": "between_50_and_100",
        "nama_usaha": "nama_usaha-10"
    }
}
```
- Error Response

If the token expired.
```json
{
    "code": 403,
    "error": "<error-message>"
}
```
If the recommender data was not found
```json
{
    "code": 403,
    "message": "Document does not exist!"
}
```
Copyright © 2022, [BUMI Team](https://github.com/BUMI-Team).
