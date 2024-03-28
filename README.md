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

### Recoding a Trace

By default the [playwright.config](https://playwright.dev/docs/test-configuration#record-test-trace) file will contain the configuration needed to create a trace.zip file for each test. Traces are setup to run `on-first-retry` meaning they will be run on the first retry of a failed test. Also `retries` are set to 2 when running on CI and 0 locally. This means the traces will be recorded on the first retry of a failed test but not on the first run and not on the second retry.

Traces are normally run in a Continuous Integration(CI) environment, because locally you can use UI Mode for developing and debugging tests. However, if you want to run traces locally without using UI Mode, you can force tracing to be on with `--trace on`.

```shell
npx playwright test --trace on
```

### Test configuration

#### Basic configuration

```javascript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // configuration options
});
```

`testDir: 'tests',` Look for test files in the "tests" directory, relative to this configuration file.

`fullyParallel: true,` Run all tests in parallel.

`retries: process.env.CI ? 2 : 0,` Retry failed tests 2 times on CI and 0 times locally.

`workers: process.env.CI ? 1 : undefined,` Use 1 worker on CI and use default number of workers locally.

`reporter: 'html',` Reporter to use html.

`use: {},` Test use options, details later.

`projects: [],` Configure projects for major browsers.

`webServer: {},` Run local dev server before starting the tests.

#### Filtering Tests

Filter tests by glob patterns or regular expressions.

```javascript
export default defineConfig({
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: "*test-assets",

  // Glob patterns or regular expressions that match test files.
  testMatch: "*todo-tests/*.spec.ts",
});
```

#### Advanced Configuration

```javascript
export default defineConfig({
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: "test-results",

  // path to the global setup files.
  globalSetup: require.resolve("./global-setup"),

  // path to the global teardown files.
  globalTeardown: require.resolve("./global-teardown"),

  // Each test is given 30 seconds.
  timeout: 30000,
});
```

#### Expect Options

```javascript
export default defineConfig({
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },
});
```

### Test use options

#### Basic Options

```javascript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://127.0.0.1:3000",

    // Populates context with given storage state.
    storageState: "state.json",
  },
});
```

#### Emulation Options

```javascript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: "dark",

    // Context geolocation.
    geolocation: { longitude: 12.492507, latitude: 41.889938 },

    // Emulates the user locale.
    locale: "en-GB",

    // Grants specified permissions to the browser context.
    permissions: ["geolocation"],

    // Emulates the user timezone.
    timezoneId: "Europe/Paris",

    // Viewport used for all pages in the context.
    viewport: { width: 1280, height: 720 },
  },
});
```

#### Network Options

```javascript
export default defineConfig({
  use: {
    // Whether to automatically download all the attachments.
    acceptDownloads: false,

    // An object containing additional HTTP headers to be sent with every request.
    extraHTTPHeaders: {
      "X-My-Header": "value",
    },

    // Credentials for HTTP authentication.
    httpCredentials: {
      username: "user",
      password: "pass",
    },

    // Whether to ignore HTTPS errors during navigation.
    ignoreHTTPSErrors: true,

    // Whether to emulate network being offline.
    offline: true,

    // Proxy settings used for all pages in the test.
    proxy: {
      server: "http://myproxy.com:3128",
      bypass: "localhost",
    },
  },
});
```

#### Recording Options

```javascript
export default defineConfig({
  use: {
    // Capture screenshot after each test failure.
    // Options: 'off', 'on' and 'only-on-failure'
    screenshot: "only-on-failure",

    // Record trace only when retrying a test for the first time.
    // Options: 'off', 'on', 'retain-on-failure' and 'on-first-retry'
    trace: "on-first-retry",

    // Record video only when retrying a test for the first time.
    // Options: 'off', 'on', 'retain-on-failure' and 'on-first-retry'
    video: "on-first-retry",
  },
});
```

#### Other Options

```javascript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    actionTimeout: 0,

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: "chromium",

    // Toggles bypassing Content-Security-Policy.
    bypassCSP: true,

    // Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
    channel: "chrome",

    // Run browser in headless mode.
    headless: false,

    // Change the default data-testid attribute.
    testIdAttribute: "pw-test-id",
  },
});
```

#### Configuration Scopes

You can configure Playwright globally, per project, or per test. For example, you can set the locale to be used globally by adding `locale` to the use option of the Playwright config, and then override it for a specific project using the `project` option in the config. You can also override it for a specific test by adding `test.use({})` in the test file and passing in the options.

```javascript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    locale: "en-GB",
  },
});
```

You can override options for a specific `project` using the project option in the Playwright config.

```javascript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        locale: "de-DE",
      },
    },
  ],
});
```

You can override options for a specific test file by using the `test.use()` method and passing in the options. For example to run tests with the French locale for a specific test:

```javascript
import { test, expect } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("example", async ({ page }) => {
  // ...
});
```

The same works inside a describe block. For example to run tests in a describe block with the French locale:

```javascript
import { test, expect } from "@playwright/test";

test.describe("french language block", () => {
  test.use({ locale: "fr-FR" });

  test("example", async ({ page }) => {
    // ...
  });
});
```

### Annotations

Playwright supports tags and annotations that are displayed in the test report.

You can add your own tags and annotations at any moment, but Playwright comes with a few built-in ones:

- `test.skip()` marks the test as irrelevant. Playwright does not run such a test. Use this annotation when the test is not applicable in some configuration.

- `test.fail()` marks the test as failing. Playwright will run this test and ensure it does indeed fail. If the test does not fail, Playwright will complain.

- `test.fixme()` marks the test as failing. Playwright will not run this test, as opposed to the fail annotation. Use fixme when running the test is slow or crashes.

- `test.slow()` marks the test as slow and triples the test timeout.

#### Focus a test

You can focus some tests. When there are focused tests, only these tests run.

```javascript
test.only("focus this test", async ({ page }) => {
  // Run only focused tests in the entire project.
});
```

#### Skip a test

Mark a test as skipped.

```javascript
test.skip("skip this test", async ({ page }) => {
  // This test is not run
});
```

#### Conditionally skip a test

You can skip certain test based on the condition.

```javascript
test("skip this test", async ({ page, browserName }) => {
  test.skip(browserName === "firefox", "Still working on it");
});
```

#### Group tests

You can group tests to give them a logical name or to scope before/after hooks to the group.

```javascript
import { test, expect } from "@playwright/test";

test.describe("two tests", () => {
  test("one", async ({ page }) => {
    // ...
  });

  test("two", async ({ page }) => {
    // ...
  });
});
```

#### Tag tests

Sometimes you want to tag your tests as `@fast` or `@slow`, and then filter by tag in the test report. Or you might want to only run tests that have a certain tag.

To tag a test, either provide an additional details object when declaring a test, or add `@`-token to the test title. Note that tags must start with `@` symbol.

```javascript
import { test, expect } from "@playwright/test";

test(
  "test login page",
  {
    tag: "@fast",
  },
  async ({ page }) => {
    // ...
  }
);

test("test full report @slow", async ({ page }) => {
  // ...
});

// You can also tag all tests in a group or provide multiple tags:
test(
  "test full report",
  {
    tag: ["@slow", "@vrt"],
  },
  async ({ page }) => {
    // ...
  }
);
```

You can now run tests that have a particular tag with `--grep` command line option.

```shell
npx playwright test --grep @fast
```

Or if you want the opposite, you can skip the tests with a certain tag:

```shell
npx playwright test --grep-invert @fast
```

To run tests containing either tag (logical OR operator):

```shell
npx playwright test --grep "@fast|@slow"
```

Or run tests containing both tags (logical AND operator) using regex lookaheads:

```shell
npx playwright test --grep "(?=.*@fast)(?=.*@slow)"
```

#### Annotate tests

If you would like to annotate your tests with something more substantial than a tag, you can do that when declaring a test. Annotations have a `type` and a `description` for more context, and will be visible in the test report.

```javascript
import { test, expect } from "@playwright/test";

test(
  "test login page",
  {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }) => {
    // ...
  }
);
```

You can also annotate all tests in a group or provide multiple annotations:

```javascript
import { test, expect } from "@playwright/test";

test.describe(
  "report tests",
  {
    annotation: { type: "category", description: "report" },
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        annotation: [
          {
            type: "issue",
            description: "https://github.com/microsoft/playwright/issues/23180",
          },
          { type: "performance", description: "very slow test!" },
        ],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);
```

#### Conditionally skip a group of tests

For example, you can run a group of tests just in Chromium by passing a callback.

```javascript
test.describe("chromium only", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "Chromium only!");

  test.beforeAll(async () => {
    // This hook is only run in Chromium.
  });

  test("test 1", async ({ page }) => {
    // This test is only run in Chromium.
  });

  test("test 2", async ({ page }) => {
    // This test is only run in Chromium.
  });
});
```

#### Use fixme in beforeEach hook

To avoid running `beforeEach` hooks, you can put annotations in the hook itself.

```javascript
test.beforeEach(async ({ page, isMobile }) => {
  test.fixme(isMobile, "Settings page does not work in mobile yet");

  await page.goto("http://localhost:3000/settings");
});

test("user profile", async ({ page }) => {
  await page.getByText("My Profile").click();
  // ...
});
```

#### Runtime annotations

While the test is already running, you can add annotations to [test.info().annotations](https://playwright.dev/docs/api/class-testinfo#test-info-annotations).

```javascript
test("example test", async ({ page, browser }) => {
  test.info().annotations.push({
    type: "browser version",
    description: browser.version(),
  });

  // ...
});
```

### Actions

Playwright can interact with HTML Input elements such as text inputs, checkboxes, radio buttons, select options, mouse clicks, type characters, keys and shortcuts as well as upload files and focus elements.

#### Test input

Using `locator.fill()` is the easiest way to fill out the form fields. It focuses the element and triggers an input event with the entered text. It works for `<input>`, `<textarea>` and `[contenteditable]` elements.

```javascript
// Text input
await page.getByRole("textbox").fill("Peter");

// Date input
await page.getByLabel("Birth date").fill("2020-02-02");

// Time input
await page.getByLabel("Appointment time").fill("13:15");

// Local datetime input
await page.getByLabel("Local time").fill("2020-03-02T05:15");
```

#### Checkboxes and radio buttons

Using `locator.setChecked()` is the easiest way to check and uncheck a checkbox or a radio button. This method can be used with `input[type=checkbox]`, `input[type=radio]` and `[role=checkbox]` elements.

```javascript
// Check the checkbox
await page.getByLabel("I agree to the terms above").check();

// Assert the checked state
expect(page.getByLabel("Subscribe to newsletter")).toBeChecked();

// Select the radio button
await page.getByLabel("XL").check();
```

#### Select options

Selects one or multiple options in the `<select>` element with `locator.selectOption()`. You can specify option value, or `label` to select. Multiple options can be selected.

```java
// Single selection matching the value or label
await page.getByLabel('Choose a color').selectOption('blue');

// Single selection matching the label
await page.getByLabel('Choose a color').selectOption({ label: 'Blue' });

// Multiple selected items
await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);
```

#### Mouse click

Performs a simple human click.

```javascript
// Generic click
await page.getByRole("button").click();

// Double click
await page.getByText("Item").dblclick();

// Right click
await page.getByText("Item").click({ button: "right" });

// Shift + click
await page.getByText("Item").click({ modifiers: ["Shift"] });

// Hover over element
await page.getByText("Item").hover();

// Click the top left corner
await page.getByText("Item").click({ position: { x: 0, y: 0 } });
```

Under the hood, this and other pointer-related methods:

- wait for element with given selector to be in DOM
- wait for it to become displayed, i.e. not empty, no `display:none`, no `visibility:hidden`
- wait for it to stop moving, for example, until css transition finishes
- scroll the element into view
- wait for it to receive pointer events at the action point, for example, waits until element becomes non-obscured by other elements
- retry if the element is detached during any of the above checks

**Forcing the click:** Sometimes, apps use non-trivial logic where hovering the element overlays it with another element that intercepts the click. This behavior is indistinguishable from a bug where element gets covered and the click is dispatched elsewhere. If you know this is taking place, you can bypass the actionability checks and force the click:

```javascript
await page.getByRole("button").click({ force: true });
```

**Programmatic click:** If you are not interested in testing your app under the real conditions and want to simulate the click by any means possible, you can trigger the [HTMLElement.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click) behavior via simply dispatching a click event on the element with locator.dispatchEvent():

```javascript
await page.getByRole("button").dispatchEvent("click");
```

#### Type characters

Type into the field character by character, as if it was a user with a real keyboard with `locator.pressSequentially()`.

```javascript
// Press keys one by one
await page.locator("#area").pressSequentially("Hello World!");
```

This method will emit all the necessary keyboard events, with all the `keydown`, `keyup`, `keypress` events in place. You can even specify the optional `delay` between the key presses to simulate real user behavior.

#### Keys and shortcuts

```javascript
// Hit Enter
await page.getByText("Submit").press("Enter");

// Dispatch Control+Right
await page.getByRole("textbox").press("Control+ArrowRight");

// Press $ sign on keyboard
await page.getByRole("textbox").press("$");
```

The `locator.press()` method focuses the selected element and produces a single keystroke. It accepts the logical key names that are emitted in the `keyboardEvent.key` property of the keyboard events:

```
Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight,
ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.
```

Examples:

```javascript
// <input id=name>
await page.locator("#name").press("Shift+A");

// <input id=name>
await page.locator("#name").press("Shift+ArrowLeft");
```

#### Upload files

You can select input files for upload using the `locator.setInputFiles()` method. It expects first argument to point to an `input element` with the type `"file"`. Multiple files can be passed in the array. If some of the file paths are relative, they are resolved relative to the current working directory. Empty array clears the selected files.

```javascript
// Select one file
await page
  .getByLabel("Upload file")
  .setInputFiles(path.join(__dirname, "myfile.pdf"));

// Select multiple files
await page
  .getByLabel("Upload files")
  .setInputFiles([
    path.join(__dirname, "file1.txt"),
    path.join(__dirname, "file2.txt"),
  ]);

// Remove all the selected files
await page.getByLabel("Upload file").setInputFiles([]);

// Upload buffer from memory
await page.getByLabel("Upload file").setInputFiles({
  name: "file.txt",
  mimeType: "text/plain",
  buffer: Buffer.from("this is test"),
});
```

If you don't have input element in hand (it is created dynamically), you can handle the `page.on('filechooser')` event or use a corresponding waiting method upon your action:

```javascript
// Start waiting for file chooser before clicking. Note no await.
const fileChooserPromise = page.waitForEvent("filechooser");
await page.getByLabel("Upload file").click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, "myfile.pdf"));
```

#### Focus element

For the dynamic pages that handle focus events, you can focus the given element with `locator.focus()`.

```javascript
await page.getByLabel("Password").focus();
```

#### Drag and Drop

You can perform drag&drop operation with `locator.dragTo()`. This method will:

- Hover the element that will be dragged.
- Press left mouse button.
- Move mouse to the element that will receive the drop.
- Release left mouse button.

```javascript
await page
  .locator("#item-to-be-dragged")
  .dragTo(page.locator("#item-to-drop-at"));
```

#### Dragging manually

If you want precise control over the drag operation, use lower-level methods like `locator.hover()`, `mouse.down()`, `mouse.move()` and `mouse.up()`.

```javascript
await page.locator("#item-to-be-dragged").hover();
await page.mouse.down();
await page.locator("#item-to-drop-at").hover();
await page.mouse.up();
```
