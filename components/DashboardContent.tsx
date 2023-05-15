import {
  Box,
  BoxProps,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiDownloadCloud } from "react-icons/fi";

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
      <Stack direction="row" spacing="3">
        <Button
          variant="secondary"
          leftIcon={<FiDownloadCloud fontSize="1.25rem" />}
        >
          Download
        </Button>
        <Button variant="primary">Create</Button>
      </Stack>
    </Stack>
    <Stack spacing={{ base: "5", lg: "6" }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
    </Stack>
    <Card minH="xs" />
  </Stack>
);

const Card = (props: BoxProps) => (
  <Box minH="36" bg="bg-surface" boxShadow="sm" borderRadius="lg" {...props} />
);
