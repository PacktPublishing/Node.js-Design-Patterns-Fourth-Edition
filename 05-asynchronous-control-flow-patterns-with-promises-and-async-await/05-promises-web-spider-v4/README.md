# 05-promises-web-spider-v4

Web spider example to demonstrate limited parallel asynchronous execution with
Promises

## Run

Install the necessary dependencies with `npm install` and then run:

```bash
node spider-cli.js https://loige.co
```

You can optionally specify the maximum depth of crawling in the second parameter
and the maximum concurrency in the third:

```bash
node spider-cli.js https://loige.co 5 2
```
