import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useLogin } from '../services/authService'

interface FormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/profile')
      },
      onError: (error: unknown) => {
        alert(`Login failed: ${error}`)
      },
    })
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-card__title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-card__input">
            <input
              {...register('email')}
              placeholder="Email"
              className={`form-card__input-field ${errors.email ? 'form-card__input-field--error' : ''}`}
            />
            <small className="form-card__input-errText">
              {errors.email?.message}
            </small>
          </div>
          <div className="form-card__input">
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className={`form-card__input-field ${errors.password ? 'form-card__input-field--error' : ''}`}
            />
            <small className="form-card__input-errText">
              {errors.password?.message}
            </small>
          </div>
          <button className="form-card__button" type="submit">
            Login
          </button>
        </form>
        <div className="form-card__link">
          Not a member?
          <Link className="form-card__link-nav" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
