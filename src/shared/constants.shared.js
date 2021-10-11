const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

const IS_DEV = process.env.NODE_ENV === 'development';
const DB_NAME = 'Cookmaster';

const DB_LOCAL = `mongodb://localhost:27017/${DB_NAME}`;
const DB_PROD = `mongodb://mongodb:27017/${DB_NAME}`;

const MONGO_DB_URL = IS_DEV ? DB_LOCAL : DB_PROD;

module.exports = {
  ROLES,
  MONGO_DB_URL,
  DB_NAME,
};