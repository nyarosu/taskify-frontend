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
import { AiOutlinePlus } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";
import { BsFillPersonPlusFill } from "react-icons/bs";
import React from "react";

export const OrganizationPageHeader: React.FC<{
  hasUsers: boolean;
  openModal: () => void;
  setSearchQuery: (queryEvent: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  return (
    <Container>
      <Stack
        spacing="4"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
      >
        <HStack spacing="3">
          <CgOrganisation size="1.8rem" />
          <Heading size={{ base: "xs", md: "sm" }} fontWeight="medium">
            Organization
          </Heading>
        </HStack>
        {props.hasUsers && (
          <HStack spacing="0.5rem" position="relative" top="0.2rem">
            <InputGroup maxW={{ sm: "xs" }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="muted" boxSize="5" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                width="15rem"
                onChange={props.setSearchQuery}
              />
            </InputGroup>
            <Button
              variant="primary"
              leftIcon={<BsFillPersonPlusFill />}
              width="12rem"
              onClick={props.openModal}
            >
              Add a user
            </Button>
          </HStack>
        )}
      </Stack>
    </Container>
  );
};
