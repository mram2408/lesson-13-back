import dotenv from "dotenv";
dotenv.config();

export default Object.freeze({
  dataBaseName: process.env.DATABASE_NAME,
  dataBaseUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
});
