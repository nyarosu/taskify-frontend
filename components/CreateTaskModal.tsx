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
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { TaskType, TaskStatus, TaskPriority } from "@/utils/types/task";
import Select, { components, StylesConfig, OptionProps } from "react-select";
import { CSSObject } from "@emotion/react";

type OptionType = {
  label: string;
  value: string;
};

// Custom Option component for react-select
const Option = (props: OptionProps<OptionType, false>) => {
  const color =
    props.data.value === TaskType.Feature
      ? "green"
      : props.data.value === TaskType.Bug
      ? "red"
      : "blue";

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
  option: (provided: CSSObject): CSSObject => ({
    ...provided,
    transition: "0.2s",
    "&:hover": {
      background: "none", // remove or change hover background
    },
  }),
  menu: (provided: CSSObject): CSSObject => ({
    ...provided,
    animation: "fade-in 0.2s",
  }),
  // Add more custom styles here if necessary
};

export const CreateTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const toast = useToast();

  const createTask = async (values: any, { resetForm }: any) => {
    // Create task logic here
    // Make sure to set appropriate endpoint URL and request body according to your API

    try {
      // await API request to create task

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
          status: "",
          priority: "",
        }}
        onSubmit={createTask}
      >
        {(props) => (
          <Form>
            <ModalContent>
              <ModalHeader>Create a Task</ModalHeader>
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
                  <FormLabel>Status</FormLabel>
                  <Field name="status">
                    {({ field, form }: FieldProps) => (
                      <Select
                        components={{ Option }}
                        styles={customStyles}
                        options={[
                          {
                            value: TaskStatus.InProgress,
                            label: "In Progress",
                          },
                          { value: TaskStatus.Closed, label: "Closed" },
                          { value: TaskStatus.Blocked, label: "Blocked" },
                          {
                            value: TaskStatus.UpForGrabs,
                            label: "Up For Grabs",
                          },
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
