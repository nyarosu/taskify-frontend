import { useRouter } from "next/router";
import {
  SlideFade,
  Text,
  Box,
  Grid,
  Heading,
  Avatar,
  Flex,
  HStack,
  Tabs,
  TabList,
  Tab,
  VStack,
  TabPanels,
  TabPanel,
  Skeleton,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import LoggedInLayout from "@/components/LoggedInLayout";
import { ReactElement, useState } from "react";
import { isError, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { ProjectDetailsHeader } from "@/components/ProjectDetailsHeader";
import { getProjectInfo } from "@/utils/queries";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoCreateOutline, IoSparklesSharp } from "react-icons/io5";
import { ProjectOverviewTab } from "@/components/ProjectOverviewTab";
import { TaskList } from "@/components/TaskList";
import NoTasksPlaceholder from "@/components/NoTasksPlaceholder";

const ProjectPage = () => {
  const router = useRouter();
  const { projectid } = router.query;

  // Fetch detailed project info
  const {
    isLoading: isLoadingProjectInfo,
    isError: isErrorProjectInfo,
    data: project,
  } = useQuery(["getProjectInfo", Number(projectid)], () =>
    getProjectInfo(Number(projectid))
  );

  // Hardcoded data for testing purposes

  return (
    <>
      <Head>
        <title>Taskify | {project ? project.name : ""} Project Details</title>
      </Head>
      <SlideFade in={true}>
        <ProjectDetailsHeader
          isLoading={isLoadingProjectInfo || isErrorProjectInfo}
          projectName={project ? project.name : ""}
        />
        <Box my={6} />
        <Tabs colorScheme="blue" variant="solid-rounded">
          <Flex justifyContent="space-between">
            <TabList>
              <Tab
                _selected={{
                  color: "white",
                  bg: "blue.500",
                  fontWeight: "bold",
                }}
              >
                Overview
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "blue.500",
                  fontWeight: "bold",
                }}
              >
                Tasks
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "blue.500",
                  fontWeight: "bold",
                }}
              >
                Members
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "blue.500",
                  fontWeight: "bold",
                }}
              >
                Insights
              </Tab>
            </TabList>

            <Button
              leftIcon={<IoCreateOutline />}
              onClick={() => {}}
              colorScheme="blue"
              marginRight={4}
            >
              Create Task
            </Button>
          </Flex>
          <TabPanels>
            <TabPanel>
              <ProjectOverviewTab
                isLoading={isLoadingProjectInfo || isErrorProjectInfo}
                project_description={project ? project.description : ""}
                project_lead={project?.project_lead}
              />
            </TabPanel>
            <TabPanel>
              <Skeleton isLoaded={!isLoadingProjectInfo && !isErrorProjectInfo}>
                {!isLoadingProjectInfo &&
                !isErrorProjectInfo &&
                project.tasks.length > 0 ? (
                  <TaskList
                    projectid={project.id}
                    tasks={
                      project
                        ? project.tasks.sort(
                            (a, b) => a.relative_priority - b.relative_priority
                          )
                        : []
                    }
                  />
                ) : (
                  <NoTasksPlaceholder />
                )}
              </Skeleton>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SlideFade>
    </>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default ProjectPage;
