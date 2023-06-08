import {
  Box,
  BoxProps,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Link,
  VStack,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiDownloadCloud } from "react-icons/fi";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const DashboardContent = () => (
  <Stack spacing={{ base: "8", lg: "6" }}>
    <Stack
      spacing="4"
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
    >
      <Stack spacing="1">
        <Heading size={{ base: "xs", lg: "sm" }} fontWeight="medium">
          Dashboard
        </Heading>
        <Text color="muted">All important metrics at a glance</Text>
      </Stack>
    </Stack>
    <Stack spacing={{ base: "5", lg: "6" }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <Card mainText="15" secondaryText="Open projects you're a member of" />
        <Card
          mainText="5"
          secondaryText="High priority tasks assigned to you"
        />
        <Card mainText="25" secondaryText="Open tasks assigned to you" />
      </SimpleGrid>
    </Stack>
    <Card minH="xs" py={5}>
      <VStack align="start" spacing={4}>
        <Heading size="lg" fontWeight="bold">
          Recent Items
        </Heading>
        <UnorderedList spacing={2}>
          <ListItem>
            <Link href="#" isExternal>
              <ChevronRightIcon boxSize={4} />
              <Text ml={2} color="blue.500">
                Task 1
              </Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="#" isExternal>
              <ChevronRightIcon boxSize={4} />
              <Text ml={2} color="blue.500">
                Task 2
              </Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="#" isExternal>
              <ChevronRightIcon boxSize={4} />
              <Text ml={2} color="blue.500">
                Project 1
              </Text>
            </Link>
          </ListItem>
        </UnorderedList>
      </VStack>
    </Card>
  </Stack>
);

interface CardProps extends BoxProps {
  mainText?: string;
  secondaryText?: string;
}

const Card: React.FC<CardProps> = ({ mainText, secondaryText, ...props }) => {
  const color = useColorModeValue("blue.500", "blue.200");

  return (
    <Box
      minH="36"
      bg="bg-surface"
      boxShadow="sm"
      borderRadius="lg"
      p={5}
      {...props}
    >
      <VStack align="start">
        <Heading size="3xl" color={color}>
          {mainText}
        </Heading>
        <Text color="muted">{secondaryText}</Text>
      </VStack>
    </Box>
  );
};
