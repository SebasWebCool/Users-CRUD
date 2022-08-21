import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'

function App() {

  const [usersInfo, setUsersInfo] = useState()
  const [usersEditInfo, setUsersEditInfo] = useState()
  const [show, setShow] = useState(false)

  const url=`https://users-crud1.herokuapp.com/users/`
  const getAllUsers = () => {
    axios.get(url)
      .then(res => {setUsersInfo(res.data)})
      .catch(err=> console.log(err))
  }
  useEffect(()=>{
    getAllUsers()
  },[])

  const openForm = () => {
    setShow(true)
}

  return (
    <div className="App">
      <h1>Users CRUD</h1>
      <button onClick={openForm} className='btn_create'>Create User</button>
      <UsersForm usersEditInfo={usersEditInfo} show={show} setShow={setShow} getAllUsers={getAllUsers}/>
      
     <div className='users__cont'>
        {
          usersInfo?.map(user => <UsersList setShow={setShow} key={user.id} setUsersEditInfo={setUsersEditInfo} getAllUsers={getAllUsers} user={user}/>)
        }
     </div>
    </div>
  )
}

export default App
