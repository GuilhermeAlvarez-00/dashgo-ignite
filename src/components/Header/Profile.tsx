import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Guilherme Alvarez</Text>
        <Text color="gray.300" fontSize="small">gui06barboza@gmail.com</Text>
      </Box>

     <Avatar
        size="md"
        name="Guilherme Alvarez"
        src="https://github.com/GuilhermeAlvarez-00.png" 
      />
    </Flex>
  )
}