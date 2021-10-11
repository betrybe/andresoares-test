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
  message: 'All fields must to be filled',
};

module.exports = {
  DEFAULT_BAD_REQUEST,
  EMAIL_ALREADY_EXIST,
  USER_PARAMS_INCORRECT,
  FIELDS_MUST_BE_FILLED,
};