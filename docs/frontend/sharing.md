# Sharing

Sharing to social networks and other sites is a basic functionality these days. Unfortunately it's handled differently by desktop browsers, mobile browsers and native applications. So let's handle all cases:

1. On native we'll use the OS native interface [through a plugin](https://www.npmjs.com/package/nativescript-social-share).
2. On browsers [that support it we'll use the share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share). Notice that it requires a secure context to work.
3. On the other browsers we'll use pure JS to handle it and send to a social network.

We'll wrap all this under one interface so we can just add a `Share` button anywhere in the site and have it work.

## NativeScript

The [TNS share plugin](https://www.npmjs.com/package/nativescript-social-share) is simple to use. Let's define a share button like this:

```shell
vue add nativescript-social-share
```

We can create a component for a share button:

```html
<template native>
  <button @tap="shareUrl" class="btn m-t-20">
    <FormattedString>
      <span
        text.decode="&#xf1a0;"
        class="nt-icon fab"
        style="margin-right: 5px"
      ></span>
      <span :text="'Share' | translate" v-if="!buttonText"></span>
      <span :text="buttonText"></span>
    </FormattedString>
  </button>
</template>
<script native>
  const SocialShare = require("nativescript-social-share");

  export default {
    props: {
      link: {
        default: "",
      },
      title: {
        default: "My site name",
      },
      description: {
        default: "",
      },
      quote: {
        default: "",
      },
      hashtags: {
        default: "mysite",
      },
      buttonText: {
        default: "",
      },
    },
    methods: {
      shareUrl() {
        if (this.link) {
          SocialShare.shareUrl(this.link, this.title);
        } else {
          SocialShare.shareText(this.title);
        }
      },
    },
  };
</script>
```

The two bottom `Span` tags allow us to use a default text with [i18n](./i18n.md). There's a simple icon. A few of the props are not used at this time, as quote and hashtags are not supported by the `SocialShare` plugin, but we'll keep the same interface from the web version. `SocialShare` also lets you share images.

## Browser

Now, sharing with a browser is extremely annoying at this time. We need to check if the browser supports share and, for images, check if it supports sharing images and converting images to a buffer to export.

We end up with a code like this:

```js
export default {
  methods: {
    /**
     * Shares on social media.
     *
     * @param {String} message A text message to share
     * @param {String} url A URL to share. Optional.
     * @param {String} file A file to share. Optional.
     * @param {Function} polyfill If the share API is not present, calls a polyfill of your own.
     * @return {Promise} The result.
     */
    share(message, url, file, polyfill) {
      if (navigator.share) {
        if (file && navigator.canShare) {
          return fetch(file) // get image
            .then(function (res) {
              return res.arrayBuffer();
            })
            .then(function (buf) {
              // convert to file object
              return new File([buf], "share.jpg", { type: "image/jpeg" });
            })
            .then((fileObj) => {
              // see if we can share
              if (navigator.canShare({ files: [fileObj] })) {
                return navigator.share({
                  text: message,
                  title: "My site name",
                  files: [fileObj],
                });
              } else {
                return Promise.reject("no share");
              }
            })
            .catch(() => {
              return navigator.share({
                text: message,
                title: "My site name",
                url: url,
              });
            });
        } else {
          return navigator.share({
            text: message,
            title: "My site name",
            url: url,
          });
        }
      } else {
        return polyfill();
      }
    },
  },
};
```

We use `polyfill()` to load a JS/HTML code to share on social networks using a popup or similar. There are a lot in the wild, and [vue-social-sharing is one that works well with Vue](https://github.com/nicolasbeauvais/vue-social-sharing#demo).
