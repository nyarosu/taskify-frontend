import { API_URL } from "@/pages/_app";
import { NextRouter, Router } from "next/router";
import { QueryFunctionContext } from "@tanstack/react-query";
import { useAppDispatch } from "./redux_hooks";
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
    const invitedUser = response.json();
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
export {
  postLogin,
  signout,
  getUsersForOrganization,
  inviteUserToOrganization,
};
