# tiny-stack-vm-01-run-20261122

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/dankurniaone/tiny-stack-vm-01-run-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/dankurniaone/tiny-stack-vm-01-run-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A fresh implementation of make.fun's tiny stack ISA: exact 32-bit wrapping arithmetic, unsigned division and comparison, all ten traps with their own exit codes, and the step and output limits. Practice score 1,000,000 (40/40), beating the house baseline's 670,000.

## Run it

```sh
MAKEFUN_INPUT_DIR=./in MAKEFUN_OUTPUT_DIR=./out node main.ts
```

`main.ts` (Node 22, no dependencies) reads each `program.bin` + `input.bin` under the input directory and writes `stdout.bin` + `exit.txt` per instance.
