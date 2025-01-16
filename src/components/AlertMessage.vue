// components/AlertMessage.vue
<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'alert-info',
    validator: (value) => {
      return ['alert-success', 'alert-danger', 'alert-warning', 'alert-info'].includes(value);
    }
  }
});

const emit = defineEmits(['close']);

const closeAlert = () => {
  emit('close');
};
</script>

<template>
  <div 
    class="alert-wrapper"
    role="alert"
    aria-live="polite"
  >
    <div 
      :class="['alert', type, 'alert-dismissible', 'fade', 'show']"
    >
      {{ message }}
      <button 
        type="button" 
        class="btn-close" 
        @click="closeAlert"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.alert-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  min-width: 300px;
  max-width: 500px;
}

.alert {
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
