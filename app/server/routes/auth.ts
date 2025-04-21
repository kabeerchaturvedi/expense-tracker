import { Hono } from "hono";
import { kindeClient, sessionManager } from "../kinde";

export const authRoute = new Hono()

  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    console.log(loginUrl, "loginURL");
    return c.redirect(loginUrl.toString());
  })

  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", async (c) => {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);
    console.log(isAuthenticated, "isAuthenticated");
    // Boolean: true or false
    if (isAuthenticated) {
      const user = await kindeClient.getUser(manager); // User object
      return c.json({ user });
    } else {
      // Need to implement, ree.g: redirect user to sign in, etc..
      return c.json({ error: "Not authenticated" }, 401);
    }
  });
