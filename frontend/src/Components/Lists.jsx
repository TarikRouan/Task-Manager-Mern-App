import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLists } from '../features/Lists/listSlice'
import List from './List'
import Spinner from './Spinner'

const Lists = () => {
  const dispatch = useDispatch()

  const {lists,isError,isSuccess,isLoading,message} = useSelector((state)=>state.list)

  useEffect(() => {
    if(isError){
      console.log(message)
    }

    dispatch(getLists())
  
  }, [isError, message])

  if(isLoading) {
    return <Spinner/>
  }
  
  return (
    <>
    <div className='list-main'>
      {lists.length > 0 ? (
        <div className='lists'>
          {lists.map((list)=>(
            <Link key={list._id} to={`/tasks/${list._id}`}>
            <List  list={list} />
            </Link>
          ))}
        </div>
      ) : (<h3>Empty</h3>)}
    <Link className='btn' to="/addList">Create New List</Link>
    </div>



    </>
  )
}

export default Lists