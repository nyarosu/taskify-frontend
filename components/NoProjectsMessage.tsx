import { useAppSelector } from "@/utils/redux_hooks";
import { UserType } from "@/utils/store";
import { Heading, Button, Text, Box } from "@chakra-ui/react";
import { useRef } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";

const NoUserProjectsMessage: React.FC<{ openModal: () => void }> = (props) => {
  const user = useAppSelector((state) => state.user);
  // Individual account
  switch (user.type) {
    case UserType.OrganizationMember:
      return (
        <Box p={8} borderRadius="md" textAlign="center">
          <Heading as="h2" size="md" mb={2}>
            No projects in your organization
          </Heading>
          <Text fontSize="sm" color="gray.500">
            To create one, ask your admin. You&apos;ll then be able to see and
            subscribe to it here.
          </Text>
        </Box>
      );

    case UserType.OrganizationAdmin:
      return (
        <Box p={8} borderRadius="md" textAlign="center">
          <Heading as="h2" size="md" mb={2}>
            No projects in your organization
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Create one to see it here.
          </Text>
          <Button
            variant="primary"
            leftIcon={<AiOutlinePlus />}
            width="7rem"
            top="1rem"
            onClick={props.openModal}
          >
            Create
          </Button>
        </Box>
      );
  }
};

export default NoUserProjectsMessage;
