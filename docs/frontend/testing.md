# Testing and Deployment

Any project without automatic tests is bound to break and go to production broken. Tests avoid regression. Tests are also the last thing many people implement, if ever. We'll see how easy it is to add a few automatic tests

:::tip
There are many tools for Continuous Integration and Continuous Delivery these days. They automate your tests and run then on every commit. Take a look at [Jenkins](https://www.jenkins.io/) for example.
:::

## Unit tests with Mocha

Unit tests of the frontend can check that the implementation is doing what is expected and is a good way to test complex functions in Vue files or in independent JS files.

:::tip
A unit test can quickly become a feature test -- and whether that is right or wrong depends on who you're talking to. Unit tests should be about single units of code, ensuring they are working as expected. Often bugs happen when you integrate code; two pieces of code which are correctly working in separate have a bug when called together. Feature tests catch those bugs. On the frontend simulating a browser for feature tests can quickly become hard to manage, so perhaps an E2E test might be more appropriate.
:::

Let's add our deps.

```shell
vue add unit-mocha
yarn add faker
```

Add some nice script runners on `package.json`:

```json
{
  //...
  "scripts": {
    "test:mocha": "......."
  }
}
```

Now you can run tests with:

```shell
yarn test:mocha
```

:::tip
Using VSCode? Check [the mocha sidebar](https://marketplace.visualstudio.com/items?itemName=maty.vscode-mocha-sidebar) and run tests directly in your IDE.
:::

### Coverage

## End-to-end web tests with Cypress

End-to-end (E2E) tests have the nice quality of running the exact same operations and on the exact interface your users will run. This is as close as possible to someone actually using the system. On the other hand they are more prone to break -- if you change the interface too much, the tests break. It's also hard to write E2E tests as part of TDD: you need to know what the interface is like before you can implement them.

The tools for E2E tests have evolved very much over the last few years and is much more stable.

1. Plan your test. Describe what it needs to do. Even though you are doing E2E, avoid very long tests.
1. Design your interface before your test. It's time consuming to update your tests several times because the HTML keeps changing.
1. Implement ids in your HTML to have robust selectors. It's easier to target a `#element` than a `div.class > div > div > button`. It will change way less with time: the id will always be attached to that element, while the HTML structure might change completely for purely visual reasons. If you are using classes as selectors, prefer to use classes that are only for selecting, instead of using visual CSS classes which might change any time.

We'll use [Cypress](https://www.cypress.io/) to implement E2E here, but the idea of E2E tests is the same with any tool you use. Cypress has the advantage of running in an integrated Chromium browser, which makes watching what goes wrong and debugging both the app and the tests themselves easy, and runs standalone without the need of spawning a test server instance.

```shell
yarn add cypress faker --dev
./node_modules/.bin/cypress open

```

This will create a `cypress/` directory.

Let's test our registration system as an example of E2E. This is a complex operation that performs a lot of tasks internally, including on our backend. But it's a very important feature that you are probably not going to use often, as you'll hardly ever create new users during your development. What we want:

1. Open the login page.
1. Select new user registration
1. Fill data
   1. Try to submit it with empty data.
   1. Fill with invalid values
   1. Fill with correct values
1. Submit
1. Check we were registrated correctly.

<x<x< @/../client/cypress/integration/register_test.js

https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/

## End-to-end native tests with Appium

## Mocking

[Mirage](https://miragejs.com/) and [Nock](https://github.com/nock/nock) are packages that allow you to easily mock calls
