import { useEffect } from "react"
import {BiLogOut} from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import AddList from "../Components/AddList"
import AddTask from "../Components/AddTask"
import Lists from "../Components/Lists"
import Tasks from "../Components/Tasks"
import { logout, reset } from "../features/auth/authSlice"
import { reset as resetList } from "../features/Lists/listSlice"
import { reset as resetTask } from "../features/tasks/taskSlice"


const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(resetList())
    dispatch(resetTask())
    navigate('/login')
  }

  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }

  }, [user, navigate])
  

  return (
    <section >
      <div className="head">
        <h1>{user && user.name} Task Manager</h1>
        <button onClick={handleLogout} ><BiLogOut/> Logout</button>
      </div>
      <div className="content">
      <Lists/>
      <div className="content1">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/addList" element={<AddList/>} />
          <Route path="/addTask/:id" element={<AddTask/>} />
          <Route path="/tasks/:id" element={<Tasks/>} />
        </Routes>
      </div>
      </div>
    </section>
  )
}

export default Dashboard