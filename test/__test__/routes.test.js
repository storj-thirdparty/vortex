const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const SERVER_URL = 'http://localhost:3000';
const crypto = require("crypto");
const generateId = () => crypto.randomBytes(16).toString("hex");

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
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email: generateId() });
    expect(response.data).toEqual({ error: 'Not a valid email address.' });
  });

  it('Should not signup without a password', async () => {
    const email = `${generateId()}@test.com`;
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email });
    console.log(response)
    expect(response.data).toEqual({ error: 'Not a valid password.' });
  });

  it('Should not signup without terms and condition', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password });
    expect(response.data).toEqual({ error: 'Please accept the terms and conditions.' });
  });

  it('Should not signup with terms and condition being false', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: false });
    expect(response.data).toEqual({ error: 'Please accept the terms and conditions.' });
  });

  it('Should signup successfully', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });
    expect(response.data).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        stargateAccessKey: expect.any(String),
        stargateSecretKey: expect.any(String),
        stargateBucket: expect.any(String),
        stargateEndpoint: expect.any(String),
        activated: expect.any(Boolean),
        features: expect.any(Object),
        planId: expect.any(String),
        plans: expect.any(Object)
      })
    );
  });

  it('Should not create a new account if user already exists', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';

    // create account
    await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

    // attempt to create it again
    const response = await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });
    expect(response.data).toEqual({ error: 'Email already exists.' });
  });
});

describe('Login route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/login`);
    expect(response.status).toEqual(200);
  });

  it('Should not login without an email', async () => {
    const response = await axios.post(`${SERVER_URL}/api/login`);
    expect(response.data).toEqual({ error: 'Please enter an email.' });
  });

  it('Should not login without a password', async () => {
    const email = `${generateId()}@test.com`;
    const response = await axios.post(`${SERVER_URL}/api/login`, { email });
    expect(response.data).toEqual({ error: 'Please enter a password.' });
  });

  it('Should not login without a valid account', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';
    const response = await axios.post(`${SERVER_URL}/api/login`, { email, password });
    expect(response.data).toEqual({ error: 'Bad username/password.' });
  });

  it('Should login successfully', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';
    const expected =

    // sign up first
    await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

    // login
    const response = await axios.post(`${SERVER_URL}/api/login`, { email, password });
    expect(response.data).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        stargateAccessKey: expect.any(String),
        stargateSecretKey: expect.any(String),
        stargateBucket: expect.any(String),
        stargateEndpoint: expect.any(String),
        activated: expect.any(Boolean),
        features: expect.any(Object),
        planId: expect.any(String),
        plans: expect.any(Object)
      })
    );
  });
});

describe('Passive login route', () => {
  // logout
  beforeAll(async () => {
    await axios.post(`${SERVER_URL}/api/logout`);
  });

  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/passive-login`);
    expect(response.status).toEqual(200);
  });

  it('Should not perform passive login without session', async () => {
    const response = await axios.post(`${SERVER_URL}/api/passive-login`);
    expect(response.data).toEqual({ error: 'No login with session.' });
  });

  it('Should passively login successfully', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';

    // sign up
    await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

    // login
    await axios.post(`${SERVER_URL}/api/login`, { email, password });

    // passive login
    const response = await axios.post(`${SERVER_URL}/api/passive-login`);
    expect(response.data).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        stargateAccessKey: expect.any(String),
        stargateSecretKey: expect.any(String),
        stargateBucket: expect.any(String),
        stargateEndpoint: expect.any(String),
        activated: expect.any(Boolean),
        features: expect.any(Object),
        planId: expect.any(String),
        plans: expect.any(Object)
      })
    );
  });
});

describe('Activate route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/activate`);
    expect(response.status).toEqual(200);
  });

  it('Should return an error when no token is provided', async () => {
    const response = await axios.post(`${SERVER_URL}/api/activate`);
    expect(response.data).toEqual({ error: 'Token not valid.' });
  });

  // write a test with a valid token
});

describe('Usage route', () => {
  // logout
  beforeEach(async () => {
    await axios.post(`${SERVER_URL}/api/logout`);
  });

  it('Should return a 200 status code', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';

    // sign up
    await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

    //login
    await axios.post(`${SERVER_URL}/api/login`, { email, password });

    // retrieve all usage quota
    const response = await axios.post(`${SERVER_URL}/api/usage`);
    expect(response.status).toEqual(200);
  });

  // write a test for an error when there is no session

  it('Should return all usage quota successfully', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';

    // sign up
    await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

    //login
    await axios.post(`${SERVER_URL}/api/login`, { email, password });

    // retrieve all usage quota
    const response = await axios.post(`${SERVER_URL}/api/usage`);
    expect(response.data).toEqual(
      expect.objectContaining({
        bytesUploaded: expect.any(Number),
        filesUploaded: expect.any(Number),
        bytesDownloaded: expect.any(Number),
        bytesUploadedQuota: expect.any(Number),
        filesUploadedQuota: expect.any(Number),
        bytesDownloadedQuota: expect.any(Number),
      })
    );
  });
});

