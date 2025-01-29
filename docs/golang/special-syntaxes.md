---
next: false
---

# Special Syntaxes

## Package

- Codes are grouped into packages, and packages are grouped into modules.
- Codes executed as an application must be running in package `main`.
- Package name is the same as the last element of the import path.
> ex. The `math/rand` package comprises files that begin with the statement `package rand`.
- **Factored `import` statement** groups imported packages into parentheses.
```go
import (
  "math/rand"
  ...
)
```
- A name in a package is exported if it begins with a capital letter.
- Every declaration in package scope should begin with a keyword.

## Type, Variable and Constant

- Basic types
```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32, represents a Unicode code point

float32 float64

complex64 complex128
```
- `T(e)` converts the expression `e` to the type `T`.
  - Assignment of different type requires an explicit conversion.
- The type comes after the variable name, [why](https://go.dev/blog/declaration-syntax)?
- A `var` statement can be in package scope.
```go
package main

var i int
```
- **Factored `var` statement** groups variable declarations into parentheses.
```go
var (
  i int
  ...
)
```
- Uninitialized variable is **zero-valued**.
  - `0` for numeric types
  - `false` for boolean
  - `""` for string
- Variable can be initialized by an expression computed at run time.
```go
var home = os.Getenv("HOME")
```
- Use `:=` shorthand to declare and initialize a variable, only available in function scope.
- Assignment of constant can only be **constant expression** computed at compile time.
  - string
  - character(`rune`)
  - numeric
  - boolean
  - mathematical operation(ex. `1 << 1`)

## Operator

- `++`, `--` are statements not expressions.

## For, If and Switch

- There is only `for` looping keyword.
  - As `while`.
  ```go
  for condition {
    ...
  }
  ```
  - Infinite loop without init, condition and post expression.
  ```go
  // same as `for true`
  for {
    ...
  }
  ```
- `if` and `switch` accept an optional initialization statement before condition expression like `for`.
```go
if i := 1; condition {
  ...
}
```
- `case` in `switch` can be an expression, and last `break` statement is unnecessary.
- `if`-`else if`-`else` by `switch` without condition expression.
```go
// same as `switch true`
switch {
  case true:
    ...
}
```

## Function

- If consecutive parameters share a type, their type can be omitted from all but the last.
```go
func add(x, y int) int {
  return x + y
}
```
- **Named return values**, or named result parameters
  - Document the meaning of the return values.
  - **Naked `return` statement** without arguments returns the named return values.
    - Should only be used in short functions to avoid harming readability.

## Defer
- `defer` statements are executed in stacked LIFO order until their surrounding function finished.
- Arguments to `defer` statement are evaluated immediately.
- More about [`defer`, `panic`, and `recover`](https://go.dev/blog/defer-panic-and-recover).