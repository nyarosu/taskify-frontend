import { useAppSelector } from "@/utils/redux_hooks";
import { UserType } from "@/utils/store";
import { Heading, Button, Text, Box } from "@chakra-ui/react";
import { useRef } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";

const NoUserProjectsMessage: React.FC<{
  changeTab: (index: number) => void;
}> = (props) => {
  const user = useAppSelector((state) => state.user);

  return (
    <Box p={8} borderRadius="md" textAlign="center">
      <Heading as="h2" size="md" mb={2}>
        You don&apos;t have any subscribed projects.
      </Heading>
      <Text fontSize="sm" color="gray.500">
        Subscribe to a project in your organization to see it here.
      </Text>
      <Button
        variant="primary"
        leftIcon={<CgOrganisation />}
        width="9rem"
        top="1rem"
        onClick={() => {
          props.changeTab(1);
        }}
      >
        View all
      </Button>
    </Box>
  );
};

export default NoUserProjectsMessage;
