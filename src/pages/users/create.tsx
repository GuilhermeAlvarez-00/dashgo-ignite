import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

interface CreateUserFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No minímo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senha precisam ser iguais'),
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      try {
        const response = await api.post('users', {
          user: {
            ...user,
            created_at: new Date(),
          },
        })

        return response.data.user
      } catch (error) {
        console.log(error)
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')

        router.push('/users')
      },
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          p={['6', '8']}
          borderRadius={8}
          bg="gray.800"
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" bg="gray.700" />

          <VStack spacing="8">
            <SimpleGrid spacing={['6', '8']} w="100%" minChildWidth="240px">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid spacing={['6', '8']} w="100%" minChildWidth="240px">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
