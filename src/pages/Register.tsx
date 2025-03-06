import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useRegister } from '../services/authService'

interface FormData {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (error: unknown) => {
        alert(`Registration failed: ${error}`)
      },
    })
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-card__title">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-card__input">
            <input
              {...register('userName')}
              placeholder="UserName"
              className={`form-card__input-field ${errors.userName ? 'form-card__input-field--error' : ''}`}
            />
            <small className="form-card__input-errText">
              {errors.userName?.message}
            </small>
          </div>
          <div className="form-card__input">
            <input
              type="email"
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
          <div className="form-card__input">
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              className={`form-card__input-field ${errors.confirmPassword ? 'form-card__input-field--error' : ''}`}
            />
            <small className="form-card__input-errText">
              {errors.confirmPassword?.message}
            </small>
          </div>
          <button className="form-card__button" type="submit">
            Register
          </button>
        </form>
        <div className="form-card__link">
          Already a member?
          <Link className="form-card__link-nav" to="/">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
