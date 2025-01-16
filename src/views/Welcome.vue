<template>
  <div class="dashboard-3d">
    <!-- 3D Background Canvas -->
    <div id="three-container" class="three-container"></div>

    <!-- Dashboard Content -->
    <div class="dashboard-content">
      <div class="glass-nav">
        <h1>Dashboard</h1>
        <div class="nav-controls">
          <button @click="toggleRotation" class="control-btn">
            {{ isRotating ? '⏸️ Pause' : '▶️ Rotate' }}
          </button>
          <button @click="toggleTheme" class="control-btn">🎨 Theme</button>
        </div>
      </div>

      <!-- Chart Grid with Glass Effect -->
      <div class="chart-grid">
        <!-- 3D Revenue Card -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Monthly Revenue</h3>
            <span class="card-icon">📈</span>
          </div>
          <Line :data="lineChartData" :options="lineChartOptions" />
        </div>

        <!-- 3D Sales Card -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Product Sales</h3>
            <span class="card-icon">📊</span>
          </div>
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>

        <!-- 3D Demographics Card -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Demographics</h3>
            <span class="card-icon">👥</span>
          </div>
          <Pie :data="pieChartData" :options="pieChartOptions" />
        </div>

        <!-- 3D Traffic Card -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Traffic Sources</h3>
            <span class="card-icon">🌐</span>
          </div>
          <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
        </div>
      </div>

      <!-- 3D Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card" v-for="(stat, index) in stats" :key="index">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-content">
            <h4>{{ stat.title }}</h4>
            <p>{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { Line, Bar, Pie, Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Three.js Setup
let scene, camera, renderer, particles;
const isRotating = ref(true);

// Chart Data
const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [65, 59, 80, 81, 56, 55],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const barChartData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
  datasets: [{
    label: 'Sales',
    data: [12, 19, 3, 5, 2],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)'
    ]
  }]
};

const pieChartData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ]
  }]
};

const doughnutChartData = {
  labels: ['Direct', 'Social', 'Referral', 'Organic'],
  datasets: [{
    data: [30, 20, 25, 25],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)'
    ]
  }]
};

// Chart Options
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white'
      }
    }
  }
};

const lineChartOptions = {
  ...commonOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: 'white' }
    },
    x: {
      ticks: { color: 'white' }
    }
  }
};

const barChartOptions = {
  ...commonOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: 'white' }
    },
    x: {
      ticks: { color: 'white' }
    }
  }
};

const pieChartOptions = commonOptions;
const doughnutChartOptions = commonOptions;

// Stats Data
const stats = [
  { icon: '📈', title: 'Total Revenue', value: '$1,234,567' },
  { icon: '👥', title: 'Active Users', value: '45,678' },
  { icon: '🎯', title: 'Conversion Rate', value: '12.3%' },
  { icon: '⭐', title: 'Satisfaction', value: '4.9/5.0' }
];

// Three.js Functions
const initThree = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  const container = document.getElementById('three-container');
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Create particle system
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  for (let i = 0; i < 5000; i++) {
    vertices.push(
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000)
    );
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
  const material = new THREE.PointsMaterial({
    color: 0x0080ff,
    size: 2,
    transparent: true,
    opacity: 0.8
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  camera.position.z = 1000;
};

const animate = () => {
  if (!isRotating.value) return;
  
  requestAnimationFrame(animate);
  
  if (particles) {
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0001;
  }
  
  renderer.render(scene, camera);
};

const onWindowResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

const toggleRotation = () => {
  isRotating.value = !isRotating.value;
  if (isRotating.value) animate();
};

const toggleTheme = () => {
  // Implement theme switching logic here
};

// Lifecycle Hooks
onMounted(() => {
  initThree();
  animate();
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.dashboard-3d {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom right, #1a1a2e, #16213e);
}

.three-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.dashboard-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.glass-nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.glass-nav h1 {
  color: white;
  font-size: 2rem;
  font-weight: 600;
}

.nav-controls {
  display: flex;
  gap: 1rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  height: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  color: white;
  font-size: 1.25rem;
}

.card-icon {
  font-size: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
}

.stat-content h4 {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.stat-content p {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 1rem;
  }

  .chart-grid {
    grid-template-columns: 1fr;
  }

  .chart-card {
    height: 300px;
  }

  .glass-nav {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
