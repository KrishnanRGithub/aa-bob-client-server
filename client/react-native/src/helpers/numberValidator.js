export function numberValidator(number) {
  regex="/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}$/"
  if (!number) return "Number can't be empty";
  if (number.length !== 10) return "Number should be 10 characters long.";
  return "";
  // return number.test(regex);

}
