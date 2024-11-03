# Testing React Apps

![React](https://img.shields.io/badge/React-^18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-^5.2.2-yellow)
![Vitest](https://img.shields.io/badge/Vitest-^2.0.5-purple)
![Playwright](https://img.shields.io/badge/Playwright-^1.48.2-green)

This is the starter project for Reacting testing From Mosh Hamedani. You can find more information about this at: https://codewithmosh.com 

## About this Project 

This is a React app built with the following technologies and libraries: 

- Auth0 
- Tailwind 
- RadixUI
- React Router 
- React Query  
- Redux Toolkit 

Please follow these instructions carefully to setup this project on your machine. 

## Setting up Auth0 for Authentication

1. **Sign up for an Auth0 Account:**

   If you don't already have an Auth0 account, you can sign up for one at [https://auth0.com/](https://auth0.com/). Auth0 offers a free tier that you can use for your project.

2. **Create a New Application:**

- Log in to your Auth0 account.
- Go to the Auth0 Dashboard.
- Click on "Applications" in the left sidebar.
- Click the "Create Application" button.
- Give your application a name (e.g., "My React App").
- Select "Single Page Web Applications" as the application type.

1. **Configure Application Settings:**

- On the application settings page, configure the following settings:
  - Allowed Callback URLs: `http://localhost:5173` 
  - Allowed Logout URLs: `http://localhost:5173` 
  - Allowed Web Origins: `http://localhost:5173`
- Save the changes.

1. **Obtain Auth0 Domain and ClientID:**

- On the application settings page, you will find your Auth0 Domain and Client ID near the top of the page.
- Copy the Auth0 Domain (e.g., `your-auth0-domain.auth0.com`) and Client ID (e.g., `your-client-id`).

1. **Create a `.env.local` File:**

- In the root directory of the project, you'll find a sample `.env` file. Make a copy and save it as `.env.local`.
- Replace the Auth0 Domain and Client ID with the actual values you obtained from Auth0.


## Running the App

Now that you have set up Auth0 and configured your environment variables, you can run the React app using the following commands:

```
# Install dependencies
npm install

# Start the development server
npm start
```

This will start the back-end process at `http://localhost:3000`. If port 3000 is in use on your machine, update the port number in the following files and run `npm start` again: 

- json-server.json
- src/main.tsx

The front-end will be accessible at `http://localhost:5173`. Feel free to modify any part to better fit your project's style!

## Testing with Vitest

This project utilizes Vitest to conduct unit and component testing for Vue applications.

### Why Vitest?

Vitest is a blazing fast unit test framework powered by Vite. It's designed to be easy to use with Vue.js components and applications. Some key features include:

- Fast execution and hot module replacement (HMR) support
- Vue Test Utils integration for component testing
- Jest-compatible API
- Built-in code coverage
- ESM, TypeScript and JSX support out of the box

### Running Tests

To run the Vitest tests, use the following command:

```bash
vitest
```

### Run tests in a specific file

```bash
vitest path/to/your/test/file.test.js
```

## Testing with Playwright

This project leverages Playwright to perform end-to-end testing, enabling us to write and execute tests across all modern web browsers.

### Running Tests

To run the Playwright tests, use the following command:

```bash
npx playwright test
```

This will run all tests in headless mode by default.

### Running Tests in UI Mode

For a better developer experience with time travel debugging and watch mode, you can run tests in UI mode:

```bash
npx playwright test --ui
```

### Running Specific Tests

To run a single test file:

```bash
npx playwright test tests/example.spec.ts
```

To run tests with a specific title:

```bash
npx playwright test -g "test title"
```

### Viewing Test Reports

After running tests, you can view the HTML report:

```bash
npx playwright show-report
```

### Debugging Tests

To debug tests, you can run them in headed mode:

```bash
npx playwright test --headed
```

Or use the debug mode with Playwright Inspector:

```bash
npx playwright test --debug
```

For more information on using Playwright, refer to the [official Playwright documentation](https://playwright.dev/docs/intro).
