import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deleteList} from '../features/Lists/listSlice'
import Spinner from './Spinner'
import { deleteTask, getTasks, updateTask } from '../features/tasks/taskSlice'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'

const Tasks = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [deleteOn, setDeleteOn] = useState(false)
    const [updateOn, setUpdateOn] = useState(false)
    const [newTask, setNewTask] = useState('')
    const [taskI, setTaskI] = useState(null)

    const dispatch = useDispatch()

    const handleDelete = ()=> {
        dispatch(deleteList(id))
        navigate('/')


    }
    const handleDeleteTask = (taskId)=> {
        dispatch(deleteTask({id:id, taskId: taskId}))

    }
    const handleUpdateOn = (taskId)=> {
      setTaskI(taskId)
      setUpdateOn(true)
    }
    const handleUpdateOff = ()=> {
      setTaskI(null)
      setUpdateOn(false)
    }
    const handleUpdateTask = (taskId)=> {
        dispatch(updateTask({id:id, taskId: taskId, task: newTask}))
        handleUpdateOff()
        setNewTask('')

    }

  const {tasks,isError,isSuccess,isLoading,message} = useSelector((state)=>state.task)


    useEffect(() => {
        if(isError){
          console.log(message)
        }
    
        dispatch(getTasks(id))
      
      }, [isError, message, id])

      if(isLoading) {
        return <Spinner/>
      }


  return (
        <div className='tasks'>
            <div className='task-top'>
            {
                !deleteOn ? 
                (<button className='btn' onClick={()=> setDeleteOn(true)} >Delete list <RiDeleteBin6Line/></button>) 
                :
                (
                <>
                <div className='btns'>
                <button className='btn' onClick={handleDelete} >Confirm</button> 
                <h4> - Options - </h4>
                <button className='btn' onClick={()=> setDeleteOn(false)} >Cancel</button>
                </div>
                </>
                )
            }
            </div>
            {tasks.length > 0 ? (
        <div className='lists'>
          {tasks.map((task)=>(
            <div className='task' key={task._id}>
                  {
                    updateOn && task._id === taskI  ? 
                    (
                    <>
                      <div className='upIn'>
                        <input type="text" value={newTask} placeholder={task.title} onChange={e=>setNewTask(e.target.value)} />
                      </div>
                      <div >
                      <button className='btn' onClick={()=>handleUpdateTask(task._id)} >Confirm</button> 
                      <button className='btn' onClick={()=> handleUpdateOff} >Cancel</button>
                      </div>
                    </>
                    ) : 
                    (
                      <>
                      <div>
                        <p>{task.title}</p> <p>{new Date(task.createdAt).toLocaleString()}</p>
                      </div>
                      <div>
                      <span className='update' onClick={()=>handleUpdateOn(task._id)} ><AiOutlineEdit/></span> 
                      <span className='delete' onClick={()=> handleDeleteTask(task._id)} ><RiDeleteBin6Line/></span> 
                      </div>
                    </>)
                  }

            </div>

          ))}
        </div>
      ) : (<h3>Empty</h3>)}
        <Link className='btn' to={`/addTask/${id}`}>Create New List</Link>

        </div>
        
  )
}

export default Tasks