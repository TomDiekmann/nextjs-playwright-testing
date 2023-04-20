# Test-Automation Demo

This repository is an example implementation of automated End to End testing using [Playwright](https://playwright.dev/). It is intended to be used as a reference for how to implement automated testing in a Next.JS, Prisma and NextAuth.js application.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.15.4 or higher)
- [Docker](https://www.docker.com/) (v20.10.2 or higher)

### Usage

1. Clone the repo
   ```sh
   git clone
   ```
2. Install local and browser dependencies
   ```sh
   npm install && npx playwright install
   ```
3. Run local test server

   ```sh
   docker-compose down && docker-compose build --no-cache && docker-compose up
   ```

   The server will be automatically configured in 5 Steps (see `./docker-compose.yml`):

   1. Initializion of a empty mysql database
   2. Preperation of the nextjs docker image (see `./Dockerfile`)
   3. Import of the database schema (configured in `./prisma/schema.prisma`)
   4. Import of the database seed data (configured in `./prisma/seed.ts`)
   5. Starting the server on port 3000

4. Run the tests

   ```sh
   npm run test:e2e
   ```

   or in order to have a visual representation of the tests you can use the playwright vscode extension.

   https://user-images.githubusercontent.com/25990007/233356809-d2f33e43-1635-47ce-be48-382889e23199.mp4

## Additional Information

### Playwright Tests

The tests are configured in `./e2e`. The tests are written in TypeScript and use the [Playwright Test Framework](https://playwright.dev/docs/test-intro). The tests are executed in a headless browser by default. If you want to see the tests in action you can use the [Playwright VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright). The extension will automatically detect the tests and allow you to run them in a browser of your choice.

### Github Actions

The repository is configured to run the tests on every push and pull request. You can see the configuration in `./.github/workflows/testing.yml`. The tests are executed in a docker container using the same image as the local test server. The tests are executed in a headless browser and the results are visible in Pull Requests or in the Actions tab.
