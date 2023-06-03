import { Heading, Box, Text, Fade } from "@chakra-ui/react";

const NoTasksPlaceholder = () => {
  return (
    <Fade in={true}>
      <Box p={8} borderRadius="md" textAlign="center" mt={9}>
        <Heading as="h2" size="md" mb={2}>
          No tasks in this project.
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Start creating tasks to see them here.
        </Text>
      </Box>
    </Fade>
  );
};

export default NoTasksPlaceholder;
