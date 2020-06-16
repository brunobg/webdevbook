# Push communication

It's common these days to get notifications from the server for things like new messages or other events. The two most used forms to get data from the server by push and not polling are the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) and the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). They are different technologies with very different applications.

Websockets work by maintaining a two-way communication session between the server and the client. A socket is open at all times. This is very useful for data heavy applications that continuously need to receive data from the server and in real time, such as chats. It requires a websocket server in addition to the web server. You can transmit large amounts of data with websockets, and actually do all communication with the server through them instead of HTTP for your API calls.

Web Push, on the other hand, allows you to receive small payloads of data asynchronously. You do not need to run anything else in your server. It uses service workers to process the asynchronous data received. The advantage is that you can receive events even if there's no tab running your application, allowing push notifications. The user must explicitly allow push notifications, though, which is a source of friction.

## Web Push

To use WebPush

TODO

## Websockets

Websockets require a [websocket server running on the backend](../backend/pushcommunication.md).

[Socket.io](https://socket.io/) is the most widely deployed library for WebSockets. It also supports other connection modes, such as long-polling. It handles most of the annoying things of WebSockets and abstracts it with a simple API. Socket.io allows you to declare callbacks for events:

```js
// watch for socket to emit a message and process it
socket.on("myMessageType", (data) => {
  doSomethingWith(data);
});
```

There are quite a number of socket.io tutorials on the internet, besides their own documentation. So let's just see quickly how to instantiate them and follow with a discussion of how to best integrate the async events to the application as a whole.

```js
import io from "socket.io-client";
import SocketEvents from "../../../server/socketEvents";

const Connection = {
  socket: null,

  log(text) {
    // show information or log here.
  },

  /**
   *
   * @param {String} server The server URL to connect
   *
   */
  connectServer(server) {
    // reconnect if called twice
    if (this.socket) {
      this.socket.close();
      delete this.socket;
      this.socket = null;
    }

    return new Promise((resolve, reject) => {
      this.log("Connecting to " + server);

      // connect
      this.socket = io.connect(server, {
        transports: ["websocket", "polling"],
      });

      /*
       * These are the socket basic events
       */

      this.socket.on("connect", () => {
        resolve();
      });

      this.socket.on("connect_timeout", () => {
        this.log(
          `Connection with ${server} timed out. We will try again in a while.`
        );
      });

      this.socket.on("connect_error", (err) => {
        this.log("Connection error:" + err);
        reject("Connect error");
      });

      this.socket.on("error", (err) => {
        this.log("Error" + err);
      });

      this.socket.on("disconnect", () => {
        this.log("Disconnected");
      });

      this.socket.on("reconnecting", () => {
        this.log(`Connection with ${server} failed, trying to reconnect.`);
      });

      this.socket.on("reconnect", () => {
        this.log("Reconnected");
      });

      /*
       * Our events
       */
      this.socket.on(SocketEvents.SOME_EVENT, (data) => {
        // fill with your code
      });
    });
  },
};

export default Connection;
```

Since I've seen a few bugs from typos in the message names, I prefer to define a common file for server and client enumerating the event names, which also allows autocomplete.

```js
export default {
  SOME_EVENT: "SOME_EVENT",
};
```

Regarding the architecture to handle the events, our possibilities are described below.

### Trigger events on a bus

We can trigger frontend events from the Connection class with an event bus. These would be listened in the proper places like any global JS event, and the listener on/off would be handled locally.

The `EventBus` is created in a separate file:

```js
import Vue from "vue";
const EventBus = new Vue();
export default EventBus;
```

You can listen to it in any part of your code:

```js
import EventBus from "EventBus";

// ...
EventBus.$on(SocketEvents.SOME_EVENT, (data) => {
  // process the event here
});
```

Remember you need to call `EventBus.$off` if the component is destroyed.

With this approach the `Connection` class becomes a proxy, doing things like:

```js
this.socket.on(SocketEvents.SOME_EVENT, (data) => {
  EventBus.$emit(SocketEvents.SOME_EVENT, data);
});
```

You can even use a catch-all middleware on socket.io to automatically redirect every event to the bus.

### Handle events on Vuex

If your data is on Vuex you can add a plugin to handle all websocket communication transparently there. The idea is that you commit mutations whenever data is received by the socket, and subscribe to mutations. The basic code looks like this:

```js
import Connection from "Connection";

export default function createWebSocketPlugin(socket) {
  return (store) => {
    socket.on(SocketEvents.SOME_EVENT, (data) => {
      store.commit("receiveData", data);
    });
    store.subscribe((mutation) => {
      if (mutation.type === "OTHER_EVENT") {
        socket.emit(SocketEvents.SOME_EVENT, mutation.payload);
      }
    });
  };
}

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [createWebSocketPlugin(Connection.socket)],
});
```

The advantage of this solution is that storage is centralized and any changes are automatically sent to the server, which makes it interesting for applications that need constant synchrony between client and server data.

Alternatively you can split the vuex and websocket codes in different files by dispatching. On your socket code you route the event:

```js
this.socket.on(SocketEvents.SOME_EVENT, (data) => {
  store.dispatch(SocketEvents.SOME_EVENT, data);
});
```

and you provide actions in the store to get it:

```js
{
  actions: {
    [SocketEvents.SOME_EVENT] ({ commit }, data) {
      commit(SocketEvents.SOME_EVENT, data);
    }
  },
  mutations: {
    [SocketEvents.SOME_EVENT] (state, data) {
      // do somethng here on state with data.
    }
  }
}
```

### Handle code on a single component

This approach works well only for small applications that have a main entry point that handles most of what is happening. For example, let's write a very basic standalone chat widget for websites. It's `App.vue` would be something like this:

```vue
<template>
  <div>
    <ul>
      <li v-for="message in chat">
        {{ message }}
      </li>
    </ul>
    <form v-on:submit.prevent="typed">
      <input type="text" v-model="text" />
    </form>
  </div>
</template>
<script>
import Connection from "Connection";

export default {
  data() {
    return {
      chat: [],
      text: ''
    };
  },

  created() {
    Connection.connectServer('https://example.com/chat')
    .then(
      ()) => {
        this.setCallbacks();
      }
    );
  },

  methods: {
    typed() {
      Connection.socket.emit(SocketEvents.CHAT_MESSAGE, this.text);
      this.chat.push(this.text);
      this.text = '';
    },

    setCallbacks() {
      // when we get a message append it to chat
      Connection.socket.on(SocketEvents.CHAT_MESSAGE, (message) => {
        this.chat.push(message);
      });
      // other socket events would come here
    }
  },
};
</script>
```

Since all data is handled in this component, you can setup all the socket events in a method of this class. This might work well even in larger applications but when just one component does all the communication.
