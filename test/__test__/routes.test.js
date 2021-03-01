const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const SERVER_URL = 'http://localhost:3000';
const { v4: UUID } = require('uuid');

describe('Vue app route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.get(SERVER_URL);
    expect(response.status).toEqual(200);
  });

  it('Should return the Vue app', async () => {
    const response = await axios.get(SERVER_URL);
    expect(response.data).toMatch(/<div id="app"><\/div>/);
  });
});

describe('Sign up route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/signup`);
    expect(response.status).toEqual(200);
  });

  it('Should not signup without an email', async () => {
    const response = await axios.post(`${SERVER_URL}/api/signup`);
    expect(response.data).toEqual({ error: 'Not a valid email address.' });
  });

  it('Should not signup with wrong email format', async () => {
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email: UUID() });
    expect(response.data).toEqual({ error: 'Not a valid email address.' });
  });

  it('Should not signup without a password', async () => {
    const email = `${UUID()}@test.com`;
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email });
    console.log(response)
    expect(response.data).toEqual({ error: 'Password must be at least 8 characters.' });
  });

//   it('Should not signup without terms and condition', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';
//     const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password });
//     expect(response.data).toEqual({ error: 'Please accept the terms and conditions.' });
//   });

//   it('Should not signup with terms and condition being false', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';
//     const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: false });
//     expect(response.data).toEqual({ error: 'Please accept the terms and conditions.' });
//   });

//   it('Should signup successfully', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';
//     const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });
//     expect(response.data).toEqual({ error: 'Please accept the terms and conditions.' });
//   });

//   it('Should not create a new account if user already exists', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';

//     // create account
//     await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

//     // attempt to create it again
//     const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });
//     expect(response.data).toEqual({ error: 'Email already exists.' });
//   });
});

// describe('Login route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/login`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should not login without an email', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/login`);
//     expect(response.data).toEqual({ error: 'Please enter an email.' });
//   });

//   it('Should not login without a password', async () => {
//     const email = `${UUID()}@test.com`;
//     const response = await axios.post(`${SERVER_URL}/api/login`, { email });
//     expect(response.data).toEqual({ error: 'Please enter a password.' });
//   });

//   it('Should not login without a valid account', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';
//     const response = await axios.post(`${SERVER_URL}/api/login`, { email, password });
//     expect(response.data).toEqual({ error: 'Bad username/password.' });
//   });

//   it('Should login successfully', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';
//     const expected =

//     // sign up first
//     await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

//     // login
//     const response = await axios.post(`${SERVER_URL}/api/login`, { email, password });
//     expect(response.data).objectContaining({
//       "free-1g": {
//         "name": "Free 1G",
//         "active": true,
//         "storageBytesQuota": 1e+9,
//         "storageFilesQuota": 1000,
//         "downloadBytesQuota": 1e+9,
//         "downloadFilesQuota": 1000
//       },
//       "free-100g": {
//         "name": "Free 100G",
//         "active": true,
//         "storageBytesQuota": 1e+11,
//         "storageFilesQuota": 100000,
//         "downloadBytesQuota": 1e+11,
//         "downloadFilesQuota": 100000
//       },
//       "free-1tb": {
//         "name": "Free 1TB",
//         "active": true,
//         "storageBytesQuota": 1e+12,
//         "storageFilesQuota": 1000000,
//         "downloadBytesQuota": 1e+12,
//         "downloadFilesQuota": 1000000
//       },
//       "free-10tb": {
//         "name": "Free 10TB",
//         "active": true,
//         "storageBytesQuota": 1e+13,
//         "storageFilesQuota": 10000000,
//         "downloadBytesQuota": 1e+13,
//         "downloadFilesQuota": 10000000
//       }
//     });
//   });
// });

// describe('Passive login route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/passive-login`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should not perform passive login without session', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/passive-login`);
//     expect(response.status).toEqual({ error: 'No login with session.' });
//   });

