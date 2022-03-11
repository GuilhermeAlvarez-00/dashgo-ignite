import { Box, Flex, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Guilherme Alvarez</Text>

          <Text color="gray.300" fontSize="small">
            gui06barboza@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Guilherme Alvarez"
        src="https://github.com/GuilhermeAlvarez-00.png"
      />
    </Flex>
  )
}
