import { API_URL } from "@/pages/_app";
import { NextRouter, Router } from "next/router";
import { QueryFunctionContext } from "@tanstack/react-query";
import { useAppDispatch } from "./redux_hooks";
import { Project, ProjectInfo } from "./types/project";
interface Credentials {
  email: string;
  password: string;
}

async function postLogin({ queryKey }: any) {
  const [_key, { email, password }] = queryKey;
  const response = await fetch(`${API_URL}/auth/login`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    return;
  } else {
    throw new Error("Authentication failed.");
  }
}

async function signout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

async function getUsersForOrganization(): Promise<OrganizationUserData> {
  const response = await fetch(`${API_URL}/company/users`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("An error occured.");
  }

  const data = await response.json();

  return data;
}

async function inviteUserToOrganization(values: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}): Promise<OrganizationUser> {
  const response = await fetch(`${API_URL}/company/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      role: values.role,
    }),
  });

  if (response.ok) {
    const invitedUser = await response.json();
    return invitedUser;
  }

  if (response.status === 409) {
    throw new Error(
      "The user you're trying to invite already has an account with this email."
    );
  } else {
    throw new Error("An unknown error occured. Please try again later.");
  }
}

async function createNewProject(values: {
  projectName: string;
  projectDescription: string;
  projectLead: string;
  projectCoverImage: string;
}): Promise<ProjectInfo> {
  const response = await fetch(`${API_URL}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      project_name: values.projectName,
      project_description: values.projectDescription,
      project_lead: values.projectLead,
      project_cover_image: values.projectCoverImage,
    }),
  });

  if (response.ok) {
    const newProject = await response.json();
    return newProject;
  }

  if (response.status === 400) {
    throw new Error(
      "The project details you entered aren't valid. Please try again."
    );
  } else {
    throw new Error("An error occured. Please try again later.");
  }
}

export interface ProjectResponse {
  projects: ProjectInfo[];
}

async function getAllProjectsForOrganization(): Promise<ProjectResponse> {
  const response = await fetch(`${API_URL}/project`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const projects = await response.json();
    return projects;
  } else {
    throw new Error("An error occured. Please try again later.");
  }
}

async function getSubscribedProjects(): Promise<ProjectResponse> {
  const response = await fetch(`${API_URL}/project/subscribed`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const subscribed_projects = await response.json();
    return subscribed_projects;
  } else {
    throw new Error("An error occured. Please try again later.");
  }
}

async function subscribeToProject(values: {
  projectId: number;
}): Promise<ProjectInfo> {
  const response = await fetch(`${API_URL}/project/subscribed`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project_id: values.projectId,
    }),
  });
  if (!response.ok) {
    throw new Error("An error occured. Please try again later.");
  }
  const subscribedProject = await response.json();
  return subscribedProject;
}

async function getProjectInfo(projectId: number): Promise<Project> {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("An error occured. Please try again later.");
  }
  const info = await response.json();
  return info;
}

export {
  postLogin,
  signout,
  getUsersForOrganization,
  inviteUserToOrganization,
  createNewProject,
  getAllProjectsForOrganization,
  getSubscribedProjects,
  subscribeToProject,
  getProjectInfo,
};
