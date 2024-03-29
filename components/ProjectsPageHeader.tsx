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
import { useAppSelector } from "@/utils/redux_hooks";

export const ProjectsPageHeader: React.FC<{
  canCreate: boolean | null;
  openModal: () => void;
}> = (props) => {
  const user = useAppSelector((state) => state.user);
  return (
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

        <HStack spacing="2.5rem">
          <InputGroup maxW={{ sm: "xs" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="muted" boxSize="5" />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
          {user.isCompanyAdmin && (
            <Button
              variant="solid"
              colorScheme="blue"
              size="md"
              leftIcon={<AiOutlinePlus />}
              onClick={props.openModal}
              px={6}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              New
            </Button>
          )}
        </HStack>
      </Stack>
    </Container>
  );
};
