const { v4: uuidv4 } = require('uuid');
const { version: uuidVersion } = require('uuid');
const { validate: uuidValidate } = require('uuid');

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

const myUrlParser = (url) => {
  const urlParamsArray = url.pathname.split('/').filter(item => item !== '');

  const result = {
    valid: false,
    code: 0,
    message: '',
    person: '',
    personId: ''
  }

  if (urlParamsArray.length > 2) {
    result.valid = false;
    result.code = 404
    result.message = `Path not found: ${url.pathname}.`


    return result;
  }

  if (urlParamsArray[0] !== 'person') {
    result.valid = false;
    result.code = 404
    result.message = `Path not found: ${url.pathname}.`


    return result;
  }

  if (urlParamsArray.length === 2) {
    const b = uuidValidateV4(urlParamsArray[1]);

    if (!b) {
      result.valid = false;
      result.code = 400
      result.message = `Person ID is not correct. Person ID must be UUIDv4 format`;


      return result;
    } else {
      result.personId = urlParamsArray[1];
    }
  }

  result.valid = true;
  result.person = 'person';

  return result;
}

module.exports = { myUrlParser }
