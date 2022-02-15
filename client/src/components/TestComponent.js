import React, { useEffect, useState } from 'react'
import axios from 'axios';

function TestComponent() {
  const [result, setResult] = useState();
  const [registerInputs, setRegisterInputs] = useState({
    displayName: 'testando',
    email: 'teste1@gmail.com',
    password: '12asdasd78',
  });

  useEffect(() => {
    axios.post('http://localhost:5000/user', registerInputs, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then((result) => result.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  }, [registerInputs])
  return (
    <div>TestComponent</div>
  )
}

export default TestComponent