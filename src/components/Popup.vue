<script setup lang="ts">

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<template>
  <div class="popup" v-if="show">
    <div class="popup-content">
      <slot></slot>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: grey;
  padding: 20px;
  border-radius: 10px;
}
</style>