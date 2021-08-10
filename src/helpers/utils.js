export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    // here my params is an object
    let encodedKey = encodeURIComponent(property); //  Here we use encodeURIComponent because: suppose we get (user name0 as a property then using this will convert this into username%20name
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}
