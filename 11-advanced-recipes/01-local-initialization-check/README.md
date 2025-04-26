# 01-local-initialization-check

This sample showcases some simple solutions to the problem of asynchronously
initialized modules.

## Run

There are 4 different examples in this folder.

### 1. Wrong initialization (not calling `.connect()`)

Execute it with:

```
node wrong-init-no-connect.js
```

### 2. Wrong initialization (calling `.connect()` but not waiting for it)

Execute it with:

```
node wrong-init-no-await.js
```

### 3. Correct initialization (using a local initialization check)

Execute it with:

```
node localInitializationCheck.js
```

### 4. Correct initialization (using the delayed startup pattern)

Execute it with:

```
node delayedStartup.js
```
