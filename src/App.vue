<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
body {
  overflow: hidden;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

html, body {
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar, body::-webkit-scrollbar {
  width: 0;
  height: 0;
}



</style>
