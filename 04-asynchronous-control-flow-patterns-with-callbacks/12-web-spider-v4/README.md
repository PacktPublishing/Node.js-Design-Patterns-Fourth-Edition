# 12-web-spider-v4

Web spider example to demonstrate limited parallel concurrency using queues

## Run

Install the necessary dependencies with `npm install` and then run:

```bash
node spider-cli.js https://loige.co 3 5
                      # maxDepth ⎯⎯⎯┘ │
                   # concurrency ⎯⎯⎯⎯⎯┘
```
