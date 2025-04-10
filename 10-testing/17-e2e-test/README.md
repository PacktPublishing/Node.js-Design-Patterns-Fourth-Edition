# 17-e2e-test

This sample demonstrates how to create end-to-end (e2e) tests for a web
application using Playwright.

## Dependencies

This example requires you to install some third-party dependencies from npm.

If you have `pnpm` installed, you can do that with:

```bash
pnpm install
```

Additionally, you need to install the required browsers for Playwright. You can
do this by running:

```bash
pnpm exec playwright install
```

Alternatively, if you prefer to use another package manager, make sure to delete
the `pnpm-lock.yaml` file before using it.

If you want to use `npm`, you can run:

```bash
npm install
npx playwright install
```

If you want to use `yarn`, you can run:

```bash
yarn install
yarn playwright install
```

## Run

> [!IMPORTANT]\
> This example uses TypeScript and Playwright, so make sure to have at least
> Node.js 22 installed.

NOTE: this test is designed to run against a local instance of the
[test application EventHub](https://github.com/lmammino/sample-events-website).

To run the test, you need to start the application first. You can do this in
several ways:

- Clone the repo and run the app locally (check detailed instructions on the
  project repository)
- Use Docker to run the app locally
  (`docker run -p 3000:3000 ghcr.io/lmammino/sample-events-website:main`)
- Use `testcontainers` (uncomment the commented code in `e2e/example.spec.ts`)

````bash
To run the Playwright tests, execute:

```bash
pnpm exec playwright test
````

This will execute all the tests defined in the `e2e` folder and generate a
report.

You can also run the tests in headed mode (with a visible browser) by using the
`--headed` flag:

```bash
pnpm exec playwright test --headed
```

Or you can run the Playwright UI with the `--ui` flag:

```bash
pnpm exec playwright test --ui
```
