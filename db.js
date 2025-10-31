const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

function getPool() {
  if (!pool) {
    let config;

    if (process.env.NODE_ENV === "production") {
      // Deploy trên Railway → dùng internal host
      config = {
        host: process.env.MYSQLHOST,
        port: Number(process.env.MYSQLPORT || 3306),
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
      };
    } else {
      // Local → dùng public URL
      if (!process.env.MYSQL_PUBLIC_URL) {
        throw new Error("MYSQL_PUBLIC_URL not set in .env for local testing");
      }
      const url = new URL(process.env.MYSQL_PUBLIC_URL);
      config = {
        host: url.hostname,
        port: Number(url.port),
        user: url.username,
        password: url.password,
        database: url.pathname.replace("/", ""),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
      };
    }

    pool = mysql.createPool(config);
    console.log("✅ MySQL pool created with config:", {
      host: config.host,
      port: config.port,
      database: config.database,
    });
  }
  return pool;
}

module.exports = { getPool };
