# BUMI-Cloud-Computing

## API endpoints for Android

1. Sign Up, Sign In, Sign Out.

```
https://bumi-api-y4qukd55aq-et.a.run.app/api/auth/signup (POST)
https://bumi-api-y4qukd55aq-et.a.run.app/api/auth/signin (POST)
https://bumi-api-y4qukd55aq-et.a.run.app/api/auth/signout (GET) ???
```

For hitting this API onwards please include a bearer token in the request header.
e.g: `Authorization: Bearer <accessToken>`

### Cloud Run

2. Get, Update User

```
https://bumi-api-y4qukd55aq-et.a.run.app/api/user (GET)
https://bumi-api-y4qukd55aq-et.a.run.app/api/user (PATCH)
```

3. Create, and Get Recommender

```
https://bumi-api-y4qukd55aq-et.a.run.app/api/recommender (POST)
https://bumi-api-y4qukd55aq-et.a.run.app/api/recommender (GET)
```
