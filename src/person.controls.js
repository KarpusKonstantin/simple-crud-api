const personsDB = require("../db/db");
const Person = require("./person.model");

const getAllPersons = () => {
  return personsDB;
}

const postPerson = (personData) => {
  if (!personData.name || personData.name === '') {
    return {code: 400, message: 'Field "Name" is required. Please fill this field and try again'}
  }

  if (!personData.age || personData.age === '') {
    return {code: 400, message: 'Field "Age" is required. Please fill this field and try again'}
  }

  if (!personData.hobbies || personData.hobbies.length === 0) {
    return {code: 400, message: 'Field "Hobbies" is required. Please fill this field and try again'}
  }

  try {
    const person = new Person(personData.name, personData.age, personData.hobbies);
    personsDB.push(person.get());

    return {code: 201, message: person.get()};

  } catch (e) {
    return {code: 400, message: `Error create person object: ${e.message}`};
  }
}

module.exports = { getAllPersons, postPerson }
