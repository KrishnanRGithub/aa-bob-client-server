export function numberValidator(number) {
  regex="/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}$/"
  if(!number)return false;
  if (number.length < 10 || number.length >10) return false;
  return true;
  // return number.test(regex);

}
