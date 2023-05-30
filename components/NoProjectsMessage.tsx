import { useAppSelector } from "@/utils/redux_hooks";
import { UserType } from "@/utils/store";
import { Heading, Button, Box, Text } from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";

const NoProjectsMessage: React.FC<{ openModal: () => void }> = (props) => {
  const user = useAppSelector((state) => state.user);
  // Individual account
  switch (user.type) {
    case UserType.OrganizationMember:
      return (
        <Box p={4} borderRadius="md" textAlign="center" boxShadow="md">
          <Heading as="h2" size="md" mb={2}>
            You don&apos;t have any active projects.
          </Heading>
          <Text fontSize="sm" color="gray.500">
            To create a new project, ask an admin, or join a project from your
            company:
          </Text>
          <Button
            variant="primary"
            leftIcon={<CgOrganisation />}
            width="22rem"
            top="1rem"
            onClick={() => {}}
          >
            Browse projects in your organization
          </Button>
        </Box>
      );
    case UserType.OrganizationAdmin:
      return (
        <Box p={4} borderRadius="md" textAlign="center" boxShadow="md">
          <Heading as="h2" size="md" mb={2}>
            No projects in your organization.
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
        </Box>
      );
  }
};

export default NoProjectsMessage;
