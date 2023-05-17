import { API_URL } from "@/pages/_app";
import { NextRouter, Router } from "next/router";
import { QueryFunctionContext } from "@tanstack/react-query";
interface Credentials {
  email: string;
  password: string;
}

async function checkAuthStatusOrRedirect(router: NextRouter) {
  const response = await fetch(`${API_URL}/me`, { credentials: "include" });
  if (!response.ok) {
    router.push("/login");
  }
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
export { postLogin, checkAuthStatusOrRedirect };
