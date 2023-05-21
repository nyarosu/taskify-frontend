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
export { postLogin, signout };
