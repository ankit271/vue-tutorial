<template>
  <div class="about-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>About Us</h1>
        <p class="hero-subtitle">Building the future of digital innovation</p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="content-section">
      <div class="mission-container">
        <h2>Our Mission</h2>
        <p>We strive to deliver innovative solutions that transform businesses and enhance user experiences. Our
          commitment to excellence and cutting-edge technology drives us to create meaningful impact in the digital
          world.</p>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <h2>Our Core Values</h2>
      <div class="values-grid">
        <div class="value-card">
          <div class="icon">🎯</div>
          <h3>Innovation</h3>
          <p>Pushing boundaries and embracing new technologies to solve complex challenges</p>
        </div>
        <div class="value-card">
          <div class="icon">🤝</div>
          <h3>Collaboration</h3>
          <p>Working together to achieve exceptional results and shared success</p>
        </div>
        <div class="value-card">
          <div class="icon">⭐</div>
          <h3>Excellence</h3>
          <p>Committed to delivering the highest quality in everything we do</p>
        </div>
        <div class="value-card">
          <div class="icon">💡</div>
          <h3>Creativity</h3>
          <p>Finding unique solutions to drive business growth and success</p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <h2>Our Leadership Team</h2>
      <div class="team-grid">
        <div class="team-member">
          <div class="member-image">
            <img src="@/assets/CEO.jpg" alt="Team Member">
          </div>
          <h3>John Doe</h3>
          <p class="position">Chief Executive Officer</p>
          <p class="bio">15+ years of experience in technology leadership and innovation.</p>
        </div>
        <div class="team-member">
          <div class="member-image">
            <img src="@/assets/CTO.jpg" alt="Team Member">
          </div>
          <h3>Jane Smith</h3>
          <p class="position">Chief Technology Officer</p>
          <p class="bio">Expert in emerging technologies and digital transformation.</p>
        </div>
        <div class="team-member">
          <div class="member-image">
            <img src="@/assets/MD.jpg" alt="Team Member">
          </div>
          <h3>Mike Johnson</h3>
          <p class="position">Head of Design</p>
          <p class="bio">Passionate about creating beautiful and functional designs.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  width: 100%;
  overflow-x: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
  position: relative;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.content-section {
  padding: 80px 20px;
  background: #fff;
}

.mission-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.mission-container h2 {
  color: #1e3c72;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.mission-container p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
}

.values-section {
  background: #f8f9fa;
  padding: 80px 20px;
  text-align: center;
}

.values-section h2 {
  color: #1e3c72;
  margin-bottom: 50px;
  font-size: 2.5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.value-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-card .icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.value-card h3 {
  color: #1e3c72;
  margin-bottom: 15px;
}

.team-section {
  padding: 80px 20px;
  background: white;
  text-align: center;
}

.team-section h2 {
  color: #1e3c72;
  margin-bottom: 50px;
  font-size: 2.5rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.team-member {
  text-align: center;
}

.member-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h3 {
  color: #1e3c72;
  margin-bottom: 10px;
}

.team-member .position {
  color: #2a5298;
  font-weight: 600;
  margin-bottom: 10px;
}

.team-member .bio {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .content-section,
  .values-section,
  .team-section {
    padding: 40px 20px;
  }
}
</style>
