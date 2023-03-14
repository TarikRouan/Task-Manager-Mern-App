import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask } from '../features/tasks/taskSlice';

const AddTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {id} = useParams()

    const [task, setTask] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createTask({ id,  task}));
      setTask("");
      navigate('/')
    };
  
    return (
      <section>
        <h1> Create New Task </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Task</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Create Task</button>
        </form>
      </section>
    )
}

export default AddTask