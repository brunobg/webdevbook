# Code and debugging tips

Coding is debugging. This section gives a few tips of tools to avoid some bugs and detect them before you run your code, as well as explains how to debug your code and things don't go as expected. Which is always.

We'll also have more to say about [testing](./tests.md). If you write tests early -- like with [TDD](https://en.wikipedia.org/wiki/Test-driven_development) you can avoid tedious manual tests and know when things break.

## STAN

## Xdebug

[Xdebug](https://xdebug.org) is a plugin for PHP that allows debugging and profiling. It's very powerful, but people rarely use its debugger. Perhaps because other languages are easier to setup debuggers.

See the [installation instructions for Xdebug](https://xdebug.org/docs/install).

```
[xdebug]
zend_extension="/usr/local/opt/php71-xdebug/xdebug.so"
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
