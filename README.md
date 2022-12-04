# Project setup

## Configuration

Create /terraform/credentials file with your AWS creds as the [default] profile

Create /.env file with properties specified below

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

## Running the project

- At /src/server/ `npm i`
- At /src/server/ `npm run dev`
