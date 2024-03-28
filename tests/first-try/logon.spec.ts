import { test, expect, Locator } from "@playwright/test";

test.describe("Logon page", () => {
  let registerButton: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByRole("link", { name: "Create an account" }).click();

    registerButton = await page.getByRole("button", { name: "Register" });
    await registerButton.isVisible();
  });

  test("Logon page can be opened", async ({ page }) => {
    await expect(registerButton).toBeDisabled();
  });
});
