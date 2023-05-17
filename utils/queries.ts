import { API_URL } from "@/pages/_app";
import { NextRouter, Router } from "next/router";

async function checkAuthStatusOrRedirect(router: NextRouter) {
  const response = await fetch(`${API_URL}/me`, { credentials: "include" });
  if (!response.ok) {
    router.push("/login");
  }
}

export { checkAuthStatusOrRedirect };
