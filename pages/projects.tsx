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
import NoProjectsMessage from "@/components/NoProjectsMessage";
import CreateProjectModal from "@/components/CreateProjectModal";
import Head from "next/head";

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasProjects = members.length > 0;
  return (
    <>
      <Head>
        <title>Taskify | Projects</title>
      </Head>
      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      <SlideFade in={true}>
        <ProjectsPageHeader hasProjects={hasProjects} />
        <Box overflowX="auto" marginTop={"2rem"}>
          {hasProjects ? (
            <ProjectsTable />
          ) : (
            <NoProjectsMessage openModal={onOpen} />
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
