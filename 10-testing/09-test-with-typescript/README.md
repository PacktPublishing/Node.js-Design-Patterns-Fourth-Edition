# 09-test-with-typescript

This sample showcases how to test using TypeScript.

## Dependencies

This example requires you to install some third-party dependencies from npm.

If you have `pnpm` installed, you can do that with:

```bash
pnpm install
```

Alternatively, if you prefer to use another package manager, make sure to delete
the `pnpm-lock.yaml` file before using it.

If you want to use `npm`, you can run:

```bash
npm install
```

If you want to use `yarn`, you can run:

```bash
yarn install
```

## Run

> [!IMPORTANT]\
> This example uses TypeScript so make sure to have at least Node.js 23
> installed.

To get a simple test coverage report, run:

```bash
node --test --experimental-test-coverage --test-coverage-exclude='**/*.test.ts' '**/*.test.ts'
```

To generate test coverage information in the `lcov` format, run:

```bash
node --test --experimental-test-coverage --test-coverage-exclude='**/*.test.ts' --test-reporter=lcov --test-reporter-destination=lcov.info '**/*.test.ts'
```

To convert the `lcov` report to HTML (using `@lcov-viewer/cli`), run:

```bash
npx lcov-viewer lcov lcov.info
```

The generated report will be in `lcov-viewer/index.html`.

---

To generate a richer HTML report (using `c8`), run:

```bash
NODE_V8_COVERAGE=./coverage npx c8 -r html node --test --experimental-test-coverage --test-coverage-exclude='**/*.test.ts' '**/*.test.ts'
```

The generated file will be in `coverage/index.html`.
