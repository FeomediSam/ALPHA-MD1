const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUlwdzduZjZaeGRuL094ZkZQczJCVmxiOS8wRzRHRnIyQms2Mk1YbzhHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidEhXRElnemtRbVJtK3J1QXdHTlVHOVFwTkF3S0prR1R2L1RrNHpLZlVtZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRUxrZVVZQ1Zzc3o0TW8vTDdHcnhUMTlpL0lDbWt4WEFpYVdYY0llbUdVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWKytscktuc05YQTZUZkVmZUU1ajl3VDdoeGhPeTEwQ2Q4Q1VEWXBxVkVFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFGZGFhK0pqWTBsWDZUS0dQSVY4WDJ0QzgrbGJVWkM3MEkyUGdSbUQ4Mnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM1ZVpCOXA2QUMzekx0WHFZUEUrK1BrOFlrUEZ6RjROMThaSE8yLytaQVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUw2dnNMa3lrTlJ2U0JVaExzU2J4UUUrOE1pTmcyMlZ2WkwvRGlSYmRWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXBwdDZROXhXYlFOQ2tqaDJIYUowbTYyak1ZcDd4dzkzUW5ZaTFleE1Tdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im54WXBHcE1sZ3lGa291WEV1MndHalpFQkx6WE5EZFJUb0RlSU84aXZKQ2pEamFQR1BKOHU1NUh0eFlpOVpiVFN0ZUJpWFNmV0M1R2F2ZW9nZThlemh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJxSm4zRStKTGV5bWZyYXBPbFBmZXVWcmU3NHVZRzhra1lGSEtPbkd0aTNjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMVUoxWXMzT1JBYXoxTUtwVks5WXVnIiwicGhvbmVJZCI6IjFkYTUzNWMzLTYwOGQtNGU3Yi1hMDBlLTU5NThkZTdjNzlmOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlaTdLQmNhbVRmRHMyRkdoWlcwZndZVDFUV0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiby9Obkk1UG92N0JzSzJVS0RIeFJNRzBScGVBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik02NVNUSzQ4IiwibWUiOnsiaWQiOiIyMzQ5MDE4NjA2OTQ4OjI3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNaVhvTEFERUxXNXNiVUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJwZk4vNG1CWmpYZTZ4YnJuZ2tXWGRqeUlNOE1EOUJWazE0cjFwZHZLV0VBPSIsImFjY291bnRTaWduYXR1cmUiOiJPR0RLRlU2NzdYTkI3Y1U1TWQxZjc3SlE0d2NUVmVTTjZGYlRqaUZpc2MzazhnK1RGWVA5ak15ZHloNEpMSkRrSEtaUnRGUkxZN2lNa21GOCtaVDRCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTDNLZTc4aXNRT3VzMjdaZmoxQmJpdy9ucmsvajZrcng3QTZrSkFBUXozNXVncVFBTXFmMndNY1BJbmE2N1k2L1draUZWMkRBSTlFVjRRRDNHM0E4aHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE4NjA2OTQ4OjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFYemYrSmdXWTEzdXNXNjU0SkZsM1k4aURQREEvUVZaTmVLOWFYYnlsaEEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI1NzE5NjksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2dBIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
