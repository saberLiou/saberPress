---
next: false
---

# Special Syntaxes

## Package

- Codes are grouped into packages, and packages are grouped into modules.
  - **Module**: a collection of packages, defined by `go.mod` in its root directory.
  - **Package**: a directory of `.go` files declaring the same `package` name, sharing all their names without import.

```text
hello/                 // module `example.com/hello`
├── go.mod
├── main.go            // package `main`
└── greet/             // package `greet`, imported as `example.com/hello/greet`
    ├── greet.go
    └── name.go
```

```go
// go.mod
module example.com/hello

go 1.27
```

```go
// greet/greet.go
package greet

func Hello(name string) string {
  if name == "" {
    name = defaultName // declared in `name.go`, same package without import
  }
  return "Hello, " + name + "!"
}
```

```go
// greet/name.go
package greet

const defaultName = "Gopher"
```

```go
// main.go
package main

import (
  "fmt"

  "example.com/hello/greet" // module path + package directory
)

func main() {
  fmt.Println(greet.Hello(""))   // Hello, Gopher!
  fmt.Println(greet.Hello("Go")) // Hello, Go!
}
```

- Codes executed as an application must be running in package `main`.

> Like C, `main` is a plain function rather than a method in a class as in Java, and unlike PHP, Python or JavaScript, no statements run at the top level of a file.

```go
package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}
```

- Package name is the same as the last element of the import path.

> ex. The `math/rand` package comprises files that begin with the statement `package rand`.

```go
import "math/rand"

rand.Intn(10) // referred by `rand`, not `math/rand`
```

- **Factored `import` statement** groups imported packages into parentheses.

```go
import (
  "math/rand"
  // other packages
)
```

- Unused imports are compile errors.

> Unlike C, Java, PHP, Python, JavaScript or TypeScript, which only warn about it by compilers, IDEs or linters by default.

```go
import "os" // error: "os" imported and not used
```

- A name in a package is exported if it begins with a capital letter.

> Unlike `static` in C, `public`, `private` keywords in Java, PHP or TypeScript, `#` prefix in JavaScript, or `_` prefix convention in Python.

```go
import "math"

math.Pi // ok
math.pi // error: undefined: math.pi (but have Pi)
```

- Every declaration in package scope should begin with a keyword.

```go
package main

var x = 1 // ok
y := 2    // error: non-declaration statement outside function body
```

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

- No `char` type, use `rune` for a Unicode character, and `string` is an immutable sequence of UTF-8 bytes.

```go
s := "Go語言"
len(s)         // 8, bytes rather than characters
len([]rune(s)) // 4
s[0] = 'g'     // error: cannot assign to s[0] (neither addressable nor a map index expression)
```

- `T(e)` converts the expression `e` to the type `T`.
  - Assignment of different type requires an explicit conversion.

> Unlike C, Java, PHP, Python or JavaScript, no implicit conversion even from `int` to `float64`.

```go
i := 42
f := float64(i)
u := uint(f)

var g float64 = i // error: cannot use i (variable of type int) as float64 value in variable declaration
```

