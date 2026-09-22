# Playwright E-Commerce Automation Framework

A Playwright + TypeScript test automation framework for an e-commerce application, covering UI automation, API testing, authentication, data-driven testing, network interception/mocking, cross-browser execution, and CI/CD with GitHub Actions.

The project was built with a focus on maintainability, reusable test components, reliable synchronization, failure diagnostics, and interview-defensible automation practices.

---

## Tech Stack

* **Playwright** – UI and API automation
* **TypeScript** – Type safety and maintainable test data/models
* **Node.js** – Runtime and dependency management
* **Git / GitHub** – Version control and collaboration
* **GitHub Actions** – CI/CD
* **Chromium & Firefox** – Cross-browser execution

---

## Framework Architecture

The framework follows a layered approach using the **Page Object Model (POM)** along with reusable components and custom Playwright fixtures.

```text
tests/
├── api/
├── authenticated/
├── unauthenticated/
└── setup/

pages/
components/
fixtures/
data/
api/

.github/
└── workflows/
```

### Architecture Responsibilities

**Pages**

Contains page object classes representing application pages.

Examples:

* `LoginSignupPage`
* `ProductPage`
* `CartPage`

Page objects contain locators and reusable page-level actions.

**Components**

Contains reusable UI components that can appear across multiple pages.

Examples:

* `Header`
* `CartModal`

**Fixtures**

Custom Playwright fixtures provide page objects and reusable components directly to tests.

This avoids repeatedly creating objects such as `new ProductPage(page)` inside individual tests.

**Data**

Contains typed test data for UI and API scenarios.

Examples:

* Login data
* Negative login cases
* Product data
* Product search cases
* API request payloads

**API**

Contains reusable API service classes built using Playwright's `APIRequestContext`.

**Tests**

Tests are organized by purpose:

* `api` – API automation
* `authenticated` – tests requiring an authenticated browser session
* `unauthenticated` – login and unauthenticated flows
* `setup` – authentication setup and storage-state creation

---

## UI Test Coverage

The framework currently covers:

### Authentication

* Valid login
* Invalid password
* Malformed email
* Login error validation
* Browser-side email validation

### Product

* Product search
* Positive product search scenarios
* Negative product search scenario
* Add product to cart

### Cart

* Cart cleanup
* Product presence
* Product price
* Product quantity
* Product total

---

## API Test Coverage

API automation is implemented using Playwright's `APIRequestContext`.

The API service layer currently covers:

* GET users
* POST users
* PUT users
* PATCH users
* DELETE users
* Login verification through the application API

API tests validate:

* HTTP status codes
* Response fields
* Response values
* Runtime field types
* Created resource IDs
* Business-level response values

API request data is maintained separately from the test implementation using typed TypeScript models.

---

## Authentication Strategy

Authenticated UI tests use Playwright's `storageState` mechanism.

The authentication flow is:

```text
Setup Project
     |
     | Login
     v
Validate Authentication
     |
     | Save browser storage state
     v
playwright/.auth/authstate.json
     |
     +----------------------+
     |                      |
     v                      v
Chromium Authenticated   Firefox Authenticated
```

The authentication setup is executed through a Playwright project dependency.

Authenticated tests reuse the saved session instead of performing the login flow before every test.

The generated authentication state is excluded from Git using `.gitignore`.

---

## Playwright Projects

The framework uses separate Playwright projects for different execution requirements.

| Project                  | Purpose                             |
| ------------------------ | ----------------------------------- |
| `setup`                  | Creates authenticated storage state |
| `chromium-login`         | Unauthenticated tests on Chromium   |
| `firefox-login`          | Unauthenticated tests on Firefox    |
| `chromium-authenticated` | Authenticated tests on Chromium     |
| `firefox-authenticated`  | Authenticated tests on Firefox      |
| `api`                    | API automation                      |

Authenticated browser projects depend on the `setup` project.

The API project uses its own API `baseURL`.

---

## Data-Driven Testing

Test data is separated from test implementation to allow multiple scenarios to execute through the same test logic.

Examples include:

* Login negative cases
* Product search cases
* API POST payloads

TypeScript interfaces are used to provide structure and type safety for the test data.

For example, PATCH payloads use `Partial<CreateUserPayload>` because PATCH requests may contain only the fields being changed.

---

## Network Testing

Playwright network capabilities are used to validate and simulate network behavior.

The framework demonstrates:

### Response observation

`page.waitForResponse()` is used to wait for and validate an application network response.

### Request failure simulation

`page.route()` with `route.abort()` is used to simulate a failed network request.

### Response mocking

`route.fulfill()` is used to provide a controlled mocked response, including a simulated `404` response.

### Failure detection

`requestfailed` is used to verify that an intercepted request actually failed.

---

## Synchronization and Flaky Test Handling

The framework relies primarily on Playwright's built-in auto-waiting and web-first assertions.

Examples include:

* Locator-based actions
* `expect(...).toBeVisible()`
* `expect(...).toHaveText()`
* `expect(...).toHaveCount()`
* `page.waitForResponse()`

`waitForTimeout()` was deliberately avoided as a synchronization strategy.

During development, intermittent navigation problems were observed in the public test environment. These were investigated using Playwright traces rather than being hidden with arbitrary waits or excessively large timeouts.

Where appropriate, navigation uses:

