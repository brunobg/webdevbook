# Introduction

So you want to build the frontend for a native and web application. You don't want to implement three different versions in three different languages. You also think that going to a HTML wrapper like Cordova is too slow for what you are trying to achieve. This book will explain one way to implement the entire frontend in JS, using native bindings.

We assume that you have some familiarity with Javascript and [VueJS](https://vuejs.org). You might not have ever seen [NativeScript](https://nativescript.org/) (TNS), which is an open source framework for building truly native mobile apps with Angular, Vue.js, TypeScript, or JavaScript, which compiles to iOS or Android applications. We are adopting it because [it provides integration with VueJS](https://nativescript-vue.org/) and we can share most of our code between Web and Native versions of the application, changing only the interface code. This solves a major problem of keeping web, ios and Android versions of the same application, which is maintaining three different code bases. With this approach we maintain a single code base, with two different view templates, HTML and NS. It becomes closer to maintaining a responsive application. This is not a tutorial of TNS, however; see its site for that. The frontend part of this book is about how to structure your code and how to solve the most common problems that we often face.

## Setup the project

We will not follow the scaffolding from [the nativescript getting started guide](https://nativescript-vue.org/en/docs/getting-started/quick-start/). The reason is that it doesn't play well with the usual vue-cli setup to build the web version. Instead we follow [its other setup](https://nativescript-vue.org/en/docs/getting-started/code-sharing/) which is based on vue-cli and should be more familiar to most people. Let's create our application:

```shell
$ yarn global add @vue/cli
$ vue create our-client
# You should add babel and webpack when asked.

$ cd our-client
$ vue add vue-cli-plugin-nativescript-vue
```

::: tip
We'll use `yarn` on the docs, but of course `npm` would work just as well.
:::

Some questions will be asked. Fill with your correct app identifier. Prefer the history mode -- it is nicer the user and you can use the HTML5 history API.

```
? Enter a unique application identifier: org.nativescript.application
? Use HTML5 history mode? (Default: hash mode) Yes
? Is this a brand new project? (Default: Yes) Yes
? Dual Native AND Web development experience or a Native only? (Default: Dual) Dual Native AND Web
? What type of template do you want to start with? (Default: Simple) Simple
```

At this point you should have the basic stuff to get started. Get a coffee while things are downloaded and compiled. Then you can run thinks:

```
# now you can serve the web application
$ yarn run serve:web

# now you can serve the mobile application
$ yarn run preview:android
# or
$ yarn run preview:ios
```

## How to build

We have several build targets, and our package.json shows this.

<dl>
  <dt>yarn build:[platform]</dt>
  <dd>Builds production version for the target platform.</dd>

  <dt>yarn clean:[platform]</dt>
  <dd>Cleans build.</dd>

  <dt>yarn debug:[platform]</dt>
  <dd>Only iOS and Android. This runs a hot reloading version with full debug on your actual device.</dd>

  <dt>yarn serve:[platform]</dt>
  <dd>Runs the software on the actual device. For web this provides a webserver with hot reloading.</dd>
</dl>

## Code structure

We'll end up with a directory structure like this:

<dl>
  <dt>dist/</dt>
  <dd>Directory for production build of the Web version</dd>
  <dt>hooks/</dt>
  <dd>Hook scripts for build</dd>
  <dt>platforms/</dt>
  <dd>Build directory for native app</dd>
  <dt>public/</dt>
  <dd>Directory for public files. Things here will be copied as they are to the web version</dd>
  <dt>src/</dt>
  <dd>The actual code</dd>
  <dt>src/assets</dt>
  <dd>Images and other assets loaded by the code go here.</dd>
  <dt>src/components</dt>
  <dd>Components that you can reuse.</dd>
  <dt>src/shared</dt>
  <dd>JS code that you can reuse.</dd>
  <dt>src/views</dt>
  <dd>Routeable pages.</dd>
</dl>

## Sharing Native and Web code

It's possible to use a Single File Component mixing both web and native code, something like this:

```html
<template web>
  <span class="myclass">
    Something
  </span>
</template>
<template native>
  <label text="Something" class="myclass" />
</template>

<script native></script>

<script web></script>

<style native></style>
<style web></style>
```

Not all tags need a web/native version. You can have the same `<script>` for both. If you need to have completely different versions of the files it's easier to create separate files, which will be loaded automatically according to the build. This is valid for vue or js files:

<dl>
  <dt>file.android.vue</dt>
  <dd>Loaded by the Android build, if this file exists</dd>
  <dt>file.ios.vue</dt>
  <dd>Loaded by the iOS build, if this file exists</dd>
  <dt>file.native.vue</dt>
  <dd>Loaded by the native build, if this file exists and the specific (Android/iOS) file does not exist</dd>
  <dt>file.vue</dt>
  <dd>The web/native version, replaced by the above files if they exist</dd>
</dl>

We organize the code for this book to use a single `file.js` with separate `<template>` in most cases, and when the `<script>` part also differs we use separate files.

Sometimes you need to run only a few extra lines in one of the builds. It's easy to do it with an if. The only drawback is that you can't `import` external code that only works natively or on web inside the if.

```js
if (process.env.VUE_APP_MODE === "native") {
  // do something here
}
```

Of course it's easier to add a few helper methods:

```js
isNative() {
    return (process.env.VUE_APP_MODE == 'native');
},

isWeb() {
    return (process.env.VUE_APP_MODE == 'web');
}
```

You'll end up with several minor functions like this which are useful all through your project. It's easier to add them to a

```js
import PageMixin from "~/modules/pagemixin";
Vue.mixin(PageMixin);
```

```js
import pagemixinsub from "./pagemixinsub";

export default {
  methods: {
    ...pagemixinsub.methods,

    // shared code goes here

    isNative() {
      return process.env.VUE_APP_MODE == "native";
    },

    isWeb() {
      return process.env.VUE_APP_MODE == "web";
    },
  },
};
```

::: tip
One helpful way to setup this mixin is to write shared code directly there, but separate platform specific in `pagemixinsub.js` and `pagemixinsub.native.js` files.
:::

For example, you can have a single `this.confirm()` method available on all Vue components that returns a promise and works for web and native:

```js
export default {
  methods: {
    confirm(message, title = "My app", okButtonText = "OK") {
      return new Promise((resolve, reject) => {
        if (confirm(message)) {
          resolve();
        } else {
          reject();
        }
      });
    },
  },
};
```

Native version:

```js
const dialogs = require("tns-core-modules/ui/dialogs");

export default {
  methods: {
    confirm(message, title = "My app", okButtonText = "OK") {
      return dialogs.confirm({
        title,
        okButtonText,
        message,
      });
    },
  },
};
```

There are two different entry points for this project, `src/main.js` and `src/main.native.js`. This makes it easy to setup basic code that differs for native and web.
