import { useEffect, useState } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../Components/Spinner"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })
    
      const { email, password } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
      const handleChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }
    
        dispatch(login(userData))
      }
    
      if (isLoading) {
        return <Spinner />
      }
    

  return (
    <section>
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <form onSubmit={handleSubmit}>

            <input 
            type="text" 
            name="email" 
            value={email} 
            placeholder="Enter your email" 
            onChange={handleChange} />
            <input 
            type="password" 
            name="password" 
            value={password} 
            placeholder="Enter your password" 
            onChange={handleChange} />

            <button type="submlit">Submit</button>
        </form>
            <p>Create account? <span><Link to="/register">Register</Link></span> Now! </p>

    </section>
  )
}

export default Login