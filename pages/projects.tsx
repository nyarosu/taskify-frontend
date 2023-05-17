import LoggedInLayout from "@/components/LoggedInLayout";
import { useDisclosure } from "@chakra-ui/react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  SlideFade,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { Text } from "@chakra-ui/react";
import { ProjectsPageHeader } from "@/components/ProjectsPageHeader";
import { ProjectsTable } from "@/components/ProjectsTable";
import { AiOutlinePlus } from "react-icons/ai";
import { members } from "@/components/data";
import CreateProjectModal from "@/components/CreateProjectModal";

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasProjects = members.length > 0;
  return (
    <>
      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      <SlideFade in={true}>
        <ProjectsPageHeader hasProjects={hasProjects} />
        <Box overflowX="auto" marginTop={"2rem"}>
          {hasProjects ? (
            <ProjectsTable />
          ) : (
            <Box p={4} borderRadius="md" textAlign="center" boxShadow="md">
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
                onClick={onOpen}
              >
                Create a project
              </Button>
            </Box>
          )}
        </Box>
      </SlideFade>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Projects;
