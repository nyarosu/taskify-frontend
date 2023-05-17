import {
  Box,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export const ProjectsPageHeader = () => (
  <Container>
    <Stack
      spacing="4"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
    >
      <Stack spacing="1">
        <Heading size={{ base: "xs", md: "sm" }} fontWeight="medium">
          Projects
        </Heading>
        <Text color="muted">All projects for you, or for your company</Text>
      </Stack>
      <InputGroup maxW={{ sm: "xs" }}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} color="muted" boxSize="5" />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>
    </Stack>
  </Container>
);
