import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
console.log(baseUrl);
export async function register(registerInputs) {
  const data = await axios
    .post(`${baseUrl}/user`, registerInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data);

  return data;
}

export async function loginAuthentication(loginInputs) {
  const data = await axios
    .post(`${baseUrl}/login`, loginInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data);

  return data;
}

export async function getUserByToken(token) {
  const data = await axios
    .get(`${baseUrl}/user`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json',
        Authorization: token
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data);
  return data;
}

export async function getUserTasks(token) {
  const data = await axios
    .get(`${baseUrl}/task`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json',
        Authorization: token
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch((err) => err);
  return data;
}

export async function addTask(TaskInputs, token) {
  const data = await axios
    .post(`${baseUrl}/task`, TaskInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json',
        Authorization: token
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data);
  return data;
}

export async function editTask(TaskInputs, token, taskId) {
  const data = await axios
    .put(`${baseUrl}/task/${taskId}`, TaskInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json',
        Authorization: token
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data);
  return data;
}

export async function removeTask(token, taskId) {
  const data = await axios
    .delete(`${baseUrl}/task/${taskId}`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json',
        Authorization: token
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data);

  return data;
}
