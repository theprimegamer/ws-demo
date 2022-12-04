import dotenv from "dotenv";
import { configureExpress } from "./express-config";
import { configureWebsockets } from "./web-sockets-config";

dotenv.config();
configureExpress();
configureWebsockets();
