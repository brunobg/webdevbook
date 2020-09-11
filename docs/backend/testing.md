# Testing

Coding is debugging, and debugging is testing. This section gives a few tips of tools to avoid some bugs and detect them before you run your code, as well as explains how to debug your code and things don't go as expected. Which is always.

Remember, if you write tests early -- like with [TDD](https://en.wikipedia.org/wiki/Test-driven_development) you can avoid tedious manual tests and know when things break. There's a lot of tools that can be run automatically. Manual tests should only happen while you are actively developing something -- and should be immediately converted into automatic tests -- or when you are debugging a bug not covered by automated tests.

:::tip
There are many tools for Continuous Integration (CI) and Continuous Delivery (CD) these days. They automate your tests and run then on every commit. Take a look at [Jenkins](https://www.jenkins.io/) for example.
:::

Don't forget to check the [frontend testing section](../frontend/testing.md) as well.

## Static analysis

PHP is a dynamic and weakly typed language, so it does not have a compiler. This means that even typos and syntax errors can go to production and crash when they run. It's wise to use tools to avoid that, and static analysis tools are the main staple for that.

[PHP Parallel Lint](https://github.com/php-parallel-lint/PHP-Parallel-Lint) checks the syntax of PHP files and is a quite fast tool. It's useful to catch major problems.

[PHPStan](https://phpstan.org) can find several errors in your code without running it, as well as enforcing good practices. It's trivial to run and, while it won't catch everything, it will avoid a series of common errors, like referring to variables that are not declared or return values that are not processed correctly.

[Psalm](https://psalm.dev/docs/) is an alternative to PHPStan, which focus on type-related bugs. It has a multi-threaded mode and incremental checks, making it fast.

[Phan](https://github.com/phan/phan) is a static analyzer for PHP that prefers to minimize false-positives. Phan attempts to prove incorrectness rather than correctness.

[PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) can check if you are following code standards and correct them automatically. This ensures that all the developers in your team write consistent code with a well defined standard.

There is no need to pick one: you can run all of them. These tools are easy to setup and usually require little to no configuration. You should run these on your Continuous Integration software, on every push.

## Xdebug

[Xdebug](https://xdebug.org) is a plugin for PHP that allows debugging and profiling. It's very powerful, but people rarely use its debugger. Perhaps because other languages have easier to setup debuggers? Or because `var_dump` seems so simpler? Either way, XDebug can let you pause and inspect code that is running.

See the [installation instructions for Xdebug](https://xdebug.org/docs/install).

```
[xdebug]
zend_extension="/your/path/xdebug.so"
xdebug.remote_enable=1
```

## VSCode

If you are going to use [VSCode](https://code.visualstudio.com/) you can also install some extra plugins:

- [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
- [PHP IntelliSense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense)

To run with Xdebug, remember to set:

```shell
export XDEBUG_CONFIG="idekey=VSCODE"
```

To debug enter the `Run` panel and on the top choose to "Listen for XDebug".

## Unit and feature tests with PHPUnit

Whenever you change code in an application you might be fixing one bug and creating a new one in something else that was working correctly. This is called regression, and it's the main reason we want to automate testing. If we were sure that code would never regress we could test it just once, but the reality is that code is always breaking. Besides, it's not unusual to refactor code and make large changes to accommodate new behavior. You need to be sure that your new code will work just like before. The way to do test code, is, of course, to write even more code.

So what's the difference between unit and feature tests? Unit tests are written from the developer's perspective and should test a single method. They are useful to check individual behaviors, but bugs often lie in the connection between multiple components. Feature or integration tests check a wider behavior: for example, "if a post is deleted, check that its comments were deleted from the database as well". Finally, there are functional tests, which test a whole operation done from the user perspective: sending REST or GraphQL queries, for example, and checking their results. If you are testing the frontend behavior as well you have [acceptance or end-to-end tests](../frontend/testing.md#end-to-end-tests), where you run an automated browser.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0GypdsJulKE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Google advocates a model called the testing pyramid, which gives a typical ratio of 70% unit tests, 20% functional tests, and 10% high level acceptance tests. This is a reasonable rule of thumb, but take it only as a guideline of course. Unit tests are faster to run (and usually to write) and are ideal for TDD. Integration tests are very important: in my experience, non-trivial bugs are most often caused by the interaction of different components than by themselves internally, since it's easier to grasp the whole picture of a single component.

From a technical point of view, feature and unit tests are written the same way. The standard software to write these tests in PHP is [PHPUnit](https://phpunit.de/). The standard Laravel project already bundles PHPUnit and creates a `tests/` directory, with `Feature` and `Unit` subdirectories and an example test case. So no setup is needed here.

What do you want to check in an unit test?

:::comment

A code tester walks into a bar. Orders a beer. Orders ten beers. Orders 2.15 billion beers. Orders -1 beers. Orders x beers. Orders a nothing. Orders a cat. Tries to leave without paying.

:::

Here are a few pointers:

1. check valid inputs.
1. check almost valid inputs. For example, if your input is an integer between 1 and 10, test for 0 and 11. And for 2.1.
1. check invalid inputs, such as "xxx".
1. check for null or empty strings.
1. run a test coverage and check for conditions that were not taken. Try to add tests for those.

This is pretty much valid for feature tests too, but also:

1. check that the return value is what you expected.
1. check for side-effects, both expected and unexpected. For example, check if the comments were deleted from the database in the example above. But you may also check that the users were not deleted.

There are a number of good practices as well.

It can be hard to setup a test, particularly a feature test. You might need several models in your database: in the same example, you need at least one user, a post and a comment -- possibly two users if users cannot comment on their own posts. Use factories for that. Don't expect data created elsewhere to be available for your test: make sure you create all the data yourself. Setting your test up is a time-consuming problem and one of the main reasons that developers skip them. PHPUnit has useful [fixtures](https://phpunit.readthedocs.io/en/9.3/fixtures.html), so you can use them extensively.
