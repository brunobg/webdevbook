# Routing

The most radical change of SPAs is to route through Javascript, replacing the content without a request for a new base HTML file. This means that we must implement routing in the frontend (and [also in the backend](../backend/routing.md)). Routing means that the page loads its content based on the URL, and whenever a link or action takes it to a new page, the URL is replaced on the browser with Javascript and the new content is loaded.

We'll need a few tricks here since vue-router handles things slightly different than the TNS router does. We'll build a wrapper to get around that and have the same behavior in our end code, at the cost of a more complicated code behind the scenes.

## Web routing with vue-router

[Vue-router](https://router.vuejs.org/) is the standard router for vue. Let's install it.

```shell
yarn add vue-router
```

Our router essentially maps URLs to components. We add a behavior to ensure that scroll is maintained on each page when we navigate back and forward, and we also update the document title to match the page name.

```js
import Vue from "vue";
import Router from "vue-router";
import * as views from "./views/";
import * as viewsWeb from "./views/web/";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: viewsWeb.Main,
    },
    // add all your routes here.
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name + " - My Site";
  } else {
    document.title = "My Site";
  }
  next();
});

export default router;
```

Vue-router is flexible and enables multiple callbacks before and after routing. You can also provide a 404 page. In the [authentication chapter](./authentication.md#routing-and-authenticated-pages) we'll extend this code to ensure that pages that require authentication are blocked to unauthenticated users.

The router must be passed to the application when it is initialized, in main.js.

```js
import router from "./router";

// ...
new Vue({
  store,
  router,
  render(h) {
    return h(App);
  },
}).$mount("#app");
```

## Native routing in TNS

There is nothing to configure on Nativescript for routing. Vue router is not supported at this time, so we'll show how to do [manual routing](https://nativescript-vue.org/en/docs/routing/manual-routing/). But there's a [navigator plugin](https://github.com/nativescript-vue/nativescript-vue-navigator) that is similar to vue-router and you can use it if you prefer.

In this case we'll have a single Frame to navigate, but more complex applications might have more than one. Two articles
[this](https://nativescript.org/blog/getting-your-route-on-with-nativescript-vue-episode-one/) and
[this](https://nativescript.org/blog/getting-your-route-on-with-nativescript-vue-episode-two/), talk more about NSVue routing.

TODO

## Unified internal navigation

Native navigation is usuallya bit easier than the web. This is because apps tend to have more control about what can be done. While in websites you can navigate to the home page multiple times, having several copies of it in the history, in apps we usually don't allow that. If you go back to home it's because you collapsed the history stack, not because you added it on top of the stack.

For internal navigation, use `<router-link>` on the HTML:

```html
<router-link to="/post"></router-link>
```

You can also navigate with JS, which is the only way to do it on the Native version.

TODO

```js
this.navigate(Home, "/home");
```

### Resetting the stack on mobile

TODO

### Handling pages that should not stay in history

One advantage of manual routing is that you can navigate to pages that are not added to the stack, so when you navigate away from it they disappear:

```js
this.navigate(PostEdit, "/post/edit", { backstackVisible: false });
```

This is perfect when you go through a form page. Once the item is created and the user navigates to its page, the form page is not in the stack, so if he navigates back he'll go straight to the previous page he was.

## Bundles

TODO
