Things to do when using this skeleton to start a new project: 

1. Change the package name
2. Create a .env.local file by copying the .env.template
3. Fill the values in the file and run the following for the AUTH0_SECRET:
```
openssl rand -hex 32
```
4. Make sure that in the Auth0 application, you add the callback URL. (ex:http://localhost:3001/api/auth/callback)

// run the docker container for the json server:
```
 docker run -p 3070:3070 -v $(pwd):/app json-server npm install && npm run mock

 or

 docker compose -f docker-compose.dev.yml (or docker-compose.yml) up --build to run with mock data both the dev and prod versions.
 