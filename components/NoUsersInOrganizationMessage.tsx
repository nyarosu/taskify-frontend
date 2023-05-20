import { Heading, Button, Box, Text } from "@chakra-ui/react";

import { BsFillPersonPlusFill } from "react-icons/bs";

const NoUsersInOrganizationMessage: React.FC<{ openModal: () => void }> = (
  props
) => {
  return (
    <Box p={4} borderRadius="md" textAlign="center" boxShadow="md">
      <Heading as="h2" size="md" mb={2}>
        No users in your organization.
      </Heading>
      <Text fontSize="sm" color="gray.500">
        Start adding users to your organization to see them here.
      </Text>
      <Button
        variant="primary"
        leftIcon={<BsFillPersonPlusFill />}
        width="9rem"
        top="1rem"
        onClick={props.openModal}
      >
        Add a user
      </Button>
    </Box>
  );
};

export default NoUsersInOrganizationMessage;