//   it('Should passively login successfully', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';

//     // sign up
//     await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

//     // login
//     await axios.post(`${SERVER_URL}/api/login`, { email, password });

//     // passive login
//     const response = await axios.post(`${SERVER_URL}/api/passive-login`);
//     expect(response).objectContaining({
//       email: expect.any(String),
//       stargateAccessKey: expect.any(String),
//       stargateSecretKey: expect.any(String),
//       stargateBucket: expect.any(String),
//       stargateEndpoint: expect.any(String),
//       activated: expect.any(Boolean),
//       features: expect.any(String),
//       planId: expect.any(String),
//       plans: expect.any(Object)
//      });
//   });
// });

// describe('Activate route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/activate`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an error when no token is provided', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/activate`);
//     expect(response.data).toEqual({ error: 'Token not valid.' });
//   });

//   // write a test with a valid token
// });

// describe('Usage route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/usage`);
//     expect(response.status).toEqual(200);
//   });

//   // write a test for an error when there is no session

//   it('Should return all usage quota successfully', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';

//     // sign up
//     await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

//     //login
//     await axios.post(`${SERVER_URL}/api/login`, { email, password });

//     // retrieve all usage quota
//     const response = await axios.post(`${SERVER_URL}/api/usage`);
//     expect(response.status).toEqual(200);
//   });
// });

// describe('logout route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/logout`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should perform a successful deletion', async () => {
//     const email = `${UUID()}@test.com`;
//     const password = '12345678';

//     // sign up
//     await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

//     //login
//     await axios.post(`${SERVER_URL}/api/login`, { email, password });

//     // delete user's session
//     const response = await axios.post(`${SERVER_URL}/api/logout`);
//     expect(response.body).toEqual('');
//   });
// });

// describe('Admin users route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/users`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an unathorized error if no token is provided', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/users`);
//     expect(response.body).toEqual({ error: 'Unauthorized' });
//   });

//   it('Should return all users', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/users`, { token: 'testadmintoken' });
//     expect(response.body).objectContaining({
//       users: expect.any(Object),
//       results: expect.any(Object),
//       plans: expect.any(Object)
//      });
//   });
// });

// describe('Admin json ID route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/json/${1}`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an unathorized error if no token is provided', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/json/${1}`);
//     expect(response.body).toEqual({ error: 'Unauthorized' });
//   });

//   it('Should return successful summary', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/json/${1}`, { token: 'testadmintoken' });
//     expect(response.body).objectContaining({
//       id: expect.any(String),
//       email: expect.any(String),
//       createTime: expect.any(String),
//       activated: expect.any(Bool),
//       lastLoginTime: expect.any(String),
//       planId: expect.any(String),
//       events: expect.any(Object)
//      })
//   })
// });

// describe('Admin setplan route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/setplan`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an unathorized error if no token is provided', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/setplan`);
//     expect(response.body).toEqual({ error: 'Unauthorized' });
//   });

//   it('Should return an empty body signifying success', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/admin/setplan`, { userId: 'test', planId:  'free-1g' });
//     expect(response.body).toEqual('');
//   });
// });

// describe('Events upload route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/events/upload`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an empty body signifying success', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/events/upload`, { files: 'test.txt', bytes: 1000, userId: '1' });
//     expect(response.status).toEqual('');
//   });
// });

// describe('Events download route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/events/download`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an empty body signifying success', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/events/download`, { files: 'test.txt', bytes: 1000, userId: '1' });
//     expect(response.status).toEqual('');
//   });
// });

// describe('Events delete route', () => {
//   it('Should return a 200 status code', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/events/delete`);
//     expect(response.status).toEqual(200);
//   });

//   it('Should return an empty body signifying success', async () => {
//     const response = await axios.post(`${SERVER_URL}/api/events/delete`, { files: 'test.txt', bytes: 1000, userId: '1' });
//     expect(response.status).toEqual('');
//   });
// });
