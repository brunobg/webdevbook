# State and storage

Software is hard because we have to keep state. That is why pure functions are good -- we are sure they are not changing anything else and are completely isolated. In the frontend we have to keep states:

* *global states*, such as the logged user information.
* *local states*, such as data for the page that the user is currently reading.

We'll store local states on each Vue page component, and use [Vuex](https://vuex.vuejs.org/) to store the global state. Some people use Vuex to store everything. This allows you to cache requests easily and access data from different components. On the other hand, cache invalidation is a difficult problem. Our approach will be more conservative at the cost of performing more requests, and we'll talk about [caching strategies](./caching.md) later.

Vuex is a state management pattern and library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It integrates nicely with the devtools extension, too, making it easy to debug. Vuex works on both the native and web versions, but long term storage is different for each of them. Unless you are fine with making the users login each time they open the app, we need to implement local storage to remember them.

We'll add a little wrapper like this:

<dl>
  <dt>store.js</dt>
  <dd>Web version of the Vuex creation.</dd>
  <dt>store.nativejs</dt>
  <dd>Native version of the Vuex creation.</dd>
  <dt>storedata.js</dt>
  <dd>Vuex store data, which is shared by both the web and native code.</dd>
</dl>

The `store` files only differ because the permanent storage methods are different, and we cannot `import` plugins conditionally. 

The web version looks like this, using [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) to save data in local storage.

```js
import Vue from "vue";
import Vuex from "vuex";
import storedata from "./storedata";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    ...storedata,
    plugins: [createPersistedState({
        key: 'storev1',
        paths: ['user']
    })],
});
```

Notice that we are using too arguments for the persisted state:

* *key*: we might change our data in a way that is incompatible with the previous version at some point. By using a key we can ensure that we are not using old, now invalid data. 
* *paths*: here we choose which data is persisted. This allows us to use Vuex to cache data temporarily. 

The native version is similar, but using another

```js
import Vue from "vue";
import Vuex from "vuex";
import storedata from "./storedata";
import NSVuexPersist from "ns-vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
    ...storedata,
    plugins: [NSVuexPersist(["user"], 'storev1')],
});
```