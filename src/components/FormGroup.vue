// components/FormGroup.vue
<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  helpText: {
    type: String,
    default: ''
  },
  labelFor: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="form-group mb-3">
    <label 
      :for="labelFor" 
      class="form-label"
    >
      {{ label }}
      <span 
        v-if="required" 
        class="text-danger"
      >*</span>
    </label>
    
    <slot></slot>
    
    <small 
      v-if="helpText" 
      class="form-text text-muted"
    >
      {{ helpText }}
    </small>
    
    <div 
      v-if="error" 
      class="invalid-feedback d-block"
    >
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.invalid-feedback {
  font-size: 0.875rem;
  color: #dc3545;
  margin-top: 0.25rem;
}
</style>
