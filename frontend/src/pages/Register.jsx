import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserCircle } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordV: '',
  })

  const { name, email, password, passwordV } = formData

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

    if (password !== passwordV) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <section>
        <h1>
            <FaUserCircle/> Register
        </h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            value={name} 
            placeholder="Enter your name" 
            onChange={handleChange} />
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
            <input 
            type="password" 
            name="passwordV" 
            value={passwordV} 
            placeholder="Confirm password" 
            onChange={handleChange} />

            <button type="submlit">Submit</button>
        </form>
        <p>Already got an account? <span><Link to="/login">Login</Link></span> Now! </p>

    </section>
  )
}

export default Register