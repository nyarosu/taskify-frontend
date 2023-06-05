import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Tag,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import {
  TaskType,
  TaskStatus,
  TaskPriority,
  getColorSchemeForType,
  getColorSchemeForStatus,
  getColorSchemeForPriority,
} from "@/utils/types/task";
import Select, { components, StylesConfig, OptionProps } from "react-select";
import { CSSObject } from "@emotion/react";
import { API_URL } from "@/pages/_app";
import { Item, useAsyncList } from "react-stately";
import { UserType } from "@/utils/store";
import { Autocomplete } from "./Autocomplete";
import { UserSuggestion } from "./UserSuggestion";
import { useQueryClient } from "@tanstack/react-query";

type OptionType = {
  label: string;
  value: string;
};

const Option = (props: OptionProps<OptionType, false>) => {
  const color = Object.values(TaskType).includes(props.data.value as TaskType)
    ? getColorSchemeForType(props.data.value as TaskType)
    : Object.values(TaskPriority).includes(props.data.value as TaskPriority)
    ? getColorSchemeForPriority(props.data.value as TaskPriority)
    : "gray";

  return (
    <components.Option {...props}>
      <Tag borderRadius="full" colorScheme={color} mr="1" variant="subtle">
        {props.data.label}
      </Tag>
    </components.Option>
  );
};

// Custom styles for react-select
const customStyles: StylesConfig<OptionType, false> = {
  option: (provided: CSSObject, state: any): CSSObject => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "lightgray"
      : state.isFocused
      ? "lightgray"
      : undefined,
    transition: "0.1s",
    "&:hover": {
      background: "lightgray", // consistent hover background
    },
  }),
  menu: (provided: CSSObject): CSSObject => ({
    ...provided,
    animation: "none", // no animation for better performance
  }),
  // Add more custom styles here if necessary
};

export const CreateTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
}> = ({ isOpen, onClose, projectId }) => {
  const [selectedAssignee, setSelectedAssignee] = useState<string>();
  const [assigneeIsInvalid, setAssigneeIsInvalid] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();

  interface TaskAssigneeSuggestion {
    full_name: string;
    email: string;
    role: string;
  }

  const setAssignee = (assignee: string | undefined) => {
    setAssigneeIsInvalid(false);
    setSelectedAssignee(assignee);
  };

  let list = useAsyncList<TaskAssigneeSuggestion>({
    async load({ signal, cursor, filterText }) {
      let res = await fetch(
        `${API_URL}/project/${projectId}/members/search?query=${encodeURIComponent(
          filterText ? filterText : ""
        )}${cursor ? `&cursor=${cursor}` : ""}`,
        { signal, credentials: "include" }
      );
      if (res.ok) {
        let json = await res.json();
        return {
          items: json.results,
          cursor: json.next,
        };
      } else {
        return {
          items: [],
          cursor: null,
        };
      }
    },
  });

  const createTask = async (values: any, { resetForm }: any) => {
    try {
      toast({
        title: "Task created!",
        position: "top",
        description: "Task successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "An error occurred.",
          position: "top",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <Formik
        initialValues={{
          name: "",
          description: "",
          task_type: "",
          priority: "",
          taskAssignee: "",
          points: 0,
        }}
        onSubmit={createTask}
      >
        {(props) => (
          <Form>
            <ModalContent>
              <ModalHeader>New task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Task Name</FormLabel>
                  <Field as={Input} name="name" required />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Description</FormLabel>
                  <Field as={Textarea} name="description" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Assignee</FormLabel>
                  <Autocomplete
                    isInvalid={assigneeIsInvalid}
                    items={list.items}
                    isRequired={true}
                    inputValue={list.filterText}
                    onInputChange={list.setFilterText}
                    loadingState={list.loadingState}
                    onLoadMore={list.loadMore}
                    onSelectionChange={(key) => {
                      setAssignee(key ? key.toString() : undefined);
                    }}
                    placeholder="Search by name, role or email"
                  >
                    {(item) => (
                      <Item key={item.email} textValue={item.full_name}>
                        <UserSuggestion user={item} />
                      </Item>
                    )}
                  </Autocomplete>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Task Type</FormLabel>
                  <Field name="task_type">
                    {({ field, form }: FieldProps) => (
                      <Select
                        components={{ Option }}
                        styles={customStyles}
                        options={[
                          { value: TaskType.Feature, label: "Feature" },
                          { value: TaskType.Bug, label: "Bug" },
                        ]}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                        required
                      />
                    )}
                  </Field>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Priority</FormLabel>
                  <Field name="priority">
                    {({ field, form }: FieldProps) => (
                      <Select
                        components={{ Option }}
                        styles={customStyles}
                        options={[
                          { value: TaskPriority.Critical, label: "Critical" },
                          { value: TaskPriority.High, label: "High" },
                          { value: TaskPriority.Medium, label: "Medium" },
                          { value: TaskPriority.Low, label: "Low" },
                          { value: TaskPriority.Backlog, label: "Backlog" },
                        ]}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                        required
                      />
                    )}
                  </Field>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Points</FormLabel>
                  <Field name="points">
                    {({ field, form }: FieldProps) => (
                      <NumberInput
                        min={0}
                        onChange={(valueString) =>
                          form.setFieldValue(field.name, valueString)
                        }
                      >
                        <NumberInputField {...field} />
                      </NumberInput>
                    )}
                  </Field>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="blue" type="submit">
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
