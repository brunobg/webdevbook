# Code and debugging tips

Coding is debugging. This section gives a few tips of tools to avoid some bugs and detect them before you run your code, as well as explains how to debug your code and things don't go as expected. Which is always.

We'll also have more to say about [testing](./tests.md).

## Lint and Prettier

[ESLint](https://eslint.org/) is the first tool to avoid problems in your JS code, as it detects undefined variables, missing catches and other stuff. You should run lint on every save -- most editors have ways to do that.

Running [Prettier](https://prettier.io/) on every save guarantees that your code follows a format standard from all developers.

To add eslint and prettier to our package:

```shell
$ yarn add babel-eslint eslint eslint-config-prettier eslint-plugin-vue eslint-plugin-prettier prettier @vue/eslint-config-prettier @vue/cli-plugin-eslint --dev
```

Eslint supports Vue, but you'll run into errors with the NativeScript support for two different templates. There's a simple workaround.

```js
rules: {
    "vue/valid-template-root": "off",
}
```

## VSCode

If you are going to use VSCode you can also install some extra plugins:

- <a href="https://vuejs.github.io/vetur/">Vetur</a>
- [Gettext plugin](https://marketplace.visualstudio.com/items?itemName=mrorz.language-gettext) to edit PO files for [i18n](./i18n.md)
- You can [debug Vue from VSCode with a little setup](https://vuejs.org/v2/cookbook/debugging-in-vscode.html).
- [NativeScript support](https://marketplace.visualstudio.com/items?itemName=NativeScript.nativescript)

## General tips

Some helfpul tips:

- [automatic tests](./testing.md) are better than manual tests. A TDD approach might be smarter and quicker.
- use the [debugjs](https://github.com/visionmedia/debug) to print your debug information. It's better than console.log().
- debugging the web version is easier than the native version running on a real device or emulator. If you are debugging shared code, test in on the web version first.
- remember the `debugger` [statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) if you want a quick and dirty breakpoint.
- Both Chrome and Firefox have great native debuggers and consoles. Add the Vue.js devtools extension for debugging Vue.
- You may be writing frontend code for a backend that is not ready yet. This is not a problem: mock your data. A quick way to do it is to comment your `fetch` call or make it return static data. As long as the endpoint is already defined you can easily develop mocking these calls. For a more structured way to do mocking, [Mirage](https://miragejs.com/) and [Nock](https://github.com/nock/nock) are good solutions. We'll talk about mocking in the [automatic tests chapter](./testing.md) too.

### Android

The easiest way to debug a NS Android app is through Chrome. You can connect it to the application and get a console and a debugger. You can see the layout XML tree, but not change it.

### iOS
