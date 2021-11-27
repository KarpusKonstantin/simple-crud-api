const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const url = require('url');
const {updatePerson} = require("./src/person.controls");
const {deletePerson} = require("./src/person.controls");
const { myUrlParser } = require("./src/utils");

const {getAllPersons, getPersonById, postPerson} = require("./src/person.controls");

dotenv.config({
  path: path.join(__dirname, '.env')
});

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  let result = {};

  const urlParse = url.parse(req.url, true);

  const urlObject = myUrlParser(urlParse);
  console.log('URL OBJECT >>', urlObject);

  if (urlObject.valid && (urlObject.personId === '')) {
    if (req.method === 'GET') {
      try {
        const persons = getAllPersons();

        res.statusCode = 200;
        res.end(JSON.stringify(persons));

      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify(`Error receive data: ${e.message}`));
      }
    }

    if (req.method === 'POST') {
      req.on('data', data => {
        const jsonData = JSON.parse(data);
        result = postPerson(jsonData);

        res.statusCode = result.code;
        res.end(JSON.stringify(result.message));
      });
    }

  } else if (urlObject.valid && (urlObject.personId !== ''))  {
    if (req.method === 'GET') {
      result = getPersonById(urlObject.personId);
    }

    if (req.method === 'PUT') {
      req.on('data', data => {
        const jsonData = JSON.parse(data);
        result = updatePerson(urlObject.personId, jsonData);

      }).on('end', () => {
        res.statusCode = result.code;
        res.end(JSON.stringify(result.message));
      });
    }

    if (req.method === 'DELETE') {
      result = deletePerson(urlObject.personId);
    }

    if (result.code) {
      res.statusCode = result.code;
      res.end(JSON.stringify(result.message));
    }

  } else {
    res.statusCode = urlObject.code;
    res.end(JSON.stringify(urlObject.message));
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
