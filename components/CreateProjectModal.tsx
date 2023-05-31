import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Select,
  Grid,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Rocket from "../public/rocket.png";
import Blueprint from "../public/blueprint.png";
import Compass from "../public/compass.png";
import Lighthouse from "../public/lighthouse.png";
import Dartboard from "../public/dartboard.png";
import Telescope from "../public/telescope.png";

import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { Autocomplete } from "./Autocomplete";
import { Item, useAsyncList } from "react-stately";
import { API_URL } from "@/pages/_app";
import ProjectLeadSuggestion from "./ProjectLeadSuggestion";
import { useAppSelector } from "@/utils/redux_hooks";
import { UserType } from "@/utils/store";
import { useMutation } from "@tanstack/react-query";
import { createNewProject } from "@/utils/queries";

const CreateProjectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (
  props
) => {
  const user = useAppSelector((state) => state.user);
  const [projectCoverImage, setProjectCoverImage] = useState<StaticImageData>();
  const [projectCoverImageName, setProjectCoverImageName] = useState<string>();
  const [selectedProjectLead, setSelectedProjectLead] = useState<string>();
  const [projectLeadIsInvalid, setProjectLeadIsInvalid] = useState(false);

  const toast = useToast();

  const createProjectMutation = useMutation({
    mutationFn: createNewProject,
    onSuccess: (data, variables) => {},
  });

  const closeModal = props.onClose;
  const createProject = async (values: any, { resetForm }: any) => {
    if (!selectedProjectLead) {
      setProjectLeadIsInvalid(true);
      return;
    } else {
      values.projectLead = selectedProjectLead;
    }
    values.projectCoverImage = projectCoverImageName;

    try {
      await createProjectMutation.mutateAsync(values);

      toast({
        title: "Project created!",
        position: "top",
        description: "Project successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      setSelectedProjectLead(undefined);
      list.setFilterText("");
      setProjectCoverImage(undefined);
      setProjectCoverImageName(undefined);
      props.onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "An error occured.",
          position: "top",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setSelectedProjectLead(undefined);
      setProjectCoverImage(undefined);
      setProjectCoverImageName(undefined);
      return;
    }
  };

  const setProjectLead = (projectLead: string | undefined) => {
    setProjectLeadIsInvalid(false);
    setSelectedProjectLead(projectLead);
  };

  const handleImageChange = (name: string, image: StaticImageData) => {
    setProjectCoverImage(image);
    setProjectCoverImageName(name);
  };

  // Options for cover images
  const coverImages = new Map<string, StaticImageData>();
  coverImages.set("Rocket", Rocket);
  coverImages.set("Blueprint", Blueprint);
  coverImages.set("Compass", Compass);
  coverImages.set("Lighthouse", Lighthouse);
  coverImages.set("Dartboard", Dartboard);
  coverImages.set("Telescope", Telescope);

  interface ProjectLeadSuggestion {
    full_name: string;
    email: string;
    role: string;
  }

  let list = useAsyncList<ProjectLeadSuggestion>({
    async load({ signal, cursor, filterText }) {
      let res = await fetch(
        `${API_URL}/company/users/search?query=${encodeURIComponent(
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

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <Formik
          initialValues={{
            projectName: "",
            projectDescription: "",
            projectLead: "",
            projectCoverImage: "",
          }}
          onSubmit={createProject}
        >
          {(props) => (
            <Form>
              <ModalContent>
                <ModalHeader>
                  <HStack>
                    <AiOutlinePlus />
                    <Text>Create a project</Text>
                  </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <FormControl mb={4}>
                      <FormLabel>Project Name</FormLabel>
                      <Field as={Input} name="projectName" required />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Project Description</FormLabel>
                      <Field as={Textarea} name="projectDescription" required />
                    </FormControl>
                    {user.type === UserType.OrganizationAdmin && (
                      <FormControl mb={4}>
                        <FormLabel>Project Lead</FormLabel>
                        <Autocomplete
                          isInvalid={projectLeadIsInvalid}
                          items={list.items}
                          isRequired={user.type === UserType.OrganizationAdmin}
                          inputValue={list.filterText}
                          onInputChange={list.setFilterText}
                          loadingState={list.loadingState}
                          onLoadMore={list.loadMore}
                          onSelectionChange={(key) => {
                            setProjectLead(key ? key.toString() : undefined);
                          }}
                          placeholder="Search by name, role or email"
                        >
                          {(item) => (
                            <Item key={item.email} textValue={item.full_name}>
                              <ProjectLeadSuggestion user={item} />
                            </Item>
                          )}
                        </Autocomplete>
                      </FormControl>
                    )}
                    <FormControl mb={4}>
                      <FormLabel mb={3}>Cover Image (optional)</FormLabel>
                      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        {Array.from(coverImages).map(([name, image]) => (
                          <Box
                            key={name}
                            onClick={() => handleImageChange(name, image)}
                            cursor="pointer"
                            borderWidth={2}
                            borderColor={
                              projectCoverImage === image
                                ? "blue.500"
                                : "gray.300"
                            }
                            borderRadius="md"
                            p={2}
                          >
                            <Image
                              src={image}
                              alt={`${name}`}
                              objectFit="cover"
                            />
                          </Box>
                        ))}
                      </Grid>
                    </FormControl>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={() => {
                      props.handleReset();
                      closeModal();
                    }}
                  >
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
    </>
  );
};

export default CreateProjectModal;
