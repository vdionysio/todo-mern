export function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export function validateLength(string, length) {
  return string.length >= length;
}
