type dbtypes = 
| "postgres" 
| "mongodb"
| "mysql";

type schemaTypes = "string" | "number" | "boolean" | "date";
interface schemaTable {
    name: string;
    type: schemaTypes;
    primaryKey?: boolean;
    foreignKey?: boolean;
    unique?: boolean;
    notNull?: boolean;
    check?: boolean;
    default: schemaTypes;
}

interface schema {
    name: string;
    tables: schemaTable[];
}

const dbSchema = {}
    

interface DBURL {
    url: string;
    port: number;
}

interface DBInfo {
    type: string;
    username: string;
    password: string;
    database: string;
}

class DB_postgres {
    constructor() {
    }
}

class DB_mongodb {
    constructor() {
    }
}

class DB_mysql {
    constructor() {
    }
}

class DBHandler {
    dbtype: dbtypes = "postgres";
    dburl = {} as DBURL;
    dbinfo = {} as DBInfo;
    constructor(dburl: DBURL, dbinfo: DBInfo) {
        this.dburl = dburl;
        this.dbinfo = dbinfo;
    }

    init() {
        globalThis.log.info("Starting database connection");
    }

    query(query: dbtypes) {
        switch (this.dbtype) {
            case "postgres":
                // query postgres db
                break;
            case "mongodb":
                // query mongodb db
                break;
            case "mysql":
                // query mysql db
                break;
            default:
                globalThis.log.error("Database type not supported");
                break;
        }
    }
}