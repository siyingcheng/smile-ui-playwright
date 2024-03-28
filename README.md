# smile-ui-playwright

## Installation

```shell
npm init playwright@latest
```

## Usage Examples

Inside that directory, you can run several commands:

```shell
#Runs the end-to-end tests.
npx playwright test

#Starts the interactive UI mode.
npx playwright test --ui

#Runs the tests only on Desktop Chrome.
npx playwright test --project=chromium

#Runs the tests in a specific file.
npx playwright test example

#Runs the tests in debug mode.
npx playwright test --debug

#Auto generate tests with Codegen.
npx playwright codegen
```

## HTML Test Reports

```shell
npx playwright show-report
```

## PlaywrightBasic Usages

### Navigation

```javascript
await page.goto("https://playwright.dev/");
```

### Interactions

**Basic actions:**

This is the list of the most popular Playwright actions. Note that there are many
more, so make sure to check the [Locator API](https://playwright.dev/docs/api/class-locator)
section to learn more about them.

| Action                    | Description                     |
| ------------------------- | ------------------------------- |
| `locator.check()`         | Check the input checkbox        |
| `locator.click()`         | Click the element               |
| `locator.uncheck()`       | Uncheck the input checkbox      |
| `locator.hover()`         | Hover mouse over the element    |
| `locator.fill()`          | Fill the form field, input text |
| `locator.focus()`         | Focus the element               |
| `locator.press()`         | Press single key                |
| `locator.setInputFiles()` | Pick files to upload            |
| `locator.selectOption()`  | Select option in the drop down  |

### Assertions

Playwright includes [test assertions](https://playwright.dev/docs/test-assertions)
in the form of expect function. To make an assertion, call `expect(value)` and
choose a matcher that reflects the expectation.

There are many generic matchers like `toEqual`, `toContain`, `toBeTruthy` that
can be used to assert any conditions.

```javascript
expect(success).toBeTruthy();
```

Playwright also includes async matchers that will wait until the expected condition
is met. Using these matchers allows making the tests non-flaky and resilient.

```javascript
await expect(page).toHaveTitle(/Playwright/);
```

Here is the list of the most popular async assertions. Note that there are [many more ](https://playwright.dev/docs/test-assertions) to get familiar with:

| Assertion                           | Description                       |
| ----------------------------------- | --------------------------------- |
| `expect(locator).toBeChecked()`     | Checkbox is checked               |
| `expect(locator).toBeEnabled()`     | Control is enabled                |
| `expect(locator).toBeVisible()`     | Element is visible                |
| `expect(locator).toContainText()`   | Element contains text             |
| `expect(locator).toHaveAttribute()` | Element has attribute             |
| `expect(locator).toHaveCount()`     | List of elements has given length |
| `expect(locator).toHaveText()`      | Element matches text              |
| `expect(locator).toHaveValue()`     | Input element has value           |
| `expect(page).toHaveTitle()`        | Page has title                    |
| `expect(page).toHaveURL()`          | Page has URL                      |

### Using Test Hooks

You can use various [test hooks](https://playwright.dev/docs/api/class-test) such as `test.describe` to declare a group of tests and `test.beforeEach` and `test.afterEach` which are executed before/after each test. Other hooks include the `test.beforeAll` and `test.afterAll` which are executed once per worker before/after all tests.

### Running and debugging tests

You can run your tests with the `playwright test` command. This will run your tests on all browsers as configured in the `playwright.config` file. Tests run in headless mode by default meaning no browser window will be opened while running the tests and results will be seen in the terminal.

```shell
npx playwright test
```

**Run tests in UI mode:** with the `--ui` flag, you can run your tests in an interactive UI mode. This will open a browser window and you can see the test results and debug the tests interactively.

```shell
npx playwright test --ui
```

**Run tests in headed mode:** with the `--headed` flag, you can run your tests in a headed browser window. This is useful for debugging tests and seeing the browser window.

```shell
npx playwright test --headed
```

**Run tests on different browsers:** with the `--project` flag, you can run your tests in a specific project. This is useful for debugging tests on specific projects.

```shell
npx playwright test --project webkit
# multiple browsers
npx playwright test --project webkit --project firefox
```

**Run specific tests:** To run a single test file, pass in the name of the test file that you want to run.

```shell
npx playwright test landing-page.spec.ts
```

To run a set of test files from different directories, pass in the names of the directories that you want to run the tests in.

```shell
npx playwright test tests/todo-page/ tests/landing-page/
# To run files that have landing or login in the file name, simply pass in these keywords to the CLI.
npx playwright test landing login
```

To run a test with a specific title, use the `-g` flag followed by the title of the test.

```shell
npx playwright test -g "add a todo item"
```

**Debug tests with the Playwright Inspector:** with the `--debug` flag, you can run your tests in debug mode. This will open the Playwright Inspector which allows you to debug your tests interactively.

To debug one test file, run the Playwright test command with the name of the test file that you want to debug followed by the `--debug` flag.

```shell
npx playwright test example.spec.ts --debug
```

To debug a specific test from the line number where the `test(..` is defined, add a colon followed by the line number at the end of the test file name, followed by the `--debug` flag.

```shell
npx playwright test example.spec.ts:10 --debug
```
