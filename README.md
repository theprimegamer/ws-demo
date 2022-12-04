# Project setup

## Configuration

Create /deploy/terraform/credentials file with your AWS creds
Create /src/server/.env file with

| Variable name         | Purpose                                 |
| --------------------- | --------------------------------------- |
| EXPRESS_PORT          | Express API's local port                |
| WS_PORT               | Websocket's local port                  |
| AWS_ACCESS_KEY_ID     | AWS Creds                               |
| AWS_SECRET_ACCESS_KEY | AWS Creds                               |
| UPDATE_SNS_ARN        | ARN for the SNS service created from TF |
| MONGO_USERNAME        | Mongo's initial root username           |
| MONGO_PASSWORD        | Mongo's initial root password           |
| MONGO_PORT            | Mongo's local port                      |

## Scaffolding

- At /deploy/terraform `terraform apply`
- On the mongo server, create a new database named `ws-demo` with a collection named `messages`

## Running the project

- At /src/server/ `npm i`
- At /src/server/ `npm run dev`
