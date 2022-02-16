import axios from 'axios';

export async function register(registerInputs) {
  const { data } = await axios
    .post('http://localhost:5000/user', registerInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'same-origin'
    })
    .catch((err) => console.log(err.message));
  return data;
}
