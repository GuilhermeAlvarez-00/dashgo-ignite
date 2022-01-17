import { forwardRef, ForwardRefRenderFunction } from "react";
import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps{
  name?: string;
  label?: string;

}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, ...rest}, ref) => {
  return (
    <FormControl>
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
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
