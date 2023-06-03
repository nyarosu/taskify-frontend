import { Box, Heading, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useAppSelector } from "@/utils/redux_hooks";
import Image from "next/image";
import { parseProjectCoverImage } from "@/utils/types/project";

export const ProjectDetailsHeader: React.FC<{
  projectName: string;
  isLoading: boolean;
}> = ({ projectName, isLoading }) => {
  return (
    <Flex p={2} borderColor="gray.200" alignItems="center">
      <Box mr={4}>
        <Skeleton isLoaded={!isLoading}>
          <Image
            width={64} // adjust size as per requirement
            height={64}
            objectFit="cover"
            src={parseProjectCoverImage("Rocket")}
            alt={projectName}
          />
        </Skeleton>
      </Box>
      <SkeletonText
        noOfLines={3}
        spacing="4"
        skeletonHeight="2"
        isLoaded={!isLoading}
      >
        <Heading size="lg">{projectName}</Heading>
      </SkeletonText>
    </Flex>
  );
};
