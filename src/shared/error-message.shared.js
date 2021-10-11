const DEFAULT_BAD_REQUEST = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const EMAIL_ALREADY_EXIST = {
  status: 409,
  message: 'Email already registered',
};

module.exports = {
  DEFAULT_BAD_REQUEST,
  EMAIL_ALREADY_EXIST,
};