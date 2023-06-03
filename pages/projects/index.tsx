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
  SkeletonText,
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
import {
  getAllProjectsForOrganization,
  getJoinedProjects,
} from "@/utils/queries";
import OrganizationProjectsTable from "@/components/OrganizationProjectsTable";
import SubscribedProjectsTable from "@/components/SubscribedProjectsTable";

const Projects = () => {
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: isLoadingAll,
    isError: isErrorAll,
    data: allProjects,
  } = useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjectsForOrganization,
  });

  const {
    isLoading: isLoadingSubscribed,
    isError: isErrorSubscribed,
    data: subscribedProjects,
  } = useQuery({
    queryKey: ["subscribedProjects"],
    queryFn: getJoinedProjects,
  });

  const [tabIndex, setTabIndex] = useState(0);
  const hasProjects =
    !isLoadingAll && !isErrorAll && allProjects.projects.length > 0;
  const hasSubscribedProjects =
    !isLoadingSubscribed &&
    !isErrorSubscribed &&
    subscribedProjects.projects.length > 0;
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
                <SkeletonText
                  isLoaded={!isLoadingSubscribed && !isErrorSubscribed}
                  noOfLines={7}
                  spacing="10"
                  skeletonHeight="10"
                >
                  {hasSubscribedProjects ? (
                    <SubscribedProjectsTable
                      projects={
                        !isLoadingSubscribed &&
                        !isErrorSubscribed &&
                        subscribedProjects
                          ? subscribedProjects.projects
                          : []
                      }
                    />
                  ) : (
                    <NoSubscribedProjectsMessage changeTab={changeTab} />
                  )}
                </SkeletonText>
              </TabPanel>
              <TabPanel>
                <SkeletonText
                  isLoaded={!isLoadingSubscribed && !isErrorSubscribed}
                  noOfLines={7}
                  spacing="10"
                  skeletonHeight="10"
                >
                  {hasProjects ? (
                    <OrganizationProjectsTable
                      projects={
                        !isLoadingAll && !isErrorAll && allProjects
                          ? allProjects.projects
                          : []
                      }
                      subscribed={
                        !isLoadingSubscribed &&
                        !isErrorSubscribed &&
                        subscribedProjects
                          ? subscribedProjects.projects
                          : []
                      }
                    />
                  ) : (
                    <NoProjectsMessage openModal={onOpen} />
                  )}
                </SkeletonText>
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
