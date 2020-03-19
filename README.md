This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

This is a Star Wars application Written in React on the frontend with an Express backend server. It calls the SWAPI endpoint to get the base data, however I enhance the data myself aswell by adding in additional information such as images.

The app is heavily cached at all stages due to the rate limiting API and slow connection I have an in memory cache on the server, redux will also store the actice data and then this is copied over to local storage to ensure the data is present as required.

Due to this data being pretty static it is ok to assume it won't be updated often, I have created a basic TTL method for the client side storage which will just check if the current date is > stored and if so will update. This of course has a lot of flaws but it does the job for something simple.

The site is fully deployed with a CI pipeline using GitHub Actions, DockerHub, Docker and Watchtower to deploy to my server. This creates a really easy way to deploy updates and changes.

## Technology
 - Node 13.X
 - React
 - Redux
 - Styled-Components
 - Create React App
 - TypeScript
 - ExpressJS
 - OvernightJS
 - TailWindCSS (small defaults)
 - Docker
 - FontAwesome
 - Lodash

 ## Start Dev

 ```
npm start
 ```


## Production build
can be achieved either via 
```
npm run build
```
or if you prefer docker
```
npm run docker:build
```

in production the server starts on 3001 the same as development
