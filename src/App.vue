<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView class="router-view" v-slot="{Component}">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </RouterView>
</template>

<style scoped>
.router-view {
  width: 100%;
  min-height: 100vh;
}

/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

</style>
