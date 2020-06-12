# Deployment

Deployment should be a one-step process at the most if you are not using CD, and zero-step if you are. We have three targets to our application; building all of them manually and deploying on your server and app stores is time consuming to do manually and error-prone.

:::tip
Write a script for building and another for deploying your application, which can be easily called by a CD tool.
:::

Ideally the building and deployment will be handled by your CI/CD tool.

## Setup

Uglifying makes your code more difficult to alter, smaller and sometimes even faster. The [terser plugin](https://github.com/webpack-contrib/terser-webpack-plugin) is part of the build system.

There are a number of things to configure in your first build, such as the [app name, launch screen and icons](https://docs.nativescript.org/tooling/publishing/publishing-android-apps). Nativescript provides documentation to do all of this.

## Building

### Web build

We need to build the application.

```shell
$ yarn version --patch  # you can use this command to bump version
$ yarn build:web # build it
```

The result will be in the `dist` dir. Deployment varies wildly according to your hosting and server, but you essentially need to copy the `dist` dir to the public directory of your webserver.

### Remote native builds with CI

There is a [https://github.com/NativeScript/nativescript-remote-builds](plugin for remote builds) that is compatible with [https://circleci.com](CircleCI) and enables cloud building.

TODO

https://github.com/NativeScript/nativescript-remote-builds/blob/master/docs/CIRCLECI.md

### Local Android

If you prefer to generate the Android release locally or on your build server, you also can. To generate the APK:

```shell
yarn run build:android
```

There is extensive documentation on [how to publish your Android app with NativeScript](https://docs.nativescript.org/tooling/publishing/publishing-android-apps). The command above will build the APK, but to distribute the app you'll also have to sign it:

```shell
tns build android --release --key-store-path <path-to-your-keystore> --key-store-password <your-key-store-password> --key-store-alias <your-alias-name> --key-store-alias-password <your-alias-password>
```

Google Play Store has an [API to upload and release APKs](https://developers.google.com/android-publisher/tracks), which allows you to deploy new versions from your deploy script, without human intervertion. [Check the libraries and sample code](https://developers.google.com/android-publisher/libraries) to get started.

### Local iOS

Remember that you can only build for iOS on an Apple computer.

```shell
yarn run build:ios
```

https://docs.nativescript.org/tooling/publishing/publishing-ios-apps

## OpenGraph tags and SPA

Our SPA client is completely standalone, and does not require a dynamic server. It can be served from any static HTTP server.

One disadvantage of this is that your meta tags on `<head>` are not dynamic either. This means that previews of your page from OpenGraph or similar tags are static -- most clients parse OpenGraph tags from the HTML, without running Javascript. There are a couple ways to handle this.

One is to use the [prerender SPA plugin](https://github.com/chrisvfritz/prerender-spa-plugin). This works well if you have a static content, but does not scale to hundres of routes or dynamic content.

For completely dynamic content, SSR is required. There's a [SSR guide from Vue](https://ssr.vuejs.org/). This is a backend problem, so we'll talk about it [on the backend](../backend/deployment.md).
