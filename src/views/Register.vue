<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="register-container">
                    <div class="register-card">
                        <div class="register-header">
                            <i>
                                <h2>Create Account</h2>
                            </i>
                        </div>
                        <form @submit.prevent="handleSubmit" class="register-form">
                            <div class="form-group">
                                <label for="fullName">Full Name</label>
                                <div class="input-container">
                                    <i class="fas fa-user"></i>
                                    <input id="fullName" v-model="formData.fullName" type="text"
                                        placeholder="Enter your full name" :class="{ 'error': errors.fullName }"
                                        @focus="clearError('fullName')" />
                                </div>
                                <span class="error-message" v-if="errors.fullName">{{ errors.fullName }}</span>
                            </div>

                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <div class="input-container">
                                    <i class="fas fa-envelope"></i>
                                    <input id="email" v-model="formData.email" type="email"
                                        placeholder="Enter your email" :class="{ 'error': errors.email }"
                                        @focus="clearError('email')" />
                                </div>
                                <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
                            </div>

                            <div class="form-group">
                                <label for="mobile">Mobile Number</label>
                                <div class="input-container">
                                    <i class="fas fa-phone"></i>
                                    <input id="mobile" v-model="formData.mobile" type="tel"
                                        placeholder="Enter your mobile number" :class="{ 'error': errors.mobile }"
                                        @focus="clearError('mobile')" />
                                </div>
                                <span class="error-message" v-if="errors.mobile">{{ errors.mobile }}</span>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <div class="input-container">
                                    <i class="fas fa-lock"></i>
                                    <input id="password" v-model="formData.password"
                                        :type="showPassword ? 'text' : 'password'" placeholder="Create a password"
                                        :class="{ 'error': errors.password }" @focus="clearError('password')" />
                                    <i class="fas eye-icon" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                                        @click="togglePassword"></i>
                                </div>
                                <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
                            </div>

                            <button type="submit" class="register-button" :disabled="isLoading">
                                <span v-if="!isLoading">Create Account</span>
                                <span v-else class="loading-spinner"></span>
                            </button>

                            <div class="login-link">
                                Already have an account?
                                <a href="#" @click.prevent="goToLogin">Login here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const showPassword = ref(false)

const formData = reactive({
    fullName: '',
    email: '',
    mobile: '',
    password: ''
})

const errors = reactive({
    fullName: '',
    email: '',
    mobile: '',
    password: ''
})

const validateForm = () => {
    let isValid = true

    // Full Name validation
    if (!formData.fullName.trim()) {
        errors.fullName = 'Full name is required'
        isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email'
        isValid = false
    }

    // Mobile validation
    const mobileRegex = /^\d{10}$/
    if (!formData.mobile.trim()) {
        errors.mobile = 'Mobile number is required'
        isValid = false
    } else if (!mobileRegex.test(formData.mobile)) {
        errors.mobile = 'Please enter a valid 10-digit mobile number'
        isValid = false
    }

    // Password validation
    if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
    } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isLoading.value = true
    try {
        // Add your registration API call here
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call
        router.push('/dashboard')
    } catch (error) {
        console.error('Registration error:', error)
    } finally {
        isLoading.value = false
    }
}

const clearError = (field) => {
    errors[field] = ''
}

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
.register-container {
    min-height: 100vh;    
    display: flex;
    align-items: center;
    justify-content: center;    
    padding-top: 20px;
}

.register-card {
    background: white;
    border-radius: 20px;
    padding: 40px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.register-header {
    text-align: center;
    margin-bottom: 40px;
}

.register-header h2 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 10px;
}

.register-header p {
    color: #7f8c8d;
    font-size: 1rem;
}

.form-group {
    margin-bottom: 24px;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: 500;
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.input-container i {
    position: absolute;
    left: 12px;
    color: #95a5a6;
}

.eye-icon {
    right: 12px;
    left: auto !important;
    cursor: pointer;
}

input {
    width: 100%;
    padding: 12px 40px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

input:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

input.error {
    border-color: #e74c3c;
}

.error-message {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 5px;
    display: block;
}

.register-button {
    width: 100%;
    padding: 14px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.register-button:hover {
    background: #2980b9;
    transform: translateY(-1px);
}

.register-button:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
}

.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
}

.login-link {
    text-align: center;
    margin-top: 20px;
    color: #7f8c8d;
}

.login-link a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.login-link a:hover {
    text-decoration: underline;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 480px) {
    .register-card {
        padding: 20px;
    }

    .register-header h2 {
        font-size: 1.75rem;
    }

    input {
        padding: 10px 35px;
    }
}
</style>