- The type comes after the variable name, [why](https://go.dev/blog/declaration-syntax)?

> Unlike C or Java (`int x`), but similar to TypeScript (`x: number`) and Python type hints (`x: int`).

```go
var x int
var p *int
func add(x int, y int) int
```

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

> Unlike garbage values in C, `undefined` in JavaScript or TypeScript, `null` in PHP, or compile errors of uninitialized local variables in Java.

```go
var i int    // 0
var b bool   // false
var s string // ""
var p *int   // nil
```

- Variable can be initialized by an expression computed at run time.

```go
var home = os.Getenv("HOME")
```

- Use `:=` shorthand to declare and initialize a variable, only available in function scope.

```go
func main() {
  k := 3 // same as `var k = 3`
}
```

- Unused local variables are compile errors.

```go
func main() {
  x := 1 // error: declared and not used: x
}
```

- Multiple assignment swaps values without a temporary variable.

```go
a, b := 1, 2
a, b = b, a // a: 2, b: 1
```

- Assignment of constant can only be **constant expression** computed at compile time.
  - string
  - character(`rune`)
  - numeric
  - boolean
  - mathematical operation(ex. `1 << 1`)

```go
const (
  Hello = "Hello"
  A     = 'A'
  Pi    = 3.14
  Truth = true
  Big   = 1 << 100
)

const home = os.Getenv("HOME") // error: os.Getenv("HOME") (value of type string) is not constant
```

## Operator

- `++`, `--` are statements not expressions.

> Unlike C, Java, PHP or JavaScript, only postfix `i++` as a statement, no prefix `++i` or `j = i++`, while Python has no `++` at all.

```go
i := 0
i++      // ok
j := i++ // error: syntax error: unexpected ++ at end of statement
```

- No pointer arithmetic.

> Unlike C, no pointer arithmetic and memory is garbage-collected; unlike Java, PHP, Python, JavaScript or TypeScript, Go has explicit pointers (`&x`, `*p`).

```go
x := 1
p := &x
*p = 2 // ok, x: 2
p++    // error: invalid operation: p++ (non-numeric type *int)
```

## For, If and Switch

- No parentheses `()` around conditions, but braces `{}` are always required, and `{` must be on the same line.
  - Semicolons are inserted automatically at the end of lines, so a line break before `{` ends the statement.

```go
if x > 0 {    // ok
  return x
}

if (x > 0)    // error: unexpected newline, expected { after if clause
{
  return x
}

if x > 0 return x // error: unexpected keyword return, expected {
```

- There is only `for` looping keyword.

  > Unlike `while` and `do-while` in C, Java, PHP, JavaScript or TypeScript, or `while` in Python.

  ```go
  sum := 0
  for i := 0; i < 10; i++ {
    sum += i
  }
  ```

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
if v := math.Pow(x, n); v < limit {
  return v
}
// `v` is out of scope here
```

- No [ternary conditional operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator).

```go
// max := a > b ? a : b // syntax error
max := b
if a > b {
  max = a
}
```

- `case` in `switch` can be an expression, and last `break` statement is unnecessary.

> Unlike C, Java, PHP, JavaScript or TypeScript, no fall through to the next `case` by default, use `fallthrough` explicitly.

```go
switch os := runtime.GOOS; os {
case "darwin":
  fmt.Println("macOS")
case "linux", "freebsd":
  fmt.Println("Linux or BSD")
default:
  fmt.Println(os)
}
```

```go
switch 1 {
case 1:
  fmt.Println("one")
  fallthrough
case 2:
  fmt.Println("two")
}
// one
// two
```

- `if`-`else if`-`else` by `switch` without condition expression.

```go
// same as `switch true`
switch hour := time.Now().Hour(); {
case hour < 12:
  fmt.Println("Good morning!") // `if` statements
case hour < 17:
  fmt.Println("Good afternoon!") // `else-if` statements
default:
  fmt.Println("Good evening!") // `else` statements
}
```

## Function

- Functions can return multiple values, commonly with an `error` as the last one instead of throwing exceptions.

```go
import "strconv"

n, err := strconv.Atoi("42a")
if err != nil {
  fmt.Println(err) // strconv.Atoi: parsing "42a": invalid syntax
}
```

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

```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return // same as `return x, y`
}
```

## Defer

- `defer` statements are executed in stacked LIFO order until their surrounding function finished.

> Similar to `finally` in Java, PHP, Python, JavaScript or TypeScript for cleanup, but scoped to the function rather than a `try` block.

```go
for i := 0; i < 3; i++ {
  defer fmt.Print(i)
}
fmt.Print("done ")
// done 210
```

- Arguments to `defer` statement are evaluated immediately.

```go
i := 1
defer fmt.Println(i) // 1
i++
```

- More about [`defer`, `panic`, and `recover`](https://go.dev/blog/defer-panic-and-recover).

## Struct

- `struct`: typed collection of fields.
  - Methods are declared with a receiver, and reused by embedding (composition).

> Unlike Java, PHP, Python, JavaScript or TypeScript, no `class` and inheritance, closer to `struct` in C but with methods.

```go
type Vertex struct {
  X, Y int
}

v := Vertex{1, 2}
v.X = 4
p := &v
p.Y = 5 // same as `(*p).Y = 5`
```

```go
func (v Vertex) Sum() int {
  return v.X + v.Y
}

type Point3D struct {
  Vertex // embedded
  Z int
}

