const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const url = require('url');
const personsDB = require("./db/db");

const {getAllPersons, postPerson} = require("./src/person.controls");

dotenv.config({
  path: path.join(__dirname, '.env')
});

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {

  const urlParse = url.parse(req.url, true);
  const urlParamsArray = urlParse.pathname.split('/').filter(item => item !== '');

  if ((urlParamsArray.length === 1) && (urlParamsArray[0] === 'person')) {
    if (urlParse.pathname === '/person' && req.method === 'GET') {
      try {
        const persons = getAllPersons();

        res.statusCode = 200;
        res.end(JSON.stringify(persons));

      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify(`Error receive data: ${e.message}`));
      }
    }

    if (urlParse.pathname === '/person' && req.method === 'POST') {
      req.on('data', data => {
        const jsonData = JSON.parse(data);
        const result = postPerson(jsonData);

        res.statusCode = result.code;
        res.end(JSON.stringify(result.message));
      });
    }
  }

  // if(urlparse.pathname == '/projects' && req.method == 'POST')
  // {
  //   //TODO: POST logic
  // }
  // if(urlparse.pathname == '/projects/tasks' && req.method == 'POST')
  // {
  //   //TODO: POST logic
  // }
  // if(urlparse.pathname == '/projects' && req.method == 'PUT')
  // {
  //   //TODO: PUT logic
  // }
  // if(urlparse.pathname == '/projects' && req.method == 'DELETE')
  // {
  //   //TODO: DELETE logic
  // }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
