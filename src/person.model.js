const { v4: uuidv4 } = require('uuid');

class Person {
  constructor(name, age, hobbies) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      hobbies: this.hobbies
    }
  }
}

module.exports = Person;
