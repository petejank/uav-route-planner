# UAV route planner

A mono-repository of a simple application that allows users to create their own UAV flight routes

## Requirements

- `Docker > 19.03.4`
- unoccupied ports `80` and `8001` of the host machine

## Quick Start

To run the application using Docker:

1. Run `cp .env-dist .env`
2. Run `launch_docker.sh` - launches the applications in the containers in production mode (will rebuild and re-run the containers if used in succession)
3. Once the containers are ready the application will be available at http://localhost
4. Login using the following credentials: `test@test.com / test`
