import type { NextPage } from 'next'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'

interface InputProps {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

const Signin: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<InputProps>({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState

  const handleSigin: SubmitHandler<InputProps> = async values => {
    await new Promise(resolve => {
      return setTimeout(resolve, 2000)
    })
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSigin)}
      >
        <Stack spacing="4">
          <Input
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default Signin
