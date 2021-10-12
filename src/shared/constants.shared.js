const APP_SECRET = 'umachavemegadificil';

const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

const IS_DEV = process.env.NODE_ENV === 'development';
const DB_NAME = 'Cookmaster';
const PATH_UPLOAD_IMAGES = 'src/uploads';
const API_URL = IS_DEV ? 'localhost:3000' : '';

const DB_LOCAL = `mongodb://localhost:27017/${DB_NAME}`;
const DB_PROD = `mongodb://mongodb:27017/${DB_NAME}`;

const MONGO_DB_URL = IS_DEV ? DB_LOCAL : DB_PROD;

module.exports = {
  APP_SECRET,
  ROLES,
  MONGO_DB_URL,
  DB_NAME,
  PATH_UPLOAD_IMAGES,
  API_URL,
};