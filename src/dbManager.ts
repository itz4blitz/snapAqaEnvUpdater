import { profileEnd } from "console";
import { Client } from "ts-postgres";

export default class dbManager {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    checkIfDbExists() {
        this.client.connect();
    }

    getOpenConnections() {
        const openConnections = this.client.query(`select * from pg_stat_activity where datname = '${process.env.db_name}'`)
        console.log(openConnections)
        this.client.end()
    }

    closeExistingConnections() {
        const openConnections = this.getOpenConnections();
    }

    cleanDB() {
        const { execSync } = require('child_process')
        execSync("npm run seed-autotest")
    }

    importSchema() {
        const { execSync } = require('child_process')
        execSync(`cd ${process.env.booker_path}`)
        execSync(`psql -f .\\src\\database\\schema.sql -p ${process.env.port} -U ${process.env.db_user} ${process.env.db_name}`)
    }
}