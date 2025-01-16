export default class ProductFormValidation {
  static validate(formData) {
    const errors = {};

    if (!formData.product_name?.trim()) {
      errors.product_name = 'Product Name is required';
    }

    if (!formData.product_description?.trim()) {
      errors.product_description = 'Product Description is required';
    }

    if (!formData.product_category) {
      errors.product_category = 'Category selection is required';
    }

    if (!formData.file) {
      errors.file = 'Product image is required';
    }

    if (!formData.terms_accepted) {
      errors.terms_accepted = 'You must accept the terms and conditions';
    }

    return errors;
  }

  static validateFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    return file.size <= maxSize && allowedTypes.includes(file.type);
  }
}