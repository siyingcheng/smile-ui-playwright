import { test, expect } from "@playwright/test";

test("Logon page can be opened", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByRole("link", { name: "Create an account" }).click();

  await page.getByRole("button", { name: "Register" }).isDisabled();
});
