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
  useDisclosure,
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
import { Task } from "@/utils/types/task";
import { TaskDetails } from "@/components/TaskDetails";
import { CreateTaskModal } from "@/components/CreateTaskModal";

const ProjectPage = () => {
  const router = useRouter();
  const { projectid } = router.query;
  const {
    isOpen: createTaskModalIsOpen,
    onOpen: onCreateTaskModalOpen,
    onClose: onCreateTaskModalClose,
  } = useDisclosure();

  // Fetch detailed project info
  const {
    isLoading: isLoadingProjectInfo,
    isError: isErrorProjectInfo,
    data: project,
  } = useQuery(
    ["getProjectInfo", Number(projectid)],
    () => getProjectInfo(Number(projectid)),
    { staleTime: 0, cacheTime: 0, refetchOnMount: true }
  );

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <Head>
        <title>Taskify | {project ? project.name : ""} Project Details</title>
      </Head>
      <SlideFade in={true}>
        <CreateTaskModal
          projectId={project ? project.id : 0}
          isOpen={createTaskModalIsOpen}
          onClose={onCreateTaskModalClose}
        />
        <ProjectDetailsHeader
          isLoading={isLoadingProjectInfo || isErrorProjectInfo}
          projectName={project ? project.name : ""}
          projectCover={project ? project.project_cover_image : null}
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
              colorScheme="blue"
              marginRight={4}
              onClick={onCreateTaskModalOpen}
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
                {project && project.tasks.length > 0 ? (
                  <Flex direction="row">
                    <Box flex="1">
                      <TaskList
                        projectid={project.id}
                        tasks={project.tasks.sort(
                          (a, b) => a.relative_priority - b.relative_priority
                        )}
                        onTaskClick={setSelectedTask}
                      />
                    </Box>
                    <Box
                      flex="1"
                      mt={5}
                      bg={selectedTask ? "gray.100" : ""}
                      h="100%"
                      maxW="100%"
                      overflow="auto"
                    >
                      {selectedTask && (
                        <SlideFade in={true}>
                          <TaskDetails task={selectedTask} />
                        </SlideFade>
                      )}
                    </Box>
                  </Flex>
                ) : (
                  <Flex
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <NoTasksPlaceholder />
                  </Flex>
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