p3 := Point3D{Vertex{1, 2}, 3}
p3.X     // 1, promoted field from `Vertex`
p3.Sum() // 3, promoted method from `Vertex`
```

## Array, Slice and Map

### Array

- Uninitialized array `[n]T`: `n` zero-valued elements of type `T`, never `nil`.
- `[n]T{}`: `n` zero-valued elements of type `T`.
- `[...]T{elements, n:element}`: length-inferred elements by `...` of type `T`, with the `n`th-assigned element.

```go
var a [3]int                  // [0 0 0]
b := [3]int{}                 // [0 0 0]
c := [...]string{"a", 3: "d"} // ["a" "" "" "d"], len: 4
```

- The fixed size of an array is part of its type.

> ex. The types `[10]int` and `[20]int` are distinct.

```go
var a [10]int
var b [20]int
a = b // error: cannot use b (variable of type [20]int) as [10]int value in assignment
```

- **Passed-by-value**: assigning one array to another copies all the elements, passing into a function as well.

> Unlike Java, Python, JavaScript or TypeScript where arrays (lists) are references, or C where arrays decay to pointers, but similar to PHP arrays copied on assignment.

```go
a := [3]int{1, 2, 3}
b := a
b[0] = 100
fmt.Println(a, b) // [1 2 3] [100 2 3]
```

### Slice

- A pointer referred to an underlying array, see [Go Slices: usage and internals](https://go.dev/blog/slices-intro) and utility functions in [`slices`](https://pkg.go.dev/slices) package.
  - `len()`(**length**): amount of elements in a slice.
  - `cap()`(**capacity**): remaining amount of elements in underlying array, counting from the first element in the referred slice.

```go
arr := [5]int{0, 1, 2, 3, 4}
s := arr[1:3]  // [1 2]
len(s), cap(s) // 2, 4
s[0] = 10      // arr: [0 10 2 3 4]
```

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

```go
s := make([]int, 3, 5) // [0 0 0], len: 3, cap: 5
```

- [`append(slice, elements)`](https://pkg.go.dev/builtin#append): append elements to the end of a slice, reallocating to a new underlying array if its capacity insufficient.

```go
s := make([]int, 0, 1)
s = append(s, 1)    // [1], cap: 1
s = append(s, 2, 3) // [1 2 3], reallocated with a larger cap
```

- [`copy(to_slice, from_slice)`](https://pkg.go.dev/builtin#copy): copy slice and its underlying array up to minimum of `len(from)` and `len(to)`.

```go
src := []int{1, 2, 3}
dst := make([]int, 2)
n := copy(dst, src) // n: 2, dst: [1 2]
```

- [`clear(slice)`](https://pkg.go.dev/builtin#clear): reset all slice-referred elements zero-valued by their type in the underlying array.

```go
s := []int{1, 2, 3}
clear(s) // [0 0 0], len: 3
```

### Map

- Utility functions in [`maps`](https://pkg.go.dev/maps) package.

```go
import "maps"

m := map[string]int{"a": 1}
c := maps.Clone(m)
maps.Equal(m, c) // true
```

- Iteration order over a map is randomized, don't rely on it.

```go
m := map[string]int{"a": 1, "b": 2, "c": 3}
for k, v := range m {
  fmt.Println(k, v) // order may differ in each run
}
```

- Uninitialized map: `nil`, empty map: `map[key_T]value_T`.
  - Cannot assign any key-value pair to an uninitialized map, use `make(map[key_T]value_T)` to allocate an empty map.

```go
var nm map[string]int
nm["k"] = 1 // panic: assignment to entry in nil map

m := make(map[string]int)
m["k"] = 1 // ok
```

- Key of a map can be any type for which the equality operator is defined, so **slice** can't be used as map keys.

```go
a := map[[2]int]string{{0, 0}: "origin"} // ok, array is comparable
s := map[[]int]string{}                  // error: invalid map key type []int
```

- If a key doesn't exist in a map, zero-valued `value_T` (and key exists or not, a.k.a. **comma ok**) is/are returned.

```go
m := make(map[string]int)
value, ok := m["key"] // `value`: 0, `ok`: false
_, ok = m["key"] // just `ok` by blank identifier in place of `value`
```

- [`delete(map, key)`](https://pkg.go.dev/builtin#delete): remove a key-value pair from a map.

```go
m := map[string]int{"a": 1, "b": 2}
delete(m, "a") // map[b:2]
```

- [`clear(map)`](https://pkg.go.dev/builtin#clear): remove all key-value pairs up to an empty map.

```go
m := map[string]int{"a": 1, "b": 2}
clear(m) // map[]
```
