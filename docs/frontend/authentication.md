# Authentication

You'll likely need users to authenticate on your app. There are currently a few choices for telling a server who the user making a request is:

- _sessions with cookies_. You store a cookie on the browser when the user logins. Every request sends this cookie automatically. This is prone to CSRF attacks and does not play very well with native apps. These were widely used a few years ago.
- _JWT (JSON web tokens)_. This is a standard to represent data securely between parties and verify claims. You store data about the client (such as user name and id) on a JSON structure, which is encoded and signed or encrypted. The advantage here is that you can store information, which might be interesting for microservices, as it contains verifiable data and can avoid a DB hit. JWTs have a lifetime in it, and so need to be renovated periodically. JWTs are not easy, however, to be individually revoked; you either need to check them against the DB and therefore lose one of its great advantages, or you need to provide short-lived JWTs which are renovated often. It avoids CSRF attacks since the browser does not send it automatically.
- _a bearer token_. This is a simple string that is used for authorization, usually sent as an extra header. It's essentially a key that is looked up on a database or cache to get the user information. It avoids CSRF attacks since the browser does not send it automatically, and are easy to revoke, but require some form.

For the frontend JWT and bearer tokens are very similar, since in both cases you send them as part of your requests. We'll show how to implement a bearer token authorization for this app, both with local logins and with 3rd party OAuth logins.

### Designing a good login/sign up form

Avoid too many fields in your sign up form. Ideally your application will require only email and password (or the OAuth login). Are you sure you need a unique username? If you do, add that. Every extra field you add makes people more prone to give it up because there's too much to fill.

Remember that social logins often have branding guidelines, like [Google](https://developers.google.com/identity/branding-guidelines). Follow them when implementing your buttons.

## Local logins

A local login does not validate against a third party; you use an email or unique user name and a password to validate against your database and authorize the user. It's a bit simpler to implement, but the user has to create another account for your service, with another password and so on. It adds friction.

### Sign ups/registration

Our registration flow is like this.

1. validate user data on the client and show any errors
1. request user registration on the server. User is created on the server, check for errors
1. perform the login flow on the server.

By separating in two steps, one for registration and another for login, we ensure that any changes to the login procedure (such as processing user data to do something on the app) are performed exactly the same on the registration and avoid maintaining two paths.

TODO

### Login

Our login will work like this:

1. send a login request to the server with the username and password.
1. get the user data back or an authentication error.
1. [store user data](./stateandstorage.md)
1. navigate to the home page or the user page. If your login is in a modal, you can refresh the page instead by emitting an event.

```js
login() {
    this.processing = true;
    this.rest()
        .login(this.user.email, this.user.password)
        .then(() => {
            return this.rest().userMe();
        })
        .then((data) => {
            this.processing = false;
            this.$store.commit("updateUser", data);
            this.navigate(Home, "/home", {clearHistory: true});
        })
        .catch((error) => {
            this.processing = false;
        });
}
```

The actual rest call is here:

<x<x< @ /../client/src/modules/rest.js#login-local

## OAuth

OAuth is a protocol to authorize services securely. Imagine you have a friend that wants to use your account service. If you give her your password, she will have access to your entire account and be able to do anything; but you only want her to be able to watch movies, not see your billing information. OAuth comes to solve this kind of problem, between computers. Its most common use is to authenticate users through a 3rd party -- such as Google or Facebook.

OAuth requires integration from the backend and frontend. If you are using a different backend than the one described in this book you may need a different approach than the one described here -- but the idea is always the same. While you can use OAuth without involving a backend, we still need to create the user in our database if he never logged in before, and we need to authorize him on our server to fetch his data.

You don't need to understand much of the OAuth protocol to use it, but [here's a detailed introduction to OAuth 2.0](https://oauth.net/getting-started/) if you are curious.

Remember to fill `VUE_APP_OAUTH_CLIENT_ID` (usually 2), and you can `VUE_APP_OAUTH_CLIENT_SECRET` [from your server](../backend/authentication.md#setup) on your `.env.local` file. In this example we'll use Google for our authentication. We get our Google id from `process.env.VUE_APP_OAUTH_GOOGLE_CLIENT_ID` in our `.env.local` file. Get one from [Google](https://console.developers.google.com/).

### Web

Let's use [vue-social-auth](https://github.com/diadal/vue-social-auth), as it handles Vue and [Socialite](https://socialiteproviders.netlify.app/) in the backend. `main.js` includes it:

<x<x< @ /../client/src/main.js#oauth

All the OAuth code goes to `components/LoginExternal.vue`. The main flow is simple to follow:

```js
AuthProvider(provider) {
  // authenticate throught the plugin
  this.$auth.authenticate(provider)
  .catch((e) => {
    if (e.message == "Auth popup window closed") {
      // user gave up with logging in
      throw new Error("Ok");
    }
  })
  .then(response => {
    // we are authenticated, so let's register on the server
    return this.rest().registerSocial(provider, response);
  })
  .then((data) => {
    // server returned our data. let's go home.
    this.navigate(Home, "/home", {clearHistory: true});
  });
},
```

`registerSocial()` validates on the backend, which creates the user if necessary. It gets user data and token, storing on Vuex. This is all we need on the frontend.

### Nativescript

TODO
`nativescript-oauth`

### Asking the user for more data

Occasionally you need more data from the user than the OAuth provider returns to complete the registration. For example, you might need their physical address or a choice of account type. On a regular registration with local login you just add all the fields to the registration form, but with OAuth you don't have this possibility.

You can handle it with this flow:

1. make the authentication with the provider
1. call the backend with the OAuth data. Create the user on the backend with empty data for the extra fields.
1. open a modal dialog with the form for the extra data you need.
1. send the extra data as an update to the backend.
1. finish the login flow on the frontend.

## Logout

Since we are using a standard for the authentication in the frontend, logout is the same for both OAuth and local logins. We want to:

1. notify the server (optional, but so it can invalidate the token)
1. clear user data storage
1. navigate to the main/login page

We implement logout like this:

```js
logout() {
  let p = this.fetch(`/me/logout`, {
      data: '',
      method: "POST",
  });
  vue.$store.commit("logout");
  return p;
}
```

Notice that we actually commit a logout on Vuex while the backend request is still happening. The reason is that if we have some problem with the backend or network we still let the user logout and erase their credentials from the device. The server might have a lingering token in this case. If you absolutely need to revoke the token on the server, make sure to commit in a `then()` callback.

## Routing and authenticated pages

Not all pages of an application should be accessible from unauthenticated users. We'll use the vue router to control which pages are accessible and which are not. Web applications have unique URLs that can be accessed at any time.

Going [back to our router](./routing.md), we extend the data structure with a `meta` field:

```js
const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Main",
            component: viewsWeb.Main,
            meta: {
                unauthorized: true
            }
        },
//...
```

Pages that can be accessed without authentication have the `unauthorized: true` field. This is checked on each route execution on `beforeEach`:

```js
// checks meta.unauthorized
router.beforeEach((to, from, next) => {
  const isLogged = store.state.user.id > 0; // check if store has an authenticated user

  if (!to.meta.unauthorized && !isLogged) {
    // user is not authenticated
    next({ path: "/login", params: { redirect: to.path } });
    return;
  }

  next();
});
```

We provide a param to the login path, enabling us to redirect the user to the chosen page after the login is performed.

### Native

In the native version we have full control of the application and users cannot access a random page ordinarily. If your app supports [universal links](https://market.nativescript.org/plugins/nativescript-plugin-universal-links), you'll have to provide a callback function. You can check on this callback if the user needs to be authenticated and route him to a login page or the chosen page.
