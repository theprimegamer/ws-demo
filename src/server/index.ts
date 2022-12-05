import dotenv from "dotenv";
import { configureExpress } from "./express";
import { configureWebsockets } from "./web-sockets-config";

dotenv.config();
configureExpress();
configureWebsockets();
