# Introduction

So you want to build the frontend for a native and web application. You don't want to implement three different versions in three different languages, for Web, Android and iOS. This book will explain one way to implement the entire frontend in JS, using HTML5 for web and Nativescript bindings for native apps. You can also ignore the Nativescript parts of the book if you are designing a pure HTML application with no prejudice at all.

We assume that you have some familiarity with Javascript and [VueJS](https://vuejs.org). You might not have ever seen [NativeScript](https://nativescript.org/) (TNS), which is an open source framework for building truly native mobile apps with Angular, Vue.js, TypeScript, or JavaScript, which compiles to iOS or Android applications; it's fine, we'll be a little more detailed about it and you can read its documentation for any details you need. We are adopting it because [it provides integration with VueJS](https://nativescript-vue.org/) and we can share most of our code between Web and Native versions of the application, changing only the interface code. This solves a major problem of keeping web, iOS and Android versions of the same application and avoid maintaining three different code bases. With this approach we maintain a single code base, with two different view templates, HTML and TNS. It becomes closer to maintaining a web responsive application.

The frontend part of this book is about how to structure your code and how to solve the most common problems that we often face.

## Mobile: Native JS, PWA or HTML Wrapper?

There are three major ways to provide an application for mobile devices:

- **PWA**: Progressive Web App. Supported both on iOS and Android, they allow you to install a pure web HTML5 application to the device which can run even if offline. They do not require app stores, and essentially let you add a icon to the home screen of the device. The advantage is that they require very little to convert an existing SPA to work with. The disadvantage is that they are essentially the same as running your code on a browser, so you do not have a native performance or access to any APIs other than HTML5. You also have to install the app through the website, not through an app store. PWAs can also be installed to desktops. You can provide a PWA even if you have a native or HTML wrapped application.
- **HTML Wrapper**: this allows you to wrap your code into a native app, which will be available in app stores, using a wrapper such as [Cordova](https://cordova.apache.org/). It still runs HTML using the native web browser from your device, but you get access to native APIs through a JS wrapper, so it's a half-and-half solution. This can be a good solution in terms of cost/benefit, since you don't need to write a second view layer and yet you can get access to (and even write) native code through plugins. Any code specific to the app can be written in `if` or loaded by the bundler. The interface is pure HTML though, and you might run into trouble if you are mixing native widgets with HTML. We'll not cover Cordova in this book.
- **native apps from JS**: in this case you write your logic in JS (and share it with the Web version), but you have native rendering of the interface instead of HTML5. This makes your interface faster and you can easily integrate native widgets. You add considerable development time to design the native views, but much less than developing separate codes for iOS and Android in native languages, but with the same performance. You get access to native APIs straight from JS, and you still can write plugins using native code if you want.

Your choice should be based on the features you need on your application and how much time and money you are willing to spend. This books details how to build a Nativescript application, but we also have a section below explaining in more detail how to [setup PWA](#setting-up-pwa).

## Setup

This section explains the basic setup to create your project.

### Basic dependencies

We'll use [NodeJS](https://nodejs.org/) and [yarn](https://yarnpkg.com/) for the code in the frontend. Install them according to their instructions.

::: tip
We'll use `yarn` on this book, but of course `npm` would work just as well.
:::

### Setup the project

We will not follow the scaffolding from [the nativescript getting started guide](https://nativescript-vue.org/en/docs/getting-started/quick-start/). The reason is that it doesn't play well with the usual vue-cli setup to build the web version. Instead we follow [its other setup](https://nativescript-vue.org/en/docs/getting-started/code-sharing/) which is based on vue-cli and should be more familiar to most people, using [Webpack](https://webpack.js.org/) as a bundler.

In modern JS applications a bundler is used to generate the final `.js` and `.css`. Bundlers can process the scripts, use CSS pre-processors such as [SASS](https://sass-lang.com/) and [LESS](http://lesscss.org/), resize images automatically and more, minimize and uglify code and more. Webpack can use [Babel](https://babeljs.io/), a JS compiler that allows you to program with current JS features and generate browser-compatible JS. This comes at the cost of a compilation phase, but current bundlers can compile differentially, which makes them fast and not adding significant delays to compile code before testing. They also enable hot-reloading, so whenever you save your code it's compiled and updated on the browser immediately, without needing to refresh the page.

Let's create our application:

```shell
# we need vue-cli
$ yarn global add @vue/cli

# create the scaffolding
$ vue create our-client
# You should add babel and webpack when asked

# install nativescript
$ cd our-client
$ vue add vue-cli-plugin-nativescript-vue
```

Some questions will be asked. Fill with your correct app identifier. Prefer the history mode -- it is nicer the user and you can use the HTML5 history API:

```
? Enter a unique application identifier: org.yourcompany.yourapplication
? Use HTML5 history mode? (Default: hash mode) Yes
? Is this a brand new project? (Default: Yes) Yes
? Dual Native AND Web development experience or a Native only? (Default: Dual) Dual Native AND Web
? What type of template do you want to start with? (Default: Simple) Simple
```

At this point you should have the basic stuff to get started. Get a coffee while things are downloaded and compiled. Then you can run this:

```
# now you can serve the web application
$ yarn run serve:web

# now you can serve the mobile application
$ yarn run preview:android
# or
$ yarn run preview:ios
```

## How to build

We have several build targets, and our package.json shows this. If you are in a rush to see something in your web browser, `yarn serve:web` is what you want.

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

Our build uses Webpack and comes already configured from the project template. We'll have more to talk about this later on this chapter and [on the deployment chapter](./deployment.md).

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
  <dd>Directory for public files. Things here will be copied as they are to the deployment package</dd>
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

### Configuring our environment variables

There are a number of `.env` files in our main directory to set variables:

```shell
.env.local
.env.development.android
.env.development.ios
.env.development.web
.env.production.android
.env.production.ios
.env.production.web
```

We also have `.env.local` to provide variables shared for all build types. This allows you to easily set data that depends on which machine it's running and for all platforms, adapting it for development or production environments. We can set the urls, secrets and tokens there:

```js
VUE_APP_BASE_URL=http://localhost:8080
VUE_APP_API_URL=http://
VUE_APP_OAUTH_CLIENT_ID=2
VUE_APP_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxx
VUE_APP_GOOGLE_TOKEN=AIzxxxxxxxxxxxxxxxxx-xxxxxxxxxx
```

### Sharing Native and Web code

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

Notice the `web` and `native` attributes. Not all tags need both a web and a native version: the idea is to share the same code as much as possible. You can have the same `<script>` for both. If you need to have completely different versions of the files for template, script and style it's easier to create separate files, which will be loaded automatically according to the build. This is valid for vue or js files:

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

You'll end up with several minor functions like this which are useful all through your project. It's easier to add them to a mixin:

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

which you can load on `main.js`:

```js
import PageMixin from "~/modules/pagemixin";
Vue.mixin(PageMixin);
```

::: tip
One helpful way to setup this utility mixin is to write shared code directly on `pagemixin.js`, but separate platform specific in `pagemixinsub.js` and `pagemixinsub.native.js` files, which are included like in the example above. This pattern works whenever you want a base code that is shared between all architectures but with specific functions overriden.
:::

For example, you can have a single `this.confirm()` method available on all Vue components that returns a promise and works for web and native:

```js
// web version
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

Nativescript version:

```js
// nativescript version
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

### Customizing Webpack

The Vue scaffolding used in this project generates a `vue.config.js` file, which allows you to configure the build, including customizing Webpack. To add a new plugin to Webpack, add it to the file:

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [new MyAwesomeWebpackPlugin()],
  },
};
```

## Setting up PWA

[PWA is documented on MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). We'll sketch how to create a PWA here. If you don't want a PWA, skip this section.

### PWA with Vue

It's not difficult to set a PWA. PWAs are not built in separate, they are part of the main Web build. You only need to add a few extra things. For the quick road, there's a [vue core plugin](https://cli.vuejs.org/core-plugins/pwa.html) to add PWA support automatically to your build, which is the way we recommend.

```shell
vue add pwa
```

This will include all that's necessary and builds will generate the manifest file and a service worker for you. You need to change `vue.config.js` to provide your configuration:

```js
// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "My App",
    manifestOptions: {
      short_name: "MyApp",
    },
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-144x144.png",
    },
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // ... other options
  },
};
```

Fill [the config values](https://cli.vuejs.org/core-plugins/pwa.html#configuration) according to your app. Note that the service worker added with this plugin is only enabled in the production environment. The plugin can generate a SW for you (with the `pwa.workboxPluginMode: 'GenerateSW'` option) or you can override it with your own service worker.

### Inside PWAs

The vue PWA plugin can handle everything itself, but let's see a bit more of what a PWA requires if you want a inside view. You can safely skip this section if you don't care about details.

First of all, PWAs require a [manifest file](https://developer.mozilla.org/en-US/docs/Web/Manifest). This is a JSON file:

```json
{
  "name": "My application Name ",
  "short_name": "MyApp",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "My application does this.",
  "icons": [
    {
      "src": "images/touch/homescreen48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    // ...
    {
      "src": "images/touch/homescreen192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=xxxxxxxx"
    }
  ]
}
```

A manifest provides basic information about your application, like name and icons. It's a good idea to create a manifest even if you don't want to create a PWA, since you can customize a few features of the mobile web browsers, such as the browser header color. You can add a splash screen to the PWA as well, and also link to a real native application, as shown above. You should link the manifest in your `index.html`:

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

The core difference of a PWA is [running a service worker](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers) even offline. This can be used to cache content (so you work offline), which we will not cover in this book, and receive [push notifications](./pushcommunication.md). You need to register your SW in `main.js`:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

To make a PWA installable you'll need:

- A web manifest, with the correct fields filled in
- The web site to be served from a secure (HTTPS) domain
- An icon to represent the app on the device
- A service worker registered, to allow the app to work offline (this is required only by Chrome for Android currently)

Once the user accesses a PWA, you'll be responsible to showing him some way to install the PWA, although Google Chrome now shows a button under certain circumstances. There's a [guideline on good practices to promote PWA installation](https://web.dev/promote-install/). You can control it from your code with the `beforeinstallprompt` and `appinstalled` events, which are [fully described here](https://web.dev/customize-install/).
