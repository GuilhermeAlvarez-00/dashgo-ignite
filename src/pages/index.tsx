import type { NextPage } from 'next'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Input } from '../components/Form/Input'

interface InputProps {
  email: string;
  password: string;
}

const Signin: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<InputProps>()

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
          <Input label="E-mail" type="email" {...register('email')} isRequired />
          <Input label="Senha" type="password" {...register('password')} isRequired />
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
