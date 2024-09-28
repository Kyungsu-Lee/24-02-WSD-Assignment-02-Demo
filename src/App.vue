<template>
  <div id="app">
    <main>
      <!-- 라우터 뷰 컴포넌트가 여기에 렌더링됩니다 -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>

</style>