describe('logout route', () => {
  beforeAll(async () => {
    await axios.post(`${SERVER_URL}/api/logout`);
  });

  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/logout`);
    expect(response.status).toEqual(200);
  });

  it('Should perform a successful deletion', async () => {
    const email = `${generateId()}@test.com`;
    const password = '12345678';

    // sign up
    await axios.post(`${SERVER_URL}/api/signup`, { email, password, termsAndConditions: true });

    //login
    await axios.post(`${SERVER_URL}/api/login`, { email, password });

    // delete user's session
    const response = await axios.post(`${SERVER_URL}/api/logout`);
    expect(response.data).toEqual('');
  });
});

describe('Admin users route', () => {
  it('Should return a 200 status code', async () => {
    try {
      await axios.post(`${SERVER_URL}/api/admin/users`);
    } catch (e) {
      expect(e.response.status).toEqual(500);
    }
  });

  it('Should return an internal server error if no token is provided', async () => {
    try {
      await axios.post(`${SERVER_URL}/api/admin/users`);
    } catch (e) {
      expect(e.response.data).toEqual('Internal Server Error');
    }
  });

  it('Should return all users', async () => {
    const response = await axios.post(`${SERVER_URL}/api/admin/users`, { token: 'testadmintoken' });
    expect(response.data).toEqual(
      expect.objectContaining({
        users: expect.any(Object),
        results: expect.any(Number),
        plans: expect.any(Object)
      })
    );
  });
});

describe('Admin json ID route', () => {
  it('Should return a 200 status code', async () => {
    try {
      await axios.post(`${SERVER_URL}/api/admin/json/${1}`);
    } catch (e) {
      expect(e.response.status).toEqual(500);
    }
  });

  it('Should return an unathorized error if no token is provided', async () => {
    try {
      await axios.post(`${SERVER_URL}/api/admin/json/${1}`);
    } catch (e) {
      expect(e.response.data).toEqual('Internal Server Error');
    }
  });

  it('Should return successful summary', async () => {
    const response = await axios.post(`${SERVER_URL}/api/admin/json/${1}`, { token: 'testadmintoken' });

    expect(response.data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        createTime: expect.any(String),
        activated: expect.any(Boolean),
        lastLoginTime: expect.any(String),
        planId: expect.any(String),
        Events: expect.any(Object)
       })
    );
  });
});

describe('Admin setplan route', () => {
  it('Should return a 200 status code', async () => {
    try {
      await axios.post(`${SERVER_URL}/api/admin/setplan`);
    } catch (e) {
      expect(e.response.status).toEqual(500);
    }
  });

  it('Should return an internal server error if no token is provided', async () => {
    try {
      await axios.post(`${SERVER_URL}/api/admin/setplan`);
    } catch (e) {
      expect(e.response.data).toEqual('Internal Server Error');
    }
  });

  it('Should return an empty body signifying success', async () => {
    const response = await axios.post(`${SERVER_URL}/api/admin/setplan`, { token: 'testadmintoken', userId: 1, planId:  'free-1g' });
    expect(response.data).toEqual('');
  });
});

describe('Events upload route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/events/upload`);
    expect(response.status).toEqual(200);
  });

  it('Should return an empty body signifying success', async () => {
    const response = await axios.post(`${SERVER_URL}/api/events/upload`, { files: 'test.txt', bytes: 1000, userId: '1' });
    expect(response.data).toEqual('');
  });
});

describe('Events download route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/events/download`);
    expect(response.status).toEqual(200);
  });

  it('Should return an empty body signifying success', async () => {
    const response = await axios.post(`${SERVER_URL}/api/events/download`, { files: 'test.txt', bytes: 1000, userId: '1' });
    expect(response.data).toEqual('');
  });
});

describe('Events delete route', () => {
  it('Should return a 200 status code', async () => {
    const response = await axios.post(`${SERVER_URL}/api/events/delete`);
    expect(response.status).toEqual(200);
  });

  it('Should return an empty body signifying success', async () => {
    const response = await axios.post(`${SERVER_URL}/api/events/delete`, { files: 'test.txt', bytes: 1000, userId: '1' });
    expect(response.data).toEqual('');
  });
});
