import { useAppSelector } from "@/utils/redux_hooks";
import { userSlice } from "@/utils/store";
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Fade,
  HStack,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

const OrganizationUsersTable: React.FC<{ users: OrganizationUser[] }> = (
  props
) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.800", "gray.200");
  const hoverColor = useColorModeValue("gray.100", "gray.800");
  const currentUser = useAppSelector((state) => state.user);

  const activeUsers = props.users.filter((user) => {
    user.email !== currentUser.email;
  });

  return (
    <Table
      variant="unstyled"
      colorScheme="blue"
      {...props}
      backgroundColor="white"
    >
      <Thead bgColor={bgColor} color={color}>
        <Tr>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text fontWeight="bold">Name</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th fontWeight="bold">Role</Th>
          <Th fontWeight="bold">Email</Th>
          <Th fontWeight="bold">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {activeUsers.map((user) => (
          <Tr key={user.email} _hover={{ backgroundColor: hoverColor }}>
            <Td>
              <HStack spacing="3">
                <Avatar
                  name={user.first_name}
                  src={user.picture ? user.picture : ""}
                  boxSize="10"
                />
                <Box>
                  <Text fontWeight="medium">
                    {user.first_name + " " + user.last_name}
                  </Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text>{user.role}</Text>
            </Td>
            <Td>
              <Text>{user.email}</Text>
            </Td>
            <Td>
              <HStack spacing="1">
                <IconButton
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Delete member"
                />
                <IconButton
                  icon={<FiEdit2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Edit member"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrganizationUsersTable;
