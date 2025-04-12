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
  // other packages
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
  // other variables
)
```
- Uninitialized variable is **zero-valued**.
  - `0` for numeric types
  - `false` for boolean
  - `""` for string
  - `nil` for pointer
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
- No pointer arithmetic.

## For, If and Switch

- There is only `for` looping keyword.
  - As `while`.
  ```go
  for condition {
    // statements
  }
  ```
  - Infinite loop without init, condition and post expression.
  ```go
  // same as `for true`
  for {
    // statements
  }
  ```
- `if` and `switch` accept an optional initialization statement before condition expression like `for`.
```go
if i := 1; condition {
  // statements
}
```
- No [ternary conditional operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator).
- `case` in `switch` can be an expression, and last `break` statement is unnecessary.
- `if`-`else if`-`else` by `switch` without condition expression.
```go
// same as `switch true`
switch {
  case condition:
    // `if` statements
  case condition:
    // `else-if` statements
  default:
    // `else` statements
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

## Struct

- `struct`: typed collection of fields.
```go
type struct_name struct {
  field_name field_type;
}
```

## Array, Slice and Map

### Array

- Uninitialized array: `[0]T`.
- `[n]T{}`: `n` zero-valued elements of type `T`.
- `[...]T{elements, n:element}`: length-inferred elements by `...` of type `T`, with the `n`th-assigned element.
- The fixed size of an array is part of its type.
> ex. The types `[10]int` and `[20]int` are distinct.
- **Passed-by-value**: assigning one array to another copies all the elements, passing into a function as well.

### Slice

- A pointer referred to an underlying array, see [Go Slices: usage and internals](https://go.dev/blog/slices-intro) and utility functions in [`slices`](https://pkg.go.dev/slices) package.
  - `len()`(**length**): amount of elements in a slice.
  - `cap()`(**capacity**): remaining amount of elements in underlying array, counting from the first element in the referred slice.
- Uninitialized slice: `nil`, empty slice: `[]T`.
```go
import "slices"

var ns []int
es := []int{}

ns == nil // true
es == nil // false
slices.Equal(ns, es) // true
```
- [`make(slice, n, capacity)`](https://pkg.go.dev/builtin#make): allocate an array with `n` zero-valued elements of type `T`, and return a slice with the capacity.
- [`append(slice, elements)`](https://pkg.go.dev/builtin#append): append elements to the end of a slice, reallocating to a new underlying array if its capacity insufficient.
- [`copy(to_slice, from_slice)`](https://pkg.go.dev/builtin#copy): copy slice and its underlying array up to minimum of `len(from)` and `len(to)`.
- [`clear(slice)`](https://pkg.go.dev/builtin#clear): reset all slice-referred elements zero-valued by their type in the underlying array.

### Map

- Utility functions in [`maps`](https://pkg.go.dev/maps) package.
- Uninitialized map: `nil`, empty map: `map[key_T]value_T`.
  - Cannot assign any key-value pair to an uninitialized map, use `make(map[key_T]value_T])` to allocate an empty map.
- Key of a map can be any type for which the equality operator is defined, so **slice** can't be used as map keys.
- If a key doesn't exist in a map, zero-valued `value_T` (and key exists or not, a.k.a. **comma ok**) is/are returned.
```go
m := make(map[string]int)
value, ok := m["key"] // `value`: 0, `ok`: false
_, ok = m["key"] // just `ok` by blank identifier in place of `value`
```
- [`delete(map, key)`](https://pkg.go.dev/builtin#delete): remove a key-value pair from a map.
- [`clear(map)`](https://pkg.go.dev/builtin#clear): remove all key-value pairs up to an empty map.