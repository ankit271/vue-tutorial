<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Transform Your Digital Experience</h1>
        <p class="hero-subtitle">Innovative solutions for modern businesses</p>
        <div class="hero-buttons">
          <button @click="getStarted" class="btn primary">Get Started</button>
          <button @click="learnMore" class="btn secondary">Learn More</button>
        </div>
      </div>
      <div class="hero-image">
        <!-- Replace with your hero image -->
        <img src="@/assets/hero-image.jpg" alt="Hero Image">
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Why Choose Us</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>Fast Performance</h3>
          <p>Lightning-fast solutions optimized for speed and efficiency</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🛡️</div>
          <h3>Secure & Reliable</h3>
          <p>Enterprise-grade security for your peace of mind</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💡</div>
          <h3>Smart Solutions</h3>
          <p>Intelligent features powered by latest technology</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🤝</div>
          <h3>24/7 Support</h3>
          <p>Round-the-clock assistance whenever you need it</p>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products">
      <h2>Our Products</h2>
      <div class="product-grid">
        <div class="product-card">
          <img src="@/assets/hero-image.jpg" alt="Product 1">
          <h3>Product One</h3>
          <p>Advanced analytics platform for business intelligence</p>
          <button class="btn outline">Learn More</button>
        </div>
        <div class="product-card">
          <img src="@/assets/hero-image.jpg" alt="Product 2">
          <h3>Product Two</h3>
          <p>Automated workflow solutions for enterprise</p>
          <button class="btn outline">Learn More</button>
        </div>
        <div class="product-card">
          <img src="@/assets/hero-image.jpg" alt="Product 3">
          <h3>Product Three</h3>
          <p>Integrated management system for teams</p>
          <button class="btn outline">Learn More</button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="stat-item">
        <h3>500+</h3>
        <p>Happy Clients</p>
      </div>
      <div class="stat-item">
        <h3>1000+</h3>
        <p>Projects Completed</p>
      </div>
      <div class="stat-item">
        <h3>50+</h3>
        <p>Team Members</p>
      </div>
      <div class="stat-item">
        <h3>24/7</h3>
        <p>Support Available</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers today</p>
        <button @click="contactUs" class="btn primary">Contact Us</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 5%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 80vh;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 3.5rem;
  color: #1a1a1a;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
}

.hero-image {
  flex: 1;
  max-width: 600px;
  margin-left: 50px;
}

.hero-image img {
  width: 100%;
  height: auto;
}

/* Buttons */
.btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
}

.primary {
  background: #007bff;
  color: white;
  border: none;
}

.primary:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.secondary {
  background: transparent;
  border: 2px solid #007bff;
  color: #007bff;
}

.secondary:hover {
  background: rgba(0, 123, 255, 0.1);
  transform: translateY(-2px);
}

/* Features Section */
.features {
  padding: 80px 5%;
  background: white;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #1a1a1a;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 30px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

/* Products Section */
.products {
  padding: 80px 5%;
  background: #f8f9fa;
}

.products h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Stats Section */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  padding: 60px 5%;
  background: #007bff;
  color: white;
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

/* CTA Section */
.cta {
  padding: 100px 5%;
  text-align: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 50px 5%;
  }

  .hero-content {
    margin-bottom: 50px;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-image {
    margin-left: 0;
  }

  .features-grid,
  .product-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .btn {
    margin: 0;
  }
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn.loading {
  opacity: 0.7;
  cursor: wait;
}
</style>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = ref(false);

const getStarted = () => {
  // Check if user is logged in
  if (isLoggedIn.value) {    
    router.push('/')
  } else {    
    router.push('/register')
  }
}

const learnMore = () => {
  router.push('/about')
}

const contactUs = () =>{
  router.push('/contact')
}

</script>
