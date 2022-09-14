import { Client } from "ts-postgres/dist/src/client"
import dbManager from "./dbManager"
import appManager from "./appManager"

console.log("AQA Local Environment Updater 0.0.1")

const pgClient: Client = new Client({
    "user" : process.env.db_user,
    "password" : process.env.db_password,
    "host" : process.env.hostname,
    "port" : Number(process.env.port),
})

const database = new dbManager(pgClient)

database.checkIfDbExists();
database.closeExistingConnections();
database.cleanDB();

const booker = new appManager()
booker.gitUpdate()

