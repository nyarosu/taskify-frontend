import { ProjectInfo, parseProjectCoverImage } from "@/utils/types/project";
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
import Image from "next/image";
import { useRouter } from "next/router";
import { IoPersonAdd } from "react-icons/io5";

type OrganizationUser = {
  first_name: string;
  last_name: string;
};

interface SubscribedProjectsTableProps {
  projects: ProjectInfo[];
}

const SubscribedProjectsTable: React.FC<SubscribedProjectsTableProps> = ({
  projects,
}) => {
  const router = useRouter();
  const bgColor = useColorModeValue("gray.200", "gray.600");
  const hoverBgColor = useColorModeValue("gray.300", "gray.500");

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
                width={80}
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
                  size="xs"
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
                {project.description}
              </Text>
            </VStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default SubscribedProjectsTable;
