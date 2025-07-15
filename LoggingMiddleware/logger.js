import { AUTH_TOKEN } from "./constant.js";

export async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
    return await res.json();
  } catch (error) {}
}
