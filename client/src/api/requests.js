import axios from 'axios';

export async function register(registerInputs) {
  const data = await axios
    .post('http://localhost:5000/user', registerInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch((err) => err);
  return data;
}

export async function loginAuthentication(loginInputs) {
  const data = await axios
    .post('http://localhost:5000/login', loginInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .then((response) => response.data)
    .catch((err) => err);
  return data;
}

export async function getUserByToken(token) {
  const data = await axios
    .get('http://localhost:5000/user', {
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

export async function getUserTasks(token) {
  const data = await axios
    .get('http://localhost:5000/task', {
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
    .post('http://localhost:5000/task', TaskInputs, {
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
