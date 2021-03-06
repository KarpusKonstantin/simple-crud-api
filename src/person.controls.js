const personsDB = require("../db/db");
const Person = require("./person.model");

const getAllPersons = () => {
  return personsDB;
}

const getPersonById = (id) => {
  const result =  personsDB.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: 404, message: `Person id ${id} not found in DB`};

  } else {
    return {code: 200, message: result};

  }
}

const updatePerson = (id, personData) => {
  const result =  personsDB.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: 404, message: `Person id ${id} not found in DB`};

  } else {
    if (!personData.name || personData.name === '') {
      return {code: 400, message: 'Field "Name" is required. Please fill this field and try again'}
    }

    if (!personData.age || personData.age === '') {
      return {code: 400, message: 'Field "Age" is required. Please fill this field and try again'}
    }

    if (!personData.hobbies || personData.hobbies.length === 0) {
      return {code: 400, message: 'Field "Hobbies" is required. Please fill this field and try again'}
    }

    const index = personsDB.indexOf(result[0]);

    personsDB[index].name = personData.name;
    personsDB[index].age = personData.age;
    personsDB[index].hobbies = personData.hobbies;

    return {code: 200, message: personsDB[index]};
  }
}

const deletePerson = (id) => {
  const result =  personsDB.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: 404, message: `Person id ${id} not found in DB`};

  } else {
    const index = personsDB.indexOf(result[0]);

    if (index > -1) {
      personsDB.splice(index, 1);

      return {code: 204, message: `Person id ${id} was deleted successfully`};
    }
  }
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

module.exports = { getAllPersons, getPersonById, postPerson, deletePerson, updatePerson }
