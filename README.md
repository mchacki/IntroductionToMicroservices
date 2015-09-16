# IntroductionToMicroservices
Example code required for my training Introduction To Microservices


## Installation

In order to execute my code you first need to install two programs:

1. Nodejs (v4.0.0 or newer) <https://nodejs.org/en/>
2. HAProxy (1.5 or newer) <http://www.haproxy.org>

Please follow their instructions.

Afterwards you have to install the prerequisites for the microservice code:

    make setup

This will run npm install and should download all dependencies.
Now you are ready to go.

## Starting the services

If you want to start the services you can simply execute

    make serve

This will stop all earlier versions of the services, if any, and restart 3 services: cryptoService, userService and messageService.
It will also start HAProxy with the configuration file in the folder.
This means we can access all three services at `localhost:9000`.

## Executing the tests

First make sure your services are running

    make serve

Then you can start the tests with

    make test

In the initial version only 3 of 15 tests should be green (all others are meant to be implemented during the training ;) )
