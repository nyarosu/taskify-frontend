import { Heading, Button, Box, Text } from "@chakra-ui/react"

import { AiOutlinePlus } from "react-icons/ai"

const NoProjectsMessage: React.FC<{ openModal: () => void }> = (props) => {
    return (<Box p={4} borderRadius="md" textAlign="center" boxShadow="md">
    <Heading as="h2" size="md" mb={2}>
      You don&apos;t have any projects.
    </Heading>
    <Text fontSize="sm" color="gray.500">
      Start creating projects to see them here.
    </Text>
    <Button
      variant="primary"
      leftIcon={<AiOutlinePlus />}
      width="11rem"
      top="1rem"
      onClick={props.openModal}
    >
      Create a project
    </Button>
  </Box>)
}

export default NoProjectsMessage