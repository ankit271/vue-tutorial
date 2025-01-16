<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand">
                <router-link to="/" class="nav-link" active-class="active-link">Vue</router-link>         
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/home" class="nav-link" active-class="active-link">Home</router-link>         
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link" active-class="active-link">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/contact" class="nav-link" active-class="active-link">Contact</router-link>
                </li>
                <li class="nav-item dropdown">                
                    <router-link to="/product" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" 
                     aria-expanded="false" active-class="active-link">Product</router-link>                
                <ul class="dropdown-menu">
                    <router-link to="/product/create" class="dropdown-item">Create Product</router-link>
                    <router-link to="/product/listing" class="dropdown-item">Listing Products</router-link>
                </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar{
    background-color: #712cf9;
}

.active-link {
  font-weight: 600; 
  color: #fff;
}

.nav-item{
    gap: 50px;
}
</style>