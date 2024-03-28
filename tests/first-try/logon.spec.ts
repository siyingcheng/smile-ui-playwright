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

  test("Register user successfully", async ({ page }) => {
    await expect(registerButton).toBeDisabled();

    await page.getByPlaceholder("Username").fill("test20240328");

    // this step will be failed
    await page.getByPlaceholder("Email").fill("test20240328@gmail.com");
  });
});
