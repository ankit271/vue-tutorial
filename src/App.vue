<script setup>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

</script>

<template>  
    <Navbar />
    <main class="content">
      <router-view />
    </main>  
    <Footer />
</template>

<style>

.content {
  flex: 1;
  margin:5px;
  display: flex;
  min-height: 76vh;
}

</style>
