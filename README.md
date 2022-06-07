# BUMI-Cloud-Computing

## API endpoints for Android
### App Engine
1. Sign Up, Sign In, Sign Out.
   ***note***: *maunya sih dari firebase sdk client android soalnya lebih make sense gitu*

```
https://bumi-api-4e903.et.r.appspot.com/api/auth/signup (POST)
https://bumi-api-4e903.et.r.appspot.com/api/auth/signin (POST)
https://bumi-api-4e903.et.r.appspot.com/api/auth/signout (GET) ???
```

For hitting this API onwards please include a bearer token in the request header.
e.g:  `Authorization: Bearer <accessToken>`

### Cloud Run
2. Get, Update User 
   ***note***: *sekali lagi enaknya get user dari client sdk android, tapi gatau saya bikin saja buat temen android saya yang demanding.*

```
https://bumi-cloud-computing-y4qukd55aq-et.a.run.app/api/user/:uid (GET)
https://bumi-cloud-computing-y4qukd55aq-et.a.run.app/api/user/:uid (PATCH)
```

3. Create, and Get Recommender 

```
https://bumi-cloud-computing-y4qukd55aq-et.a.run.app/api/recommender (POST)
https://bumi-cloud-computing-y4qukd55aq-et.a.run.app/api/recommender/:uid (GET)
```