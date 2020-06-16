(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{383:function(e,t,s){"use strict";s.r(t);var a=s(43),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"testing-and-deployment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#testing-and-deployment"}},[e._v("#")]),e._v(" Testing and Deployment")]),e._v(" "),s("p",[e._v("Any project without automatic tests is bound to break and go to production broken. Tests avoid regression. Tests are also the last thing many people implement, if ever. We'll see how easy it is to add a few automatic tests")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("There are many tools for Continuous Integration and Continuous Delivery these days. They automate your tests and run then on every commit. Take a look at "),s("a",{attrs:{href:"https://www.jenkins.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jenkins"),s("OutboundLink")],1),e._v(" for example.")])]),e._v(" "),s("h2",{attrs:{id:"unit-tests-with-mocha"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#unit-tests-with-mocha"}},[e._v("#")]),e._v(" Unit tests with Mocha")]),e._v(" "),s("p",[e._v("Unit tests of the frontend can check that the implementation is doing what is expected and is a good way to test complex functions in Vue files or in independent JS files.")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("A unit test can quickly become a feature test -- and whether that is right or wrong depends on who you're talking to. Unit tests should be about single units of code, ensuring they are working as expected. Often bugs happen when you integrate code; two pieces of code which are correctly working in separate have a bug when called together. Feature tests catch those bugs. On the frontend simulating a browser for feature tests can quickly become hard to manage, so perhaps an E2E test might be more appropriate.")])]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("yarn")]),e._v(" test:mocha\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("Using VSCode? Check "),s("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=maty.vscode-mocha-sidebar",target:"_blank",rel:"noopener noreferrer"}},[e._v("the mocha sidebar"),s("OutboundLink")],1)])]),e._v(" "),s("h2",{attrs:{id:"end-to-end-web-tests-with-cypress"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#end-to-end-web-tests-with-cypress"}},[e._v("#")]),e._v(" End-to-end web tests with Cypress")]),e._v(" "),s("p",[e._v("End-to-end (E2E) tests have the nice quality of running the exact same operations and on the exact interface your users will run. This is as close as possible to someone actually using the system. On the other hand they are more prone to break -- if you change the interface too much, the tests break. It's also hard to write E2E tests as part of TDD: you need to know what the interface is like before you can implement them.")]),e._v(" "),s("p",[e._v("The tools for E2E tests have evolved very much over the last few years and is much more stable.")]),e._v(" "),s("ol",[s("li",[e._v("Plan your test. Describe what it needs to do. Even though you are doing E2E, avoid very long tests.")]),e._v(" "),s("li",[e._v("Design your interface before your test. It's time consuming to update your tests several times because the HTML keeps changing.")]),e._v(" "),s("li",[e._v("Implement ids in your HTML to have robust selectors. It's easier to target a "),s("code",[e._v("#element")]),e._v(" than a "),s("code",[e._v("div.class > div > div > button")]),e._v(". It will change way less with time: the id will always be attached to that element, while the HTML structure might change completely for purely visual reasons. If you are using classes as selectors, prefer to use classes that are only for selecting, instead of using visual CSS classes which might change any time.")])]),e._v(" "),s("p",[e._v("We'll use "),s("a",{attrs:{href:"https://www.cypress.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cypress"),s("OutboundLink")],1),e._v(" to implement E2E here, but the idea of E2E tests is the same with any tool you use. Cypress has the advantage of running in an integrated Chromium browser, which makes watching what goes wrong and debugging both the app and the tests themselves easy, and runs standalone without the need of spawning a test server instance.")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("yarn")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" cypress faker --dev\n./node_modules/.bin/cypress "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("open")]),e._v("\n\n")])])]),s("p",[e._v("This will create a "),s("code",[e._v("cypress/")]),e._v(" directory.")]),e._v(" "),s("p",[e._v("Let's test our registration system as an example of E2E. This is a complex operation that performs a lot of tasks internally, including on our backend. But it's a very important feature that you are probably not going to use often, as you'll hardly ever create new users during your development. What we want:")]),e._v(" "),s("ol",[s("li",[e._v("Open the login page.")]),e._v(" "),s("li",[e._v("Select new user registration")]),e._v(" "),s("li",[e._v("Fill data\n"),s("ol",[s("li",[e._v("Try to submit it with empty data.")]),e._v(" "),s("li",[e._v("Fill with invalid values")]),e._v(" "),s("li",[e._v("Fill with correct values")])])]),e._v(" "),s("li",[e._v("Submit")]),e._v(" "),s("li",[e._v("Check we were registrated correctly.")])]),e._v(" "),s("p",[e._v("<x<x< @/../client/cypress/integration/register_test.js")]),e._v(" "),s("p",[e._v("https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/")]),e._v(" "),s("h2",{attrs:{id:"end-to-end-native-tests-with-appium"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#end-to-end-native-tests-with-appium"}},[e._v("#")]),e._v(" End-to-end native tests with Appium")]),e._v(" "),s("h2",{attrs:{id:"mocking"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mocking"}},[e._v("#")]),e._v(" Mocking")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://miragejs.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mirage"),s("OutboundLink")],1),e._v(" and "),s("a",{attrs:{href:"https://github.com/nock/nock",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nock"),s("OutboundLink")],1),e._v(" are packages that allow you to easily mock calls")])])}),[],!1,null,null,null);t.default=n.exports}}]);