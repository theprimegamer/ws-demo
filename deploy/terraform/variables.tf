variable "mongo_admin_username" {
  description = "Default username for mongo"
  type        = string
  default     = "admin"
}

variable "mongo_admin_password" {
  description = "Default password for mongo"
  type        = string
  default     = "password"
}

variable "mongo_port" {
  description = "Default port for mongo"
  type        = number
  default     = 27017
}
