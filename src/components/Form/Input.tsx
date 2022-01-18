import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'
import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps{
  name?: string;
  label?: string;
  error?: FieldError;

}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        type="email"
        id={name}
        name={name}
        focusBorderColor="pink.500" 
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />  

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
