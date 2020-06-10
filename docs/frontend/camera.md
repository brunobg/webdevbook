# Camera

I don't think any HTML API changed as much as the Camera API. Of course, the native API is completely different, so once again we'll add a wrapper to homogenize things.

## Web

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
      <translate>Click to upload</translate>
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

## Nativescript

Let's use TNS camera plugin:

```shell
tns add nativescript-camera
```
