<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="login-container">
                    <div class="login-card">
                        <div class="login-header">
                            <div class="logo">
                                <div class="logo-circle">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <h2>Welcome Back</h2>
                            <p>Please sign in to continue</p>
                        </div>

                        <form @submit.prevent="handleLogin" class="login-form">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <div class="input-container">
                                    <i class="fas fa-envelope"></i>
                                    <input id="email" v-model="formData.email" type="email"
                                        placeholder="Enter your email" :class="{ 'error': errors.email }"
                                        @focus="clearError('email')" />
                                </div>
                                <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <div class="input-container">
                                    <i class="fas fa-lock"></i>
                                    <input id="password" v-model="formData.password"
                                        :type="showPassword ? 'text' : 'password'" placeholder="Enter your password"
                                        :class="{ 'error': errors.password }" @focus="clearError('password')" />
                                    <i class="fas eye-icon" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                                        @click="togglePassword"></i>
                                </div>
                                <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
                            </div>

                            <div class="form-options">
                                <label class="remember-me">
                                    <input type="checkbox" v-model="rememberMe">
                                    <span>Remember me</span>
                                </label>
                                <a href="#" class="forgot-password" @click.prevent="forgotPassword">Forgot Password?</a>
                            </div>

                            <button type="submit" class="login-button" :disabled="isLoading">
                                <span v-if="!isLoading">Sign In</span>
                                <span v-else class="loading-spinner"></span>
                            </button>

                            <div class="social-login">
                                <p>Or continue with</p>
                                <div class="social-buttons">
                                    <button type="button" @click="handleGoogleLogin" class="social-button google">
                                        <i class="fab fa-google"></i>
                                    </button>                                                                      
                                </div>
                            </div>

                            <div class="register-link">
                                Don't have an account?
                                <a href="#" @click.prevent="goToRegister">Register here</a>
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
import { googleTokenLogin } from 'vue3-google-login'
const userData = ref(null)

const handleGoogleLogin = async () => {
  try {
    
    const response = await googleTokenLogin({
        flow: 'auth-code'
    })
    
    const { access_token } = response
        
    // Fetch user info using the access token
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    
    const data = await userInfo.json()
        
    userData.value = {
        name: data.name,
        email: data.email,
        picture: data.picture
    }

    console.log('User logged in:', userData.value)
  } catch (error) {
    console.error('Error logging in:', error)
  }
}


const router = useRouter()
const isLoading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

const formData = reactive({
    email: '',
    password: ''
})

const errors = reactive({
    email: '',
    password: ''
})

const validateForm = () => {
    let isValid = true

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email'
        isValid = false
    }

    // Password validation
    if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
    }

    return isValid
}

const handleLogin = async () => {
    if (!validateForm()) return

    isLoading.value = true
    try {
        // Add your login API call here
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call
        router.push('/dashboard')
    } catch (error) {
        console.error('Login error:', error)
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

const forgotPassword = () => {
    router.push('/forgot-password')
}

const goToRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;    
    padding: 20px;
}

.login-card {
    background: white;
    border-radius: 20px;
    padding-top: 15px;
    width: 100%;
    min-width: 500px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    position: relative;    
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.logo {
    margin-bottom: 20px;
}

.logo-circle {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #3498db, #2980b9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.logo-circle i {
    font-size: 30px;
    color: white;
}

.login-header h2 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 10px;
}

.login-header p {
    color: #7f8c8d;
    font-size: 1rem;
}

.form-group {
    margin-bottom: 24px;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
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

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #7f8c8d;
    cursor: pointer;
}

.forgot-password {
    color: #3498db;
    text-decoration: none;
    font-size: 0.9rem;
}

.forgot-password:hover {
    text-decoration: underline;
}

.login-button {
    width: 100%;
    max-width: 400px;
    padding: 14px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px auto;
    display: block;
}

.login-button:hover {
    background: #2980b9;
    transform: translateY(-1px);
}

.login-button:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
}

.social-login {
    text-align: center;
    margin-top: 30px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.social-login p {
    color: #7f8c8d;
    margin-bottom: 15px;
    position: relative;
}

.social-login p::before,
.social-login p::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #e0e0e0;
}

.social-login p::before {
    left: 0;
}

.social-login p::after {
    right: 0;
}

.social-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.social-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.social-button:hover {
    transform: translateY(-2px);
}

.social-button.google {
    background: #db4437;
    color: white;
}

.social-button.facebook {
    background: #4267B2;
    color: white;
}

.social-button.twitter {
    background: #1DA1F2;
    color: white;
}

.register-link {
    text-align: center;
    margin-top: 20px;
    color: #7f8c8d;
}

.register-link a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.register-link a:hover {
    text-decoration: underline;
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

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 480px) {
    .login-card {
        padding: 20px;
        width: 90%;
        max-width: none;
    }

    .form-group,
    .form-options,
    .login-button,
    .social-login {
        max-width: 100%;
    }

    .login-header h2 {
        font-size: 1.75rem;
    }

    .form-options {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }

    input {
        padding: 10px 35px;
    }
}
</style>
