
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);
  console.log(users);
  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    // post data to the server

    fetch('http://localhost:5000/user', {
      method: 'Post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser)

      })

  }
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='name' />
        <input type="email" name="email" id="" placeholder='email' />
        <button>add user</button>
      </form>
      {
        users?.map(user => <p key={user.id}> ID: {user.id}. name: {user.name} {user.email}</p>)
      }
      <h1>Hello users {users?.length}</h1>
    </div>
  );
}

export default App;
