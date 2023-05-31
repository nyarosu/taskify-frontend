import {
  Box,
  useDisclosure,
  Tab,
  TabList,
  Tabs,
  Flex,
  Skeleton,
  TabPanels,
  TabPanel,
  SlideFade,
  TabsProps,
} from "@chakra-ui/react";
import Head from "next/head";
import { ChangeEventHandler, ReactElement, useRef, useState } from "react";
import { ProjectsPageHeader } from "@/components/ProjectsPageHeader";
import { ProjectsTable } from "@/components/ProjectsTable";
import NoProjectsMessage from "@/components/NoProjectsMessage";
import CreateProjectModal from "@/components/CreateProjectModal";

import { useQuery } from "@tanstack/react-query";
import LoggedInLayout from "@/components/LoggedInLayout";
import { useAppSelector } from "@/utils/redux_hooks";
import NoUserProjectsMessage from "@/components/NoSubscribedProjectsMessage";
import NoSubscribedProjectsMessage from "@/components/NoSubscribedProjectsMessage";

const Projects = () => {
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: isLoadingAll,
    isError: isErrorAll,
    data: allProjects,
  } = useQuery({ queryKey: ["allProjects"], queryFn: () => {} });

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: userProjects,
  } = useQuery({ queryKey: ["subscribedProjects"], queryFn: () => {} });

  const [tabIndex, setTabIndex] = useState(0);
  const hasProjects = false;
  const hasSubscribedProjects = false;
  const tabRef = useRef<TabsProps>();
  const changeTab = (index: number) => {
    setTabIndex(index);
  };
  return (
    <>
      <Head>
        <title>Taskify | Projects</title>
      </Head>
      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      <SlideFade in={true}>
        <ProjectsPageHeader
          canCreate={user.isCompanyAdmin}
          openModal={onOpen}
        />
        <Flex direction="column" align="center">
          <Tabs
            onChange={setTabIndex}
            index={tabIndex}
            top="2rem"
            left="1.8rem"
            marginBottom="2rem"
            position="relative"
            alignSelf="flex-start"
            size={"lg"}
            variant="with-line"
            width="100%"
          >
            <TabList>
              <Tab>Your Projects</Tab>
              <Tab>All Projects</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Skeleton isLoaded={true}>
                  {hasSubscribedProjects ? (
                    <></>
                  ) : (
                    <NoSubscribedProjectsMessage changeTab={changeTab} />
                  )}
                </Skeleton>
              </TabPanel>
              <TabPanel>
                <Skeleton isLoaded={true}>
                  {hasProjects ? (
                    <></>
                  ) : (
                    <NoProjectsMessage openModal={onOpen} />
                  )}
                </Skeleton>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </SlideFade>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Projects;