```text
waitUntil: 'domcontentloaded'
```

for pages that were usable before all external resources had completed loading.

---

## Failure Diagnostics

The Playwright configuration collects additional diagnostics for failures:

* **Trace:** retained on failure
* **Screenshot:** captured on failure
* **Video:** retained on failure

These artifacts can be used to investigate failures locally and in CI.

---

## CI/CD

GitHub Actions is used to execute the Playwright test suite on pull requests targeting `main`.

The workflow performs the following steps:

```text
Pull Request
     |
     v
Checkout repository
     |
     v
Setup Node.js 20
     |
     v
npm ci
     |
     v
Install Playwright browsers
     |
     v
Run Playwright tests
     |
     v
Upload Playwright HTML report
     |
     v
Upload failure artifacts when available
```

The CI workflow runs Chromium and Firefox browser projects through the Playwright configuration.

The current CI configuration uses one worker because the public test environment demonstrated intermittent navigation instability during framework development.

---

## CI Secrets

Test credentials are not committed to the repository.

The password is read through:

```text
USER_PASSWORD
```

For GitHub Actions, the credential is stored as a GitHub repository secret and exposed only to the test execution step that requires it.

For local execution, environment variables can be provided through a `.env` file.

The `.env` file is excluded from Git.

---

## Reporting

The framework uses Playwright's built-in HTML reporter.

After a CI execution, the Playwright HTML report is uploaded as a GitHub Actions artifact.

Failure diagnostics such as traces, screenshots, and videos are also retained when generated.

Allure is not currently used because the built-in Playwright reporting and diagnostics are sufficient for the current framework.

---

## Installation

Clone the repository and install dependencies:

```bash
npm ci
```

Install the required Playwright browsers:

```bash
npx playwright install
```

For Linux CI environments, the workflow installs the required browser dependencies using:

```bash
npx playwright install --with-deps chromium firefox
```

---

## Environment Setup

Create a local `.env` file in the project root:


USER_PASSWORD=your-test-password


The .env file must not be committed to Git.

The test username and other non-secret test data are maintained in the project's test-data files.

---

## Running Tests

Run the complete Playwright suite:

```bash
npx playwright test
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression tests:

```bash
npx playwright test --grep @regression
```

Run API tests:

```bash
npx playwright test tests/api
```

Run a specific test file:

```bash
npx playwright test tests/authenticated/productPage.spec.ts
```

Run tests in a specific project:

```bash
npx playwright test --project=chromium-authenticated
```

Open the latest HTML report:

```bash
npx playwright show-report
```

---

## Repository Hygiene

The following generated or sensitive content is excluded from Git:

```text
node_modules/
test-results/
playwright-report/
blob-report/
playwright/.cache/
playwright/.auth/
.env
```

Authentication state, test results, reports, and environment secrets are therefore not intended to be committed to the repository.

---

## Project Structure

```text
playwright-e-commerce-project/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── api/
│   └── UsersApi.ts
│
├── components/
│   ├── CartModal.ts
│   └── Header.ts
│
├── data/
│   ├── api/
│   │   └── users.ts
│   ├── loginNegativeCases.ts
│   ├── productSearchCases.ts
│   ├── products.ts
│   └── users.ts
│
├── fixtures/
│   └── base.fixture.ts
│
├── pages/
│   ├── CartPage.ts
│   ├── LoginSignupPage.ts
│   └── ProductPage.ts
│
├── tests/
│   ├── api/
│   │   └── users.spec.ts
│   ├── authenticated/
│   │   ├── cartPage.spec.ts
│   │   ├── network.spec.ts
│   │   └── productPage.spec.ts
│   ├── setup/
│   │   └── auth.setup.ts
│   └── unauthenticated/
│       └── loginSignupTest.spec.ts
│
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

## Key Design Decisions

### Why Page Object Model?

Page objects keep locators and reusable page interactions separate from test scenarios. This makes tests easier to read and reduces duplication when UI interactions change.

### Why custom fixtures?

Custom fixtures provide page objects and components directly to tests and centralize their creation.

### Why storageState?

Authentication state is created once during the setup project and reused by authenticated tests, avoiding repeated UI login operations.

### Why data-driven testing?

Separating test data from test logic allows multiple scenarios to execute through the same test implementation.

### Why web-first assertions?

Web-first assertions automatically wait for the expected condition and are more reliable than fixed delays.

### Why network interception?

Network interception allows the framework to observe real application traffic and simulate controlled failure or response scenarios.

### Why Playwright HTML reporting?

The built-in reporter provides sufficient test results and failure diagnostics for the current project without introducing an additional reporting dependency.

---

## Current CI Validation

The GitHub Actions workflow has been executed successfully after configuring the required repository secret.

The validated CI run executed:

```text
33 tests using 1 worker
33 passed
```

The Playwright HTML report was successfully uploaded as a workflow artifact.

---

## Project Objective

The objective of this project is to demonstrate practical SDET automation skills using Playwright and TypeScript, including:

* Maintainable UI automation
* Page Object Model
* Custom fixtures
* Reusable components
* Data-driven testing
* Browser authentication with storage state
* API automation using `APIRequestContext`
* Network interception and mocking
* Cross-browser testing
* Failure diagnostics
* GitHub Actions CI/CD
* Secure handling of test credentials
