const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const url = require('url');
const { myUrlParser } = require("./src/utils");

const {getAllPersons, getPersonById, postPerson} = require("./src/person.controls");

dotenv.config({
  path: path.join(__dirname, '.env')
});

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {

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
        const result = postPerson(jsonData);

        res.statusCode = result.code;
        res.end(JSON.stringify(result.message));
      });
    }
  } else if (urlObject.valid && (urlObject.personId !== ''))  {
    if (req.method === 'GET') {
      const result = getPersonById(urlObject.personId);

      res.statusCode = result.code;
      res.end(JSON.stringify(result.message));

    }

    if (req.method === 'PUT') {
      const result = getPersonById(urlObject.personId);

      res.statusCode = result.code;
      res.end(JSON.stringify(result.message));

    }

  } else {
    res.statusCode = urlObject.code;
    res.end(JSON.stringify(urlObject.message));
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
