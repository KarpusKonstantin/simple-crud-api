const request = require('supertest');
const CURRENT_HOST = `http://localhost:3000`;
const TEST_OBJECT = {
  name: 'Test_name',
  age: 35,
  hobbies: ['football', 'programming']
}

const TEST_PUT_OBJECT = {
  name: 'Test_put_name',
  age: 105,
  hobbies: ['football', 'tennis']
}

let id  = '';

describe('GET /person', () => {
  it('should get status 200 ', async () =>  {
    const response = await request(CURRENT_HOST).get('/person');
    expect(response.status).toBe(200);
  })

  it('should get empty array', async () =>  {
    const response = await request(CURRENT_HOST).get('/person');
    expect(response.text).toBe('[]');
  })
});

describe('POST /person', () => {
  it('should get status 201 ', async () =>  {
    const response = await request(CURRENT_HOST)
      .post('/person')
      .send(TEST_OBJECT);

    expect(response.status).toBe(201);
  })


  it('should get new post record', async () =>  {
    const response = await request(CURRENT_HOST)
      .post('/person')
      .send(TEST_OBJECT);

    const t = JSON.parse(response.text);

    id = t.id;

    delete t.id;

    expect(t).toEqual(TEST_OBJECT);
  })
});

describe('GET /person/:id', () => {
  it('should get status 200 by id ', async () =>  {
    const response = await request(CURRENT_HOST).get(`/person/${id}`);
    expect(response.status).toBe(200);
  })

  it('should get person object by id', async () =>  {
    const response = await request(CURRENT_HOST).get(`/person/${id}`);
    const a = JSON.parse(response.text);
    const t = a[0];

    delete t.id;

    expect(t).toEqual(TEST_OBJECT);
  })
});

describe('PUT /person/:id', () => {
  it('should get status 200 ', async () =>  {
    const response = await request(CURRENT_HOST)
      .put(`/person/${id}`)
      .send(TEST_PUT_OBJECT);

    expect(response.status).toBe(200);
  })


  it('should get update record ', async () =>  {
    const response = await request(CURRENT_HOST)
      .put(`/person/${id}`)
      .send(TEST_PUT_OBJECT);

    const t = JSON.parse(response.text);
    delete t.id;

    expect(t).toEqual(TEST_PUT_OBJECT);
  })

  it('should update record id not change ', async () =>  {
    const response = await request(CURRENT_HOST)
      .put(`/person/${id}`)
      .send(TEST_PUT_OBJECT);

    const t = JSON.parse(response.text);

    expect(t.id).toEqual(id);
  })

});

describe('DELETE /person/:id', () => {
  it('should get status 204', async () =>  {
    const response = await request(CURRENT_HOST).delete(`/person/${id}`);
    expect(response.status).toBe(204);
  })
});

describe('GET deleted record', () => {
  it('should get status 404 - record not found', async () =>  {
    const response = await request(CURRENT_HOST).get(`/person/${id}`);

    console.log('GET >>', response.text);

    expect(response.status).toBe(404);
  })
});

describe('URL valid', () => {
  it('should get status 404 if url not correct', async () =>  {
    const response = await request(CURRENT_HOST).get(`/person3`);

    expect(response.status).toBe(404);
  })

  it('should get status 400 if ID not uuid', async () =>  {
    const response = await request(CURRENT_HOST).get(`/person/${id}a`);

    expect(response.status).toBe(400);
  })

});
