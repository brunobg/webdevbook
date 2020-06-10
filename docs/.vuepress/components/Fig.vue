<template>
  <figure>
    <img :src="src" :alt="caption"/>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
        required: true,
    },
    
    caption: {
        default: ''
    }
  }
}
</script>

<style scoped>
figure {
  margin: 0 auto;
  text-align: center;
}
figcaption {
  font-style: italic;
}
</style>