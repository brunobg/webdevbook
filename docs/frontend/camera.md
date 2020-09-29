# File upload and camera

Uploads have been part of websites for a while, and the frontend possibilities grew over the years. These days it's possible to select multiple files to upload, preview files before uploading, upload with AJAX, show a progress bar, paste files, select files from the gallery or camera in mobile devices, directly open a camera to take a picture... It's a long list. And probably no other HTML API changed as much over time as the Camera API. Of course, the native API is completely different, so once again we'll add a wrapper to homogenize things.

## The UX of uploading

Uploading is a different operation than most in web applications, because you make users think about its own device. They have to select a file to upload, which makes them navigate through local menus or want to do things more naturally, like "I have the picture here, why can't I drag and drop it" or "it's in the gallery, why is it opening the camera".

Here are a few guidelines for a good UX:

- Show a preview when uploading pictures if it's part of a larger form. This will allow the user to see if they got the correct file before they submit it.
- If possible, try to upload the file as soon as it's selected. This is more responsive and users don't have to wait for after they submit.
- Take advantage of things like the [accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept), so users can more easily select their files.
- Uploads are quite different in mobile and desktop. The entire interface changes. Make sure you design for and test in both and make them natural. In desktop people want to select a file from folders, paste or drag and drop. In mobile they'll want to use the camera or get something from the gallery.
- Don't forget to validate files. It's possible to do some validation in the browser these days, which makes for a better UX.

## Camera access from web

Of course, even in the web, we have a slightly different way to handle mobile and desktop browsers again. Mobile browsers can access the camera and gallery straight from HTML. On desktop we need to show a preview with the Camera API instead.

```html
<section>
  <b-field class="file" :message="'Any images to attach? Optional' | translate">
    <input
      type="file"
      v-model="file"
      capture="camera"
      accept="image/*"
      id="cameraInput"
      @input="onFileChange"
    />
    <a class="button is-info">
      <b-icon icon="upload"></b-icon>
      Click to upload
    </a>
    <span class="file-name" v-if="file">{{ file.name }}</span>
  </b-field>
  <div id="preview">
    <img
      v-if="pictureFromCamera"
      :src="pictureFromCamera"
      width="100%"
      height="auto"
    />
  </div>
</section>
```

```js
export default {
  methods: {
    openCameraPreview() {
      // Grab elements, create settings, etc.
      let video = document.getElementById("video.preview");

      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
          });
      } else {
        this.alert("Could not open your camera");
      }
    },

    shoot() {
      // Elements for taking the snapshot
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext("2d");
      let video = document.getElementById("video.preview");

      // Trigger photo take
      context.drawImage(video, 0, 0, 800, 800);
    },
  },
};
```

## Camera access with Nativescript

Let's use TNS camera plugin:

```shell
tns add nativescript-camera
```

## Drag and drop

## Paste from clipboard

https://developers.google.com/web/fundamentals/media/capturing-images
