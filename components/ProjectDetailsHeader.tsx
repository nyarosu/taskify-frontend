import { Box, Heading } from "@chakra-ui/react";
import { useAppSelector } from "@/utils/redux_hooks";

export const ProjectDetailsHeader: React.FC<{ projectName: string }> = ({
  projectName,
}) => {
  return (
    <Box p={4} borderBottom="1px solid" borderColor="gray.200">
      <Box display="flex" alignItems="center">
        {/* Replace the placeholder image URL with the project's cover image */}
        <Box
          borderRadius="md"
          bg="gray.200"
          width="64px"
          height="64px"
          marginRight={4}
        ></Box>
        <Heading size="lg">{projectName}</Heading>
      </Box>
    </Box>
  );
};
