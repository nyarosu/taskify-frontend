import { ProjectResponse, joinProject } from "@/utils/queries";
import { parseProjectCoverImage } from "@/utils/types/project";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";

type OrganizationUser = {
  first_name: string;
  last_name: string;
};

type Project = {
  id: number;
  project_cover_image: string | null;
  name: string;
  description: string;
  project_lead: OrganizationUser;
};

interface OrganizationProjectsTableProps {
  projects: Project[];
  subscribed: Project[];
}

const OrganizationProjectsTable: React.FC<OrganizationProjectsTableProps> = ({
  projects,
  subscribed,
}) => {
  const router = useRouter();
  const bgColor = useColorModeValue("gray.200", "gray.600");
  const hoverBgColor = useColorModeValue("gray.300", "gray.500");
  const toast = useToast();
  const queryClient = useQueryClient();

  const [loadingId, setLoadingId] = useState<number>(0);
  const subscribeToProjectMutation = useMutation({
    mutationFn: joinProject,
    onSuccess: (data, variables) => {
      const currentSubscribed = queryClient.getQueryData<ProjectResponse>([
        "subscribedProjects",
      ]);
      // Update subscribed cache with new project
      if (currentSubscribed) {
        queryClient.setQueryData(["subscribedProjects"], {
          projects: [data, ...currentSubscribed.projects],
        });
      }
    },
  });

  const handleSubscribe = async (id: number) => {
    try {
      setLoadingId(id);
      await subscribeToProjectMutation.mutateAsync({
        projectId: id,
      });

      toast({
        title: "Subscribed to project!",
        position: "top",
        description: "You're now subscribed to this project.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "An error occured.",
          position: "top",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoadingId(0);
    }
  };
  return (
    <VStack width="100%" align="start" spacing={4}>
      {projects.map((project) => (
        <Box
          key={project.id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          p={4}
          borderRadius="md"
          transition="background 0.2s"
          _hover={{ cursor: "pointer", bg: hoverBgColor }}
          bg={bgColor}
          onClick={() =>
            router.push(`/projects/${project.id}`, undefined, { shallow: true })
          }
        >
          <Flex align="center">
            <Box boxSize="80px" marginRight={4}>
              <Image
                width={80} // reduced image size
                height={80}
                objectFit="cover"
                src={parseProjectCoverImage(project.project_cover_image)}
                alt={project.name}
              />
            </Box>
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="bold">
                {project.name}
              </Text>
              <Flex align="center">
                <Avatar
                  size="xs" // Reduced the size to 'xs' to make avatar smaller
                  src={""}
                  name={
                    project.project_lead.first_name +
                    " " +
                    project.project_lead.last_name
                  }
                  mr={2}
                />
                <Text fontSize="md" color="gray.500">
                  {project.project_lead.first_name +
                    " " +
                    project.project_lead.last_name}
                </Text>
              </Flex>
              <Text fontSize="sm" noOfLines={2} isTruncated maxWidth="55rem">
                {project.description} {/* Truncated description */}
              </Text>
            </VStack>
          </Flex>
          {!subscribed.some((subscribed) => {
            return subscribed.id == project.id;
          }) ? (
            <Button
              isLoading={loadingId === project.id}
              leftIcon={<IoPersonAdd />}
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe(project.id);
              }}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              Join
            </Button>
          ) : (
            <Button
              isLoading={false}
              leftIcon={<BsFillPersonCheckFill />}
              colorScheme="gray"
              variant="outline"
              isDisabled={true}
            >
              Joined
            </Button>
          )}
        </Box>
      ))}
    </VStack>
  );
};

export default OrganizationProjectsTable;
