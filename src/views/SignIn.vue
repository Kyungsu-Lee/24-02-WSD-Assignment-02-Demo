<template>
  <div>
    <div class="bg-image" />
    <div class="container">
      <div
          class="signin-container body-container"
          :class="{
          'container-upper': view_mode_static === 'signin',
          'container-lower': view_mode_static === 'signup',
        }"
      >
        <h2>Sign in</h2>
      </div>
      <div
          class="signup-container body-container"
          :class="{
          'container-upper': view_mode_static === 'signup',
          'container-lower': view_mode_static === 'signin',
        }"
      >
        <h2>Sign up</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignInView',
  data() {
    return {
      view_mode_anim: 'signin',
      view_mode_static: 'signin',
    };
  },
  methods: {

  },
  mounted() {
    console.log('SignInView mounted');
    setInterval(() => {
      if (this.view_mode_anim === 'signin') {
        this.view_mode_anim = 'signup';
      } else {
        this.view_mode_anim = 'signin';
      }
    }, 5000);
  },
});
</script>

<style>
:root {
  --container-start-x: -50%;
  --container-end-x: -90%;
  --container-start-y: -58%;
  --container-end-y: -42%;
  --container-start-color: #ECECEC;
  --container-end-color: #100f0f;
}
</style>

<style scoped>
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}

.bg-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(27, 27, 27, 0.90);
}

.container {
  height: 100svh;
  width: 100svw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.body-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50svw;
  max-width: 80dvh;
  max-height: 70dvh;
  aspect-ratio: 3.35 / 4;
  border-radius: min(2.5cqw, 2.0cqh);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 10px 4px rgba(217, 222, 229, 0.075);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.body-container h2 {
  font-family: 'Apple Braille', Arial, sans-serif;
  margin-top: calc(1svh);
  font-size: min(5cqh, 3cqw);
  font-weight: 1200;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.container-upper {
  background-color: var(--container-start-color);
  z-index: 3;
  transform: translate(-50%, -58%) scale(1);
}

.container-lower {
  background-color: var(--container-end-color);
  z-index: 2;
  transform: translate(-50%, -42%) scale(1);
}

.container-upper h2 {
  color: #100f0f;
}

.container-lower h2 {
  color: #ECECEC;
}
</style>
