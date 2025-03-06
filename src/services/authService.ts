import { useMutation } from '@tanstack/react-query'
import axiosClient from './axiosClient'

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await axiosClient.get(
      `/users?email=${email}&password=${password}`
    )
    console.log(response.data)
    if (response.data.length > 0) {
      return response.data[0]
    } else {
      throw new Error('Invalid email or password')
    }
  },

  register: async (userName: string, email: string, password: string) => {
    const response = await axiosClient.post('/users', {
      userName,
      password,
      email,
    })
    return response.data
  },
}

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: ({
      userName,
      email,
      password,
    }: {
      userName: string
      email: string
      password: string
    }) => authApi.register(userName, email, password),
  })
}
