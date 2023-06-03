import { updateRelativeTaskPriority } from "@/utils/queries";
import { Task, TaskType } from "@/utils/types/task";
import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Button,
  chakra,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Reorder } from "framer-motion";
import { useState } from "react";

const List = chakra(Reorder.Group);
const ListItem = chakra(Reorder.Item);

export const TaskList: React.FC<{ tasks: Task[]; projectid: number }> = (
  props
) => {
  const queryClient = useQueryClient();
  const [order, setOrder] = useState(() =>
    props.tasks.map((task) => task.relative_priority)
  );

  const updatePriorityMutation = useMutation({
    mutationFn: updateRelativeTaskPriority,
    onSuccess: (data, variables) => {
      /* TODO */
    },
  });

  const onDragEnd = async (num: number[]) => {
    setOrder(num);
    const newOrder: NewOrder = num.reduce<{ [key: number]: number }>(
      (result, relative_priority, index) => {
        const task = props.tasks.find(
          (task) => task.relative_priority === relative_priority
        );
        if (task) {
          result[task.id] = index;
        }
        return result;
      },
      {}
    );
    // Send the new order to backend
    await updatePriorityMutation.mutateAsync({
      project_id: props.projectid,
      newOrder,
    });
  };

  return (
    <Flex direction="column" alignItems="flex-start">
      <Stack spacing="5" maxW="25rem" py={{ base: "4", md: "8" }}>
        <List values={order} onReorder={onDragEnd} listStyleType="none">
          <Stack spacing="3" width="25rem">
            {order
              .map((item) =>
                props.tasks.find((value) => value.relative_priority === item)
              )
              .map((issue, index) =>
                issue ? (
                  <ListItem
                    key={issue.relative_priority}
                    value={issue.relative_priority}
                    bg="bg-surface"
                    p="4"
                    boxShadow="sm"
                    position="relative"
                    borderRadius="lg"
                    cursor="grab"
                    whileTap={{ cursor: "grabbing", scale: 1.05 }}
                  >
                    <Stack shouldWrapChildren spacing="4">
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="emphasized"
                      >
                        {issue.name}
                      </Text>
                      <HStack justify="space-between">
                        <Badge
                          colorScheme={
                            issue.task_type === TaskType.Feature
                              ? "green"
                              : "red"
                          }
                          size="sm"
                        >
                          {issue.task_type}
                        </Badge>
                        <HStack spacing="3">
                          <Text
                            fontSize="xs"
                            color="subtle"
                            fontWeight="medium"
                          >
                            Priority: {order.length - index}
                          </Text>
                          <Avatar
                            size={"sm"}
                            name={
                              issue.assigned_to.first_name +
                              " " +
                              issue.assigned_to.last_name
                            }
                            boxSize="8"
                          />
                        </HStack>
                      </HStack>
                    </Stack>
                  </ListItem>
                ) : null
              )}
          </Stack>
        </List>
      </Stack>
    </Flex>
  );
};

export interface NewOrder {
  [taskId: number]: number;
}
