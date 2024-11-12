<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-primary text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Logo / App Name -->
        <RouterLink to="/" class="text-2xl font-bold hover:text-gray-300"
          >Biblioteca Circular</RouterLink
        >
        <div>
          <RouterLink to="/books" class="mr-4 hover:text-gray-300"
            >Libros</RouterLink
          >
          <RouterLink to="/users" class="hover:text-gray-300"
            >Usuarios</RouterLink
          >
        </div>
      </div>
    </nav>

    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
