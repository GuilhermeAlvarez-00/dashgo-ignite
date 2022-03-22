import { useQuery } from 'react-query'
import { api } from '../api'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUserResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  const response = await api.get('/users', {
    params: {
      page,
    },
  })
  const { data, headers } = response
  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      dateStyle: 'long',
    }),
  }))

  const totalCount = Number(headers['x-total-count'])
  console.log('total count = ', totalCount)

  return {
    users,
    totalCount,
  }
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
