<script setup>
import { reactive } from 'vue';
import AlertMessage from '@/components/AlertMessage.vue';
import FormGroup from '@/components/FormGroup.vue';
import { ProductForm } from '@/composables/ProductForm';
import { Alert } from '@/composables/Alert';
import ProductFormValidation from '@/validations/ProductFormValidation';
import { CATEGORIES, ALERT_TYPES } from '@/constants';

// Form state using reactive for better performance with complex objects
const formData = reactive({
  product_name: '',
  product_description: '',
  product_category: '',
  file: null,
  terms_accepted: false
});

// Form validation and submission logic
const { 
  errors, 
  validateForm, 
  resetForm, 
  handleSubmit 
} = ProductForm(formData);

// Alert handling
const { 
  showAlert, 
  alertState 
} = Alert();

// File upload handling
const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (!uploadedFile) return;
  
  // Validate file type and size
  if (!ProductFormValidation.validateFile(uploadedFile)) {
    showAlert('Invalid file type or size', ALERT_TYPES.ERROR);
    return;
  }
  
  formData.file = uploadedFile;
};

// Form submission handler
const createProduct = async () => {
  try {
    if (!validateForm()) {
      showAlert('Please fill all required fields', ALERT_TYPES.ERROR);
      return;
    }

    const success = await handleSubmit();
    
    if (success) {
      showAlert('Product created successfully!', ALERT_TYPES.SUCCESS);
      resetForm();
    }
  } catch (error) {
    console.error('Product creation failed:', error);
    showAlert('Failed to create product', ALERT_TYPES.ERROR);
  }
};
</script>

<template>
  <div class="create-product container mt-5">
    <h2 class="mb-4">Create Product</h2>
    
    <form @submit.prevent="createProduct" class="product-form">
      <!-- Product Name -->
      <FormGroup
        label="Product Name"
        :error="errors.product_name"
      >
        <input
          type="text"
          class="form-control"
          id="productName"
          v-model.trim="formData.product_name"
          :class="{ 'is-invalid': errors.product_name }"
        >
      </FormGroup>

      <!-- Product Description -->
      <FormGroup
        label="Product Description"
        :error="errors.product_description"
      >
        <textarea
          class="form-control"
          id="description"
          v-model.trim="formData.product_description"
          :class="{ 'is-invalid': errors.product_description }"
          rows="4"
        ></textarea>
      </FormGroup>

      <!-- Product Image -->
      <FormGroup
        label="Product Image"
        :error="errors.file"
      >
        <input
          type="file"
          class="form-control"
          @change="handleFileUpload"
          accept="image/*"
          :class="{ 'is-invalid': errors.file }"
        >
        <small class="text-muted">
          Supported formats: JPG, PNG, GIF (max 5MB)
        </small>
      </FormGroup>

      <!-- Category Selection -->
      <FormGroup
        label="Category"
        :error="errors.product_category"
      >
        <select
          class="form-select"
          v-model="formData.product_category"
          :class="{ 'is-invalid': errors.product_category }"
        >
          <option value="" disabled>Please select one</option>
          <option
            v-for="category in CATEGORIES"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </FormGroup>

      <!-- Terms Acceptance -->
      <div class="form-group form-check mb-4">
        <input
          type="checkbox"
          class="form-check-input"
          id="terms"
          v-model="formData.terms_accepted"
          :class="{ 'is-invalid': errors.terms_accepted }"
        >
        <label class="form-check-label" for="terms">
          I accept the terms and conditions
        </label>
        <div v-if="errors.terms_accepted" class="invalid-feedback">
          {{ errors.terms_accepted }}
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="Object.keys(errors).length > 0"
      >
        Create Product
      </button>
    </form>

    <!-- Alert Component -->
    <AlertMessage
      v-if="alertState.isVisible"
      :message="alertState.message"
      :type="alertState.type"
      @close="alertState.isVisible = false"
    />
  </div>
</template>

<style scoped>
.create-product {
  max-width: 800px;
}

.product-form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.invalid-feedback {
  display: block;
}
</style>

