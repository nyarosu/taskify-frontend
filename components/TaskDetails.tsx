import {
  Task,
  TaskPriority,
  TaskStatus,
  TaskType,
  getColorSchemeForPriority,
  getColorSchemeForStatus,
  getTextForPriorityValue,
} from "@/utils/types/task";
import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Avatar,
  Divider,
  IconButton,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { FaExpand } from "react-icons/fa"; // Icon for fullscreen
import { useRouter } from "next/router";

export const TaskDetails: React.FC<{ task: Task }> = ({ task }) => {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");

  const truncate = (input: string) =>
    input.length > 150 ? `${input.substring(0, 150)}...` : input;

  return (
    <Box
      p={6}
      borderRadius="lg"
      bg={bg}
      boxShadow="md"
      height="100%"
      maxW="100%"
      overflowY="auto"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Heading size="lg" isTruncated maxWidth="85%">
          {task.name}
        </Heading>
        <IconButton
          aria-label="Fullscreen"
          icon={<FaExpand />}
          size="sm"
          isRound
          onClick={() => router.push(`/task/${task.id}`)}
        />
      </Flex>
      <Divider mb={4} />
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Priority:</Text>
        <Badge colorScheme={getColorSchemeForPriority(task.priority)}>
          {getTextForPriorityValue(task.priority)}
        </Badge>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Status:</Text>
        <Badge colorScheme={getColorSchemeForStatus(task.status)}>
          {task.status}
        </Badge>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Type:</Text>
        <Badge colorScheme={task.task_type === TaskType.Bug ? "red" : "green"}>
          {task.task_type === TaskType.Bug ? "Bug" : "Feature"}
        </Badge>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Text fontWeight="bold">Assignee:</Text>
        <Flex alignItems="center">
          <Avatar
            size="sm"
            name={
              task.assigned_to.first_name + " " + task.assigned_to.last_name
            }
          />
          <Text ml={2}>
            {task.assigned_to.first_name} {task.assigned_to.last_name}
          </Text>
        </Flex>
      </Flex>
      <Text mb={2} fontWeight="bold">
        Description:
      </Text>
      <Tooltip label={task.description} placement="top" shouldWrapChildren>
        <Text
          whiteSpace="pre-line"
          overflowWrap="break-word"
          wordBreak="break-word"
        >
          {truncate(task.description ? task.description : "")}
        </Text>
      </Tooltip>
    </Box>
  );
};
