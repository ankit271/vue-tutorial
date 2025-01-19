<template>
  <div class="container mt-5">
    <h2 style="text-align: center;">Contact Us</h2>
    <br>
    <ErrorAlert :error-message="alertMessage" />
    <div class="row">
      <div class="col-md-6">
        <div class="contact-form-container">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="data.name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="data.email">
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="phone" v-model="data.phone">
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control" id="message" rows="3" v-model="data.message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" @click="contactUs">Submit</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.305229561675!2d82.56587549999999!3d25.394088699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIzJzM4LjciTiA4MsKwMzMnNTcuMyJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="google-map"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ErrorAlert from '@/components/ErrorAlert.vue';

const data = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const alertMessage = ref('');


const contactUs = async () =>{
  try {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });


    if (!response.ok) {
      throw new Error('Failed to submit...');
    }

    const result = await response.json();
    console.log(result.message);

    alertMessage.value = result.message;  
    
    // clear the form
    data.name = '';
    data.email = '';
    data.message = '';
    data.phone = '';

  } catch (error) {
    alertMessage.value = 'Sorry, there was an error sending your message. Please try again.';
    console.log(error);
  }
  
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-form-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 450px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.google-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .map-container {
    margin-top: 2rem;
    min-height: 300px;
  }
  
  .contact-form-container {
    margin-bottom: 2rem;
  }
}

/* Form Styling */
.form-control {
  border: 1px solid #e1e1e1;
  padding: 0.8rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  padding: 0.8rem 2rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

/* Additional modern touches */
.form-label {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}
</style>
