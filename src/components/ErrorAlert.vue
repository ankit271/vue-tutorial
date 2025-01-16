<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    errorMessage: String,
    required: true
})

const emit = defineEmits(['clearError'])
const showError = ref(false)

watch(() => props.errorMessage, (newValue) => {
    if(newValue) {
        showError.value = true;
        setTimeout(() => {
            showError.value = false;
            emit('clearError');
        }, 3000);
    }
})

if(props.errorMessage){
    showError.value = true;
    setTimeout(() => {
    showError.value = false;    
    }, 3000); 
}
  
</script>

<template>
  <div class="col-md-6">
    <div v-if="showError && errorMessage" 
         class="alert alert-warning" 
         role="alert">
    <p>{{ errorMessage }}</p>
    <div class="sliding-line"></div>
  </div>
  </div>
</template>

<style scoped>
.error-alert {
  position: relative;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 10px 0;
}
.alert-warning {
    padding-top: 5px !important;
    padding-left: 20px !important;
    padding-bottom: 0px !important;
    position: relative;
}
.sliding-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #721c24;
  animation: slide 3s linear;
}

@keyframes slide {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
