import {
  Grid,
  VStack,
  HStack,
  Heading,
  Flex,
  Avatar,
  Box,
  Text,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoSparklesSharp } from "react-icons/io5";

export const ProjectOverviewTab: React.FC<{
  isLoading: boolean;
  project_description: string;
  project_lead: OrganizationUser | undefined;
}> = (props) => {
  return (
    <>
      <Box my={6} />
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={6} p={5}>
        {!props.isLoading ? (
          <Box
            borderRadius="md"
            border="1px"
            borderColor="gray.200"
            p={5}
            bg="white"
            shadow="sm"
            h="310px"
          >
            <VStack spacing={4} align="start">
              <HStack spacing="0.5rem">
                <AiFillInfoCircle size={33} />
                <Heading as="h4" size="md" mb={2}>
                  Info
                </Heading>
              </HStack>

              <Flex alignItems="center" mb={4}>
                <Text fontWeight="bold" mr={2}>
                  Lead:
                </Text>
                <Avatar
                  name={
                    props.project_lead
                      ? props.project_lead.first_name +
                        " " +
                        props.project_lead.last_name
                      : ""
                  }
                  size="sm"
                  mr={2}
                />
                <Text>
                  {props.project_lead
                    ? props.project_lead.first_name +
                      " " +
                      props.project_lead.last_name
                    : ""}
                </Text>
              </Flex>

              <SkeletonText
                isLoaded={!props.isLoading}
                noOfLines={20}
                fadeDuration={3}
              >
                <Text
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {props.project_description}
                </Text>
              </SkeletonText>
            </VStack>
          </Box>
        ) : (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" fadeDuration={3} />
            <SkeletonText
              fadeDuration={3}
              mt="4"
              noOfLines={10}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        )}
        {!props.isLoading ? (
          <Box
            borderRadius="md"
            border="1px"
            borderColor="gray.200"
            p={5}
            bgGradient="linear(to-r, teal.500,green.500)"
            color="white"
            shadow="lg"
            h="310px"
          >
            <VStack spacing={4} align="start">
              <HStack spacing="0.5rem">
                <IoSparklesSharp size={33} />
                <Heading as="h4" size="md" mb={2}>
                  Insights
                </Heading>
              </HStack>
              <Text
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Placeholder for AI insights
              </Text>
            </VStack>
          </Box>
        ) : (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" fadeDuration={3} />
            <SkeletonText
              fadeDuration={3}
              mt="4"
              noOfLines={10}
              spacing="4"
              skeletonHeight="2"
            />
          </Box>
        )}
      </Grid>
    </>
  );
};
