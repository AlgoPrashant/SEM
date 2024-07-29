import { Form, useActionData, redirect } from "@remix-run/react";
import { verifyLogin } from "~/models/user.server";
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "seb_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function action({ request }) {
  const formData = new URLSearchParams(await request.text());
  const username = formData.get("username");
  const password = formData.get("password");

  const user = await verifyLogin(username, password);
  if (!user) {
    return { error: "Invalid username or password" };
  }

  const session = await storage.getSession();
  session.set("userId", user.id);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData();
  return (
    <Form method="post">
      <label>
        Username: <input type="text" name="username" />
      </label>
      <label>
        Password: <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
      {actionData?.error && <p>{actionData.error}</p>}
    </Form>
  );
}
