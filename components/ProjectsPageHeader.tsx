import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineFundProjectionScreen, AiOutlinePlus } from "react-icons/ai";

export const ProjectsPageHeader: React.FC<{ hasProjects: boolean }> = (
  props
) => (
  <Container>
    <Stack
      spacing="4"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
    >
      <HStack spacing="3">
        <AiOutlineFundProjectionScreen size="1.8rem" />
        <Heading size={{ base: "xs", md: "sm" }} fontWeight="medium">
          Projects
        </Heading>
      </HStack>
      {props.hasProjects && (
        <HStack spacing="2.5rem">
          <InputGroup maxW={{ sm: "xs" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="muted" boxSize="5" />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
          <Button variant="primary" leftIcon={<AiOutlinePlus />} width="6rem">
            New
          </Button>
        </HStack>
      )}
    </Stack>
  </Container>
);
