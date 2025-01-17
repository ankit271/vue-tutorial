<template>
  <div class="welcome-container">
    <div class="content">
      <h1 class="title">
        <span class="welcome-text">Welcome</span>
        <span class="highlight">To Our Platform</span>
      </h1>      
    </div>

    <div class="decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>


<style scoped>
.welcome-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.content {
  text-align: center;
  padding: 2rem;
  z-index: 1;
  animation: fadeIn 1s ease-in;
}

.title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.welcome-text {
  color: #2c3e50;
}

.highlight {
  color: #3498db;
  font-weight: bold;
}

.description {
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: slideUp 0.8s ease-out 0.5s both;
}

.decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #3498db;
  top: -50px;
  right: -50px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: #e74c3c;
  bottom: 50px;
  left: -50px;
}

.circle-3 {
  width: 150px;
  height: 150px;
  background: #2ecc71;
  bottom: 50%;
  right: 20%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
