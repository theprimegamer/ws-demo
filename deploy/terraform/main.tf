terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.23.1"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["./credentials"]
  profile                  = "default"
}

resource "aws_sns_topic" "ws_demo_update" {
  name = "ws-demo-update"

  tags = { Project = "ws-demo" }
}

resource "aws_sqs_queue" "ws_demo_update_queue" {
  name                      = "ws-demo-update-queue"
  delay_seconds             = 30
  max_message_size          = 1024
  message_retention_seconds = 600
  receive_wait_time_seconds = 10

  tags = { Project = "ws-demo" }
}

resource "aws_sns_topic_subscription" "user_updates_sqs_target" {
  topic_arn = aws_sns_topic.ws_demo_update.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.ws_demo_update_queue.arn
}

resource "aws_sqs_queue_policy" "ws_demo_sns_sqs" {
  queue_url = aws_sqs_queue.ws_demo_update_queue.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "${aws_sqs_queue.ws_demo_update_queue.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_sns_topic.ws_demo_update.arn}"
        }
      }
    }
  ]
}
POLICY
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}
# provider "docker" {
#   host = "npipe:////.//pipe//docker_engine"
# }

# get the mongo docker image
resource "docker_image" "mongo" {
  name         = "mongo"
  keep_locally = true
}

# start a container and expose the 27017 port
resource "docker_container" "mongo" {
  name  = "ws-demo-mongo"
  image = docker_image.mongo.latest
  ports {
    internal = 27017
    external = var.mongo_port
  }
  restart = "always"
  env     = ["MONGO_INITDB_ROOT_USERNAME=${var.mongo_admin_username}", "MONGO_INITDB_ROOT_PASSWORD=${var.mongo_admin_password}"]
}
