import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const environment = process.env.NODE_ENV || "development";

const config = {
    development: {
        port: process.env.DEV_PORT || 4000,
        db: {
            host: process.env.DEV_DB_HOST,
            user: process.env.DEV_DB_USER,
            database: process.env.DEV_DB_NAME,
            password: process.env.DEV_DB_PASS,
        },
    },
    production: {
        port: process.env.PROD_PORT || 80,
        db: {
            host: process.env.PROD_DB_HOST,
            user: process.env.PROD_DB_USER,
            database: process.env.PROD_DB_NAME,
            password: process.env.PROD_DB_PASS,
        },
    },
    test: {
        port: process.env.TEST_PORT || 3001,
        db: {
            host: process.env.TEST_DB_HOST,
            user: process.env.TEST_DB_USER,
            database: process.env.TEST_DB_NAME,
            password: process.env.TEST_DB_PASS,
        },
    },
};

export default config[environment];