import { reactive } from 'vue';
import axios from 'axios';
import ProductFormValidation from '@/validations/ProductFormValidation';

export function ProductForm(formData) {
  const errors = reactive({});
  
  const validateForm = () => {
    errors.value = ProductFormValidation.validate(formData);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    Object.keys(formData).forEach(key => {
      formData[key] = '';
    });
    formData.terms_accepted = false;
  };

  const handleSubmit = async () => {
    const formPayload = new FormData();
    
    Object.keys(formData).forEach(key => {
      formPayload.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        formPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      
      return response.data.success;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  };

  return {
    errors,
    validateForm,
    resetForm,
    handleSubmit
  };
}
