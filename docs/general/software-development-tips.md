# Software Development Tips

## 以套件實現系統功能的優先順序考量

1. 系統套件
2. 第三方開源套件
3. 自己修改過的第三方套件
4. 自己刻的套件

## Semantic Versioning 語意化版本

- [Semantic Versioning](https://semver.org): **MAJOR**.**MINOR**.**PATCH**
  - MAJOR: when making incompatible changes.
  - MINOR: when adding functionality in a backward compatible manner.
  - PATCH: when making backward compatible bug fixes.

## License

- [Choose an open source license](https://choosealicense.com)

## Naming

- flatcase
- camelCase, lowerCamelCase, dromedaryCase
- StudlyCase, UpperCamelCase, CapitalCamelCase, BumpyCase, PascalCase
- kebab-case, dash-case, hyphen-case, param-case, caterpillar-case, spinal-case, brochette-case, css-case, lisp-case
- Train-Case
- COBOL-CASE
- snake_case, pothole_case, c_case
- MACRO_CASE, ALL_CAPS, UPPER_CASE, SCREAMING_SNAKE_CASE

## Expression v.s. Statement

![Expression v.s. Statement](/general/expression-statement.png)

- expression: any section of codes evaluating to a value.
- statement: a complete line of code performing some actions, without a value returned.

## Object-Oriented Programming

- High cohesion, low coupling.
- Not Encapsulation, Inheritance or Polymorphism, but **Abstraction** to deal with **complexity** easily.
- [**W**rite **E**verything **T**wice -> **D**on't **R**epeat **Y**ourself](https://zh.wikipedia.org/wiki/一次且僅一次).
- **SOLID** by Robert. C. Martin for OOP clean code design
  - **S**ingle responsibility principle(單一功能原則): A software entity(module, class, function) should have one, and only one, reason to be changed.
    - **Responsibility** is a "reason to change".
  - **O**pen-closed principle(開閉原則): A software entity should be opened for extension, but closed for modification.
    - When a new feature needs to be built inside it, **extend the entity instead of modifying it**.
  - **L**iskov substitution principle(里氏替換原則): Derived classes must be substitutable for their base classes.
    - a.k.a. **Behavioral Subtyping**.
    - The **signature**, **return type** and **exception types** of a method must be same in base class and its derived classes.
  - **I**nterface-segregation principle(介面隔離原則): Many client-specific interfaces are better than one general-purpose interface.
    - **Role Interface**: make fine grained interfaces that are client-specific.
  - **D**ependency inversion principle(依賴反轉原則): Use **Dependency Injection** to decouple software modules.
    - High-level modules shouldn't depend on low-level modules. Both should depend on abstractions.
      - **Depend on abstractions, not on concretions**.
    - Abstractions shouldn't depend on details. Details should depend on abstractions.

![SOLID - Dependency Inversion Principle](/general/solid-dependency-inversion.png)

## Architectures

> "The only way to go fast, is to go well." — Robert C. Martin

- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- Hexagonal(六角形) Architecture: **Ports**(interfaces) & **Adapters**(implementations)
  - Android Modularization: Hexagonal Architecture with Kotlin and MVVM
    - [Part 1: The Big Picture](https://medium.com/@Marchosiax/android-modularization-hexagonal-architecture-with-kotlin-and-mvvm-part-1-db338833d6c2)
    - [Part 2: The Connections](https://medium.com/@Marchosiax/android-modularization-hexagonal-architecture-with-kotlin-and-mvvm-part-2-the-connections-e9fee15e8e1f)
  - Pros: Testability & Maintainability, because of more modularity.
  - Cons: Complexity, because of more time-costing built artifacts when the application is bigger.
- [Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [The Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1)
  - Separation of concerns: The application codes are separated into layers.
    - **Entities**: Enterprise Business Rules, business objects of the application.
    - **Use Cases**: Application Business Rules
      - Ports & Interactors
      - Orchestrate the data flow to and from the Entities, and direct them to use their enterprise wide business rules to achieve the goals of the use case.
    - **Interface Adapters**: Controllers, Presenters & Gateway
      - Convert data from the format which is most convenient for the use cases and entities, to the format which is most convenient for some external agencies.
      - ex. MVC architecture of a GUI.
    - **Frameworks & Drivers**: External Interfaces, UI, Web Framework or API, Devices & DB
  - Dependency rules
    - Dependency points inward, each layer only interacts with the layers inside it.
    - Concrete modules depend on the more abstract ones.
  - More bottom/inner, more generic/abstract
    - Implementation details(mechanisms) -> policies & rules.

## Unit Testing

- A small piece of code that applies input to a component under testing and then **asserts** expectations.
- What are properties of good Unit Testing?
  - **run fast**: for big scale input and fast feedback loop while coding.
  - **small** and **focus**: test only one piece of logic every time without any control flow or iteration in it.
  - **isolated**: states when each test ends should be same as their beginning.
  - **trustworthy**: developers in your team need to trust the test.
  - **readable** and **maintainable**: follow coding style.
  - **automated**: use frameworks in IDE or CI.
- 2 types
  - **State-based**: result-driven, black-box, ex. **JUnit**
    - input -> component under testing -> output
  - **Interaction-based**: action-driven, white-box, ex. **Mockito**
- 3A rule
  - **A**rrange: 設置環境 -> **Given**
  - **A**ct: 動手做實驗 -> **When**
  - **A**ssert: 驗證 -> **Then**
- Test Naming: **`methodOrClassUnderTest_actionOrInput_expectedResult`**

## Test Doubles 測試替身

- [搞笑談軟工：什麼是測試替身？](http://teddy-chen-tw.blogspot.com/2014/09/test-double1.html)
- A version of a class crafted specifically for testing, replacing its real version in tests.
  - **Fake**: a "working"(producing realistic outputs when given inputs) implementation of the class to make it good for testing but unsuitable for production.
  - **Mock**: tracks which of its methods were called, then the test passed or failed depends on whether these methods were called correctly.
  - **Spy**: tracks some additional information of its methods, such as the number of calling a method.
  - **Stub**: includes no logic and only returns what you program it to return.
  - **Dummy**: passes around but not used, such as if you just need to provide it as a parameter.
- To avoid flaky(易碎成小薄片的) tests: test cases with inconsistent results when run repeatedly on the same test code.

## Test Driven Development

- Write tests first, write enough feature code to pass the tests, and refactor the feature code better and able to pass them as well.
- To protect your feature code from ever accidentally reintroducing bugs of the feature in the future.
