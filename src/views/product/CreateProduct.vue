<script setup>
import { ref } from 'vue';
import axios from 'axios';

const product_name = ref('')
const product_description = ref('')
const categories = ['Electronics', 'Books', 'Clothing', 'Mobiles']
const product_category = ref('')
const terms_accepted = ref(false)
const file = ref(null)

const errors = ref({})
const alertMessage = ref('')
const alertType = ref('')
const isShowAlert = ref(false)
const timeout = ref(null);
const API_URL = import.meta.env.VITE_API_URL;

console.log('API_URL:', API_URL);
const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {     
        file.value = uploadedFile;
    }    
}

const validateProduct = () => {
    errors.value = {};
    let isValid = true;

    if (!product_name.value) {
        errors.product_name = 'Product Name is required.';
        isValid = false;
    }
    if (!product_description.value) {
        errors.product_description = 'Product Description is required.';
        isValid = false;
    }
    if (!file.value) {
        errors.file = 'File upload is required.';
        isValid = false;
    }
    if (!product_category.value) {
        errors.product_category = 'Category selection is required.';
        isValid = false;
    }
    if (!terms_accepted.value) {
        errors.terms_accepted = 'You must accept the terms and conditions.';
        isValid = false;
    }
    return isValid;
}

const createProduct = async () => {
    if (validateProduct()) {
        const product = new FormData()
        product.append('product_name', product_name.value)
        product.append('product_description', product_description.value)
        product.append('product_category', product_category.value)
        product.append('file', file.value)

        console.log('Product:', product)
        const response = await axios.post(`${API_URL}/products`, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(response.data.success){
            showAlert('Product created successfully!', 'alert-success')
            resetForm();
        }
        
    } else {
        showAlert('Please fill the mandatory details.', 'alert-danger')
    }
}

const resetForm = () => {
    product_name.value = '';
    product_description.value = '';
    product_category.value = '';
    file.value = null;
    terms_accepted.value = false;
};

const showAlert = (message, type) => {

    alertMessage.value = message
    alertType.value = type
    isShowAlert.value = true
    
    setTimeout(() => {
        alertMessage.value = '';
        alertType.value = '';
        isShowAlert.value = false;
    }, 3000);
}

</script>

<template>
    <div class="container mt-5">
        <h2>Create Product</h2>
        <form @submit.prevent="createProduct">
            <div class="form-group col-6">
                <label for="productName">Product Name</label>
                <input type="text" class="form-control" id="productName" v-model="product_name">
                <div v-if="errors.product_name" class="text-danger">{{ errors.product_name }}</div>
            </div>
            <div class="form-group col-6">
                <label for="description">Product Description</label>
                <textarea class="form-control" id="description" v-model="product_description"></textarea>
                <div v-if="errors.product_description" class="text-danger">{{ errors.product_description }}</div>
            </div>
            <div class="form-group col-6">
                <label for="productImage" class="form-label">Product Image</label>
                <input type="file" class="form-control" @change="handleFileUpload" id="productImage">
                <div v-if="errors.file" class="text-danger">{{ errors.file }}</div>
            </div>
            <div class="form-group col-6">
                <label for="category">Category</label>
                <select class="form-control" id="category" v-model="product_category">
                    <option disabled value="">Please select one</option>
                    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
                <div v-if="errors.product_category" class="text-danger">{{ errors.product_category }}</div>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="terms" v-model="terms_accepted">
                <label class="form-check-label" for="terms">I accept the terms and conditions</label>
                <div v-if="errors.terms_accepted" class="text-danger">{{ errors.terms_accepted }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div v-if="isShowAlert" :class="['alert', alertType, 'alert-dismissible', 'fade', 'show']" role="alert">
            {{ alertMessage }}
            <button type="button" class="btn-close" @click="isShowAlert = false" aria-label="Close">
            </button>
        </div>
    </div>
</template>

<style>
 .fade {
     transition: opacity 0.5s ease;
 }

 .fade-out {
     opacity: 0;
 }

 .form-group{
    padding-bottom: 15px;
 }

 .alert {
     position: fixed;
     top: 60px;
     right: 20px;
     z-index: 1000;
     min-width: 300px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }

 .alert-success {
     color: #0f5132;
     background-color: #d1e7dd;
     border-color: #badbcc;
 }

 .alert-danger {
     color: #842029;
     background-color: #f8d7da;
     border-color: #f5c2c7;
 }

 .fade {
     transition: opacity 0.15s linear;
 }

 .fade.show {
     opacity: 1;
 }

</style>