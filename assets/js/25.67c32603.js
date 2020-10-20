(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{375:function(e,t,a){"use strict";a.r(t);var r=a(42),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"testing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#testing"}},[e._v("#")]),e._v(" Testing")]),e._v(" "),a("p",[e._v("Coding is debugging, and debugging is testing. This section gives a few tips of tools to avoid some bugs and detect them before you run your code, as well as explains how to debug your code and things don't go as expected. Which is always.")]),e._v(" "),a("p",[e._v("Remember, if you write tests early -- like with "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Test-driven_development",target:"_blank",rel:"noopener noreferrer"}},[e._v("TDD"),a("OutboundLink")],1),e._v(" you can avoid tedious manual tests and know when things break. There's a lot of tools that can be run automatically. Manual tests should only happen while you are actively developing something -- and should be immediately converted into automatic tests -- or when you are debugging a bug not covered by automated tests.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("There are many tools for Continuous Integration (CI) and Continuous Delivery (CD) these days. They automate your tests and run then on every commit. Take a look at "),a("a",{attrs:{href:"https://www.jenkins.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jenkins"),a("OutboundLink")],1),e._v(" for example.")])]),e._v(" "),a("p",[e._v("Don't forget to check the "),a("RouterLink",{attrs:{to:"/frontend/testing.html"}},[e._v("frontend testing section")]),e._v(" as well.")],1),e._v(" "),a("h2",{attrs:{id:"static-analysis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#static-analysis"}},[e._v("#")]),e._v(" Static analysis")]),e._v(" "),a("p",[e._v("PHP is a dynamic and weakly typed language, so it does not have a compiler. This means that even typos and syntax errors can go to production and crash when they run. It's wise to use tools to avoid that, and static analysis tools are the main staple for that.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/php-parallel-lint/PHP-Parallel-Lint",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHP Parallel Lint"),a("OutboundLink")],1),e._v(" checks the syntax of PHP files and is a quite fast tool. It's useful to catch major problems.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://phpstan.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHPStan"),a("OutboundLink")],1),e._v(" can find several errors in your code without running it, as well as enforcing good practices. It's trivial to run and, while it won't catch everything, it will avoid a series of common errors, like referring to variables that are not declared or return values that are not processed correctly.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://psalm.dev/docs/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Psalm"),a("OutboundLink")],1),e._v(" is an alternative to PHPStan, which focus on type-related bugs. It has a multi-threaded mode and incremental checks, making it fast.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/phan/phan",target:"_blank",rel:"noopener noreferrer"}},[e._v("Phan"),a("OutboundLink")],1),e._v(" is a static analyzer for PHP that prefers to minimize false-positives. Phan attempts to prove incorrectness rather than correctness.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/squizlabs/PHP_CodeSniffer",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHP CodeSniffer"),a("OutboundLink")],1),e._v(" can check if you are following code standards and correct them automatically. This ensures that all the developers in your team write consistent code with a well defined standard.")]),e._v(" "),a("p",[e._v("There is no need to pick one: you can run all of them. These tools are easy to setup and usually require little to no configuration. You should run these on your Continuous Integration software, on every push.")]),e._v(" "),a("h2",{attrs:{id:"xdebug"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xdebug"}},[e._v("#")]),e._v(" Xdebug")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://xdebug.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Xdebug"),a("OutboundLink")],1),e._v(" is a plugin for PHP that allows debugging and profiling. It's very powerful, but people rarely use its debugger. Perhaps because other languages have easier to setup debuggers? Or because "),a("code",[e._v("var_dump")]),e._v(" seems so simpler? Either way, XDebug can let you pause and inspect code that is running.")]),e._v(" "),a("p",[e._v("See the "),a("a",{attrs:{href:"https://xdebug.org/docs/install",target:"_blank",rel:"noopener noreferrer"}},[e._v("installation instructions for Xdebug"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('[xdebug]\nzend_extension="/your/path/xdebug.so"\nxdebug.remote_enable=1\n')])])]),a("h2",{attrs:{id:"vscode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vscode"}},[e._v("#")]),e._v(" VSCode")]),e._v(" "),a("p",[e._v("If you are going to use "),a("a",{attrs:{href:"https://code.visualstudio.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("VSCode"),a("OutboundLink")],1),e._v(" you can also install some extra plugins:")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHP Debug"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHP IntelliSense"),a("OutboundLink")],1)])]),e._v(" "),a("p",[e._v("To run with Xdebug, remember to set:")]),e._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("XDEBUG_CONFIG")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"idekey=VSCODE"')]),e._v("\n")])])]),a("p",[e._v("To debug enter the "),a("code",[e._v("Run")]),e._v(' panel and on the top choose to "Listen for XDebug".')]),e._v(" "),a("h2",{attrs:{id:"unit-and-feature-tests-with-phpunit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#unit-and-feature-tests-with-phpunit"}},[e._v("#")]),e._v(" Unit and feature tests with PHPUnit")]),e._v(" "),a("p",[e._v("Whenever you change code in an application you might be fixing one bug and creating a new one in something else that was working correctly. This is called regression, and it's the main reason we want to automate testing. If we were sure that code would never regress we could test it just once, but the reality is that code is always breaking. Besides, it's not unusual to refactor code and make large changes to accommodate new behavior. You need to be sure that your new code will work just like before. The way to do test code, is, of course, to write even more code.")]),e._v(" "),a("p",[e._v("So what's the difference between unit and feature tests? Unit tests are written from the developer's perspective and should test a single method. They are useful to check individual behaviors, but bugs often lie in the connection between multiple components. Feature or integration tests check a wider behavior: for example, \"if a post is deleted, check that its comments were deleted from the database as well\". Finally, there are functional tests, which test a whole operation done from the user perspective: sending REST or GraphQL queries, for example, and checking their results. If you are testing the frontend behavior as well you have "),a("RouterLink",{attrs:{to:"/frontend/testing.html#end-to-end-tests"}},[e._v("acceptance or end-to-end tests")]),e._v(", where you run an automated browser.")],1),e._v(" "),a("iframe",{attrs:{width:"560",height:"315",src:"https://www.youtube-nocookie.com/embed/0GypdsJulKE",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}),e._v(" "),a("p",[e._v("Google advocates a model called the testing pyramid, which gives a typical ratio of 70% unit tests, 20% functional tests, and 10% high level acceptance tests. This is a reasonable rule of thumb, but take it only as a guideline of course. Unit tests are faster to run (and usually to write) and are ideal for TDD. Integration tests are very important: in my experience, non-trivial bugs are most often caused by the interaction of different components than by themselves internally, since it's easier to grasp the whole picture of a single component.")]),e._v(" "),a("p",[e._v("From a technical point of view, feature and unit tests are written the same way. The standard software to write these tests in PHP is "),a("a",{attrs:{href:"https://phpunit.de/",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHPUnit"),a("OutboundLink")],1),e._v(". The standard Laravel project already bundles PHPUnit and creates a "),a("code",[e._v("tests/")]),e._v(" directory, with "),a("code",[e._v("Feature")]),e._v(" and "),a("code",[e._v("Unit")]),e._v(" subdirectories and an example test case. So no setup is needed here.")]),e._v(" "),a("p",[e._v("What do you want to check in an unit test?")]),e._v(" "),a("div",{staticClass:"custom-block comment"},[a("p",[e._v("A code tester walks into a bar. Orders a beer. Orders ten beers. Orders 2.15 billion beers. Orders -1 beers. Orders x beers. Orders a nothing. Orders a cat. Tries to leave without paying.")])]),e._v(" "),a("p",[e._v("Here are a few pointers:")]),e._v(" "),a("ol",[a("li",[e._v("check valid inputs.")]),e._v(" "),a("li",[e._v("check almost valid inputs. For example, if your input is an integer between 1 and 10, test for 0 and 11. And for 2.1.")]),e._v(" "),a("li",[e._v('check invalid inputs, such as "xxx".')]),e._v(" "),a("li",[e._v("check for null or empty strings.")]),e._v(" "),a("li",[e._v("run a test coverage and check for conditions that were not taken. Try to add tests for those.")])]),e._v(" "),a("p",[e._v("This is pretty much valid for feature tests too, but also:")]),e._v(" "),a("ol",[a("li",[e._v("check that the return value is what you expected.")]),e._v(" "),a("li",[e._v("check for side-effects, both expected and unexpected. For example, check if the comments were deleted from the database in the example above. But you may also check that the users were not deleted.")])]),e._v(" "),a("p",[e._v("There are a number of good practices as well.")]),e._v(" "),a("p",[e._v("It can be hard to setup a test, particularly a feature test. You might need several models in your database: in the same example, you need at least one user, a post and a comment -- possibly two users if users cannot comment on their own posts. Use factories for that. Don't expect data created elsewhere to be available for your test: make sure you create all the data yourself. Setting your test up is a time-consuming problem and one of the main reasons that developers skip them. PHPUnit has useful "),a("a",{attrs:{href:"https://phpunit.readthedocs.io/en/9.3/fixtures.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("fixtures"),a("OutboundLink")],1),e._v(", so you can use them extensively.")])])}),[],!1,null,null,null);t.default=s.exports}}]);