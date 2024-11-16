const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const PASSWORD_REGEX = /(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

export const validateEmail = (email) => {
    return email.match(EMAIL_REGEX);
};

export const validatePassword = (password) => {
    return password.match(PASSWORD_REGEX);
};
