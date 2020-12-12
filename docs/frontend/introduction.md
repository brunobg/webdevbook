# Introduction

So you want to build the frontend for a web application and possibly a native mobile or native desktop version as well. You don't want to implement three different versions in three different languages, for Web, Android and iOS. This book will explain one way to implement the entire frontend in JS, using HTML5 for web and Nativescript bindings for native apps. You can also ignore the Nativescript parts of the book if you are designing a pure HTML application with no prejudice at all.

We assume that you have some familiarity with Javascript and [VueJS](https://vuejs.org). You might not have ever seen [NativeScript](https://nativescript.org/) (TNS), which is an open source framework for building native mobile apps with Angular, Vue.js, TypeScript, or JavaScript, which compiles to iOS or Android applications; it's fine, we'll be a little more detailed about it and you can read its documentation for any details you need. We are adopting it because [it provides integration with VueJS](https://nativescript-vue.org/) and we can share most of our code between Web and Native versions of the application, changing only the interface code. This solves a major problem of keeping web, iOS and Android versions of the same application and avoid maintaining three different code bases. With this approach we maintain a single code base, with two different view templates, HTML and TNS. It becomes closer to maintaining a web responsive application.

The frontend part of this book is about how to structure your code and how to solve the most common problems that we often face.

## Mobile: pure native, native JS, PWA or HTML Wrapper?

There are four major ways to provide an application for mobile devices:

- **PWA**: Progressive Web App. Supported both on iOS and Android, they allow you to install a pure web HTML5 application to the device which can run even if offline. They do not require app stores, and essentially let you add a icon to the home screen of the device. The advantage is that they require very little to convert an existing SPA to work with. The disadvantage is that they are essentially the same as running your code on a browser, so you do not have a native performance or access to any APIs other than HTML5. You also have to install the app through the website, not through an app store. PWAs can also be installed to desktops. You can provide a PWA even if you have a native or HTML wrapped application.
- **HTML Wrapper**: this allows you to wrap your code into a native app, which will be available in app stores, using a wrapper such as [Cordova](https://cordova.apache.org/). It still runs HTML using the native web browser from your device, but you get access to native APIs through a JS wrapper, so it's a half-and-half solution. This can be a good solution in terms of cost/benefit, since you don't need to write a second view layer and yet you can get access to (and even write) native code through plugins. Any code specific to the app can be written in `if` or loaded by the bundler. The interface is pure HTML though, and you might run into trouble if you are mixing native widgets with HTML. We'll not cover Cordova in this book.
- **native apps from JS**: in this case you write your logic in JS (and share it with the Web version), but you have native rendering of the interface instead of HTML5. This makes your interface faster and you can easily integrate native widgets. You add considerable development time to design the native views, but much less than developing separate codes for iOS and Android in native languages, but with the same performance. You get access to native APIs straight from JS, and you still can write plugins using native code if you want.
- **native apps**: these applications are written in programming languages that are compiled to the architectures and have full access to their APIs, such as Java and Kotlin for Android, and Objective C and Swift for iOS. There are approaches using a single language, such as using DART, with helpful tools like Flutter SDK, or 3D engines like Unity, which target different platforms when they compile. If you need access to a lot of APIs or very high performance this is the way to go.

Your choice should be based on the features you need on your application and how much time and money you are willing to spend. This books details how to build a Nativescript application, but we also have a section below explaining in more detail how to [setup PWA](#setting-up-pwa).

## Desktop applications

Since we are commenting about the different approaches to mobile, it's relevant that desktop applications can also be built from JS code. They pack a web browser with your code, and allow you to run local code with no restrictions to file access, networking, etc and be cross-platform, running on Windows, Mac and Linux. Popular ways to do this include [Electron](https://www.electronjs.org/) and [NWJS](https://nwjs.io), all based on Webkit and Chromium. The cons are: it's slower than native code, since you pack an entire web browser with your code it's going to be around 100MB for anything and consume a lot of memory. But it's portable, you can build very complex GUIs thanks to HTML and JS and they provide nice tools to pack and autoupdate applications. They're quite easy to use too. So in theory you can create apps for web, desktop and mobile with the same code base these days.

## Reactive frameworks

In the 2010s there was had a paradigm change in the development of JS applications. It moved from the old pure event based code, which was largely structured over JQuery to handle the lack of standardization between different browsers, to reactive programming, thanks to React, Vue, Angular and other similar frameworks that shook the world. Reactive programming itself dates from the 1980s.

The idea behind reactive programming is that changes to data generate a stream of events ordered in time, which are subscribed by listeners that react to these events. These frameworks not only implement this (which was previously available with other libraries, such as [ReactiveX](https://reactivex.io) and many others) but also implement several helpers to build and change the DOM easily (with templates) and with a great performance (by using a virtual DOM), and by making it easy to build components that can be reused. [React](https://reactjs.org), created by Facebook, helped to drive its revolution and is the most popular reactive framework. We chose VueJS for this book because it's simple to use, separates CSS/HTML/JS cleanly and has a very fast learning curve, but all the ideas here equally apply to React or other frameworks as well.