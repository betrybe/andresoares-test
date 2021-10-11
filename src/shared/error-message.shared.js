const DEFAULT_BAD_REQUEST = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const EMAIL_ALREADY_EXIST = {
  status: 409,
  message: 'Email already registered',
};

const USER_PARAMS_INCORRECT = {
  status: 401,
  message: 'Incorrect username or password',
};

const FIELDS_MUST_BE_FILLED = {
  status: 401,
  message: 'All fields must be filled',
};

const JWT_MALFORMED = {
  status: 401,
  message: 'jwt malformed',
};

const RECIPE_NOT_FOUND = {
  status: 404,
  message: 'recipe not found',
};

const SERVER_ERROR = {
  status: 500,
  message: 'Internal error',
};

module.exports = {
  DEFAULT_BAD_REQUEST,
  EMAIL_ALREADY_EXIST,
  USER_PARAMS_INCORRECT,
  FIELDS_MUST_BE_FILLED,
  JWT_MALFORMED,
  SERVER_ERROR,
  RECIPE_NOT_FOUND,
};