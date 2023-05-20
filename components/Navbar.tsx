import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHelpCircle, FiSearch, FiSettings } from "react-icons/fi";
import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";
import { ToggleButton } from "./ToggleButton";
import { useRouter } from "next/router";
import { useAppSelector } from "@/utils/redux_hooks";

export const Navbar = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box as="nav" bg="bg-surface" boxShadow="sm">
      <Container py={{ base: "3", lg: "4" }}>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Logo boxSize="2rem" />
            {isDesktop && (
              <ButtonGroup variant="ghost" spacing="1">
                <Button
                  aria-current={
                    router.pathname === "/dashboard" ? "page" : undefined
                  }
                  onClick={() => {
                    router.push("/dashboard", undefined, { shallow: true });
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  aria-current={
                    router.pathname === "/projects" ? "page" : undefined
                  }
                  onClick={() => {
                    router.push("/projects", undefined, { shallow: true });
                  }}
                >
                  Projects
                </Button>
                <Button
                  aria-current={
                    router.pathname === "/tasks" ? "page" : undefined
                  }
                >
                  Tasks
                </Button>
                {user.isCompanyAdmin && (
                  <Button
                    aria-current={
                      router.pathname === "/company" ? "page" : undefined
                    }
                  >
                    Company
                  </Button>
                )}
              </ButtonGroup>
            )}
          </HStack>
          {isDesktop ? (
            <HStack spacing="4">
              <ButtonGroup variant="ghost" spacing="1">
                <IconButton
                  icon={<FiSearch fontSize="1.25rem" />}
                  aria-label="Search"
                />
                <IconButton
                  icon={<FiSettings fontSize="1.25rem" />}
                  aria-label="Settings"
                />
                <IconButton
                  icon={<FiHelpCircle fontSize="1.25rem" />}
                  aria-label="Help Center"
                />
              </ButtonGroup>
              <Avatar
                boxSize="10"
                name="Christoph Winston"
                src="https://tinyurl.com/yhkm2ek8"
              />
            </HStack>
          ) : (
            <>
              <ToggleButton
                isOpen={isOpen}
                aria-label="Open Menu"
                onClick={onToggle}
              />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                isFullHeight
                preserveScrollBarGap
                // Only disabled for showcase
                trapFocus={false}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <Sidebar />
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
