# Communication with the backend

This section is about how you fetch and send data to the backend. This is about polling data; we'll leave [push communication](./pushcommunication.md) to a later chapter. The details of chapter therefore depend on how our backend works. Although we use a REST API in this chapter, GraphQL or any other kind of API would work replacing the fetch/process calls.

We'll talk about [mocking on the test chapter](./testing.md#mocking).

## Authenticate communication with a Bearer token

After the user logins a Bearer token will be stored. We'll use that to authenticate our remote calls. The same principle will also work with JWTs.

What we want is to generate proper headers for the remote call:

```js
function headers() {
  const h = {
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  if (vue.$store.state.user.token.access_token) {
    h["headers"]["Authorization"] =
      "Bearer " + vue.$store.state.user.token.access_token;
  }
}
```

If you are using `axios` you can setup the authentication as a default option:

```js
// Default config options
const defaultOptions = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  credentials: "include",
  mode: "cors",
};

let axiosInstance = axios.create(defaultOptions);

// Set token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = vue.$store.state.user.token.access_token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// ...
axiosInstance.get("...");
```

## To Vuex or not Vuex

There's a pattern to fetch data directly in Vuex, as one of its actions. The basic structure is this:

```js
const store = new Vuex.Store({
  modules: {
    user: {
      state: {
        user: {}
      },
      mutations: {
        FETCH_USER(state, user) {
          state.user = user;
        }
      },
      actions: {
        fetchUser({ commit }) {
          return axios("https://example.com/rest/me")
            .then((response) => {
                commit("FETCH_USER", response.data);
            });
          });
      }
    }
  }
});
```

And you call it like this:

```js
this.$store.dispatch("fetchUser").then(() => {
  // data is available on vuex
});
```

This avoids an independent fetch/commit in your code, and makes Vuex handle all the communication. You could even route it through you communication class instead of directly making the request in Vuex.

## Sending images and other binary data
