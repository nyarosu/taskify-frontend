import {
  Avatar,
  Badge,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa";

const PendingUsersList: React.FC<{ users: OrganizationUser[] }> = (props) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.800", "gray.200");
  const hoverColor = useColorModeValue("gray.100", "gray.800");

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
            <Text fontWeight="bold">Name</Text>
          </Th>
          <Th fontWeight="bold">Role</Th>
          <Th fontWeight="bold">Email</Th>
          <Th fontWeight="bold">Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.users.map((user) => (
          <Tr key={user.email} _hover={{ backgroundColor: hoverColor }}>
            <Td>
              <Box display="flex" alignItems="center">
                <Avatar
                  name={user.first_name + " " + user.last_name}
                  src={user.picture ? user.picture : ""}
                  boxSize="10"
                />
                <Text fontWeight="medium" marginLeft="3">
                  {user.first_name + " " + user.last_name}
                </Text>
              </Box>
            </Td>
            <Td>
              <Text>{user.role}</Text>
            </Td>
            <Td>
              <Text>{user.email}</Text>
            </Td>
            <Td>
              <Box display="flex" alignItems="center">
                <Badge colorScheme="blue" fontWeight="bold">
                  Pending
                </Badge>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PendingUsersList;
