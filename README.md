# Webhook Server

This service is a basic webhook server. Designed to register (temporarily) multiple API Clients. We can then trigger a POST request for each one of those HTTP clients with the body we want at the time

## Tech Stack
This project is developed with
- [Node.JS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/pt-BR/)
- [Axios](https://www.npmjs.com/package/axios)

## Installation

Inside the webhook-server folder use the package manager NPM and the Node Manager NVM

First, to set our node version to the one used by the project
```
nvm use
```

Then we can install all NPM dependencies with
```
npm install
```


## How to run
First, we need to create our own environment variable 
```
cp .env.example .env
```
This will add our server port to 9876. Note that if you wish to change this you can.


To build and start the server you should use
```
npm run start
```
You should see a log in your console indicating which URL the server is running on.

#### Tests

To run all unit tests you should use
```
npm run test
```


## HTTP Routes

The server has two HTTP routes

The first one is to save new clients to our webhooks list
```
POST /api/webhooks
```
Body
```
{
    "url": "https://fullUrl/example",
    "token": "foo"
}
```
------------
The second one is to trigger a POST request in all saved URLs with the body we want
```
POST /api/webhooks/test
```
Body
```
{
  "payload": [ {"test": "any valid" }]
}
```




## License
[ISC](https://choosealicense.com/licenses/isc/)