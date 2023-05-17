import LoggedInLayout from "@/components/LoggedInLayout";
import { Box, Container, SlideFade } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Text } from "@chakra-ui/react";
import { ProjectsPageHeader } from "@/components/ProjectsPageHeader";

const Projects = () => {
  return (
    <SlideFade in={true}>
      <Box as="section" height="100vh" overflowY="auto">
        <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
          <ProjectsPageHeader />
        </Container>
      </Box>
    </SlideFade>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Projects;
