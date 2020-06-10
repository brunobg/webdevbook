# Authentication

You'll likely need users to authenticate on your app. There are currently a few choices for telling a server who the user making a request is:

* *sessions with cookies*. You store a cookie on the browser when the user logins. Every request sends this cookie automatically. This is prone to CSRF attacks and does not play very well with native apps. These were widely used a few years ago.
* *JWT (JSON web tokens)*. This is a standard to represent data securely between parties and verify claims. You store data about the client (such as user name and id) on a JSON structure, which is encoded and signed or encrypted. The advantage here is that you can store information, which might be interesting for microservices, as it contains verifiable data and can avoid a DB hit. JWTs have a lifetime in it, and so need to be renovated periodically. JWTs are not easy, however, to be individually revoked; you either need to check them against the DB and therefore lose one of its great advantages, or you need to provide short-lived JWTs which are renovated often. It avoids CSRF attacks since the browser does not send it automatically.
* *a bearer token*. This is a simple string that is used for authorization, usually sent as an extra header. It's essentially a key that is looked up on a database or cache to get the user information. It avoids CSRF attacks since the browser does not send it automatically, and are easy to revoke, but require some form.

We'll show how to implement a bearer token authorization for this app, both with local logins and with 3rd party OAuth logins.

## Designing a good login/sign up form

Avoid too many fields in your sign up form. Ideally your application will require only email and password (or the OAuth login). Are you sure you need a unique username? If you do, add that. Every extra field you add makes people more prone to give it up because there's too much to fill.


## Local logins

A local login does not validate against a third party; you use an email or unique user name and a password to validate against your database and authorize the user. It's a bit simpler to implement, but the user has to create another account for your service, with another password and so on. It adds friction.

### Sign ups/registration

Our registration flow is like this.

1. validate user data on form
1. request user registration on the server. User is created on the server, check for errors
1. perform the login flow on the server.

By separating in two steps, one for registration and another for login, we ensure that any changes to the login procedure (such as processing user data to do something on the app) are performed exactly the same on the registration and avoid maintaining two paths.

### Login

Our login will work like this:

1. send a login request to the server
1. get the user data back or an authentication error
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

```


## OAuth

OAuth is a protocol to authorize services securely. Imagine you have a friend that wants to use your account service. If you give her your password, she will have access to your entire account and be able to do anything; but you only want her to be able to watch movies, not see your billing information. OAuth comes to solve this kind of problem, between computers. Its most common use is to authenticate users through a 3rd party -- such as Google or Facebook. 

While you can use OAuth without involving a backend, we still need to create the user in our database if he never logged in before, and we need to authorize him on our server to fetch his data. We'll explain how to do both.

## Logout

Since we are using a standard for the authentication in the frontend, logout is the same for both OAuth and local logins. We want to:

* notify the server (optional, but so it can invalidate the token)
* clear user data storage
* navigate to the main/login page

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
        next({ path: '/login', params: { redirect: to.path } });
        return;
    }

    next();
});
```

We provide a param to the login path, enabling us to redirect the user to the chosen page after the login is performed.

### Native

In the native version we have full control of the application and users cannot access a random page ordinarily. If your app supports [universal links](https://market.nativescript.org/plugins/nativescript-plugin-universal-links), you'll have to provide a callback function. You can check on this callback if the user needs to be authenticated and route him to a login page or the chosen page.


