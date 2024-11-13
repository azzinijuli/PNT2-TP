<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-primary text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Logo / App Name -->
        <RouterLink to="/" class="text-2xl font-bold hover:text-gray-300">
          Biblioteca Circular
        </RouterLink>

        <div>
          <!-- Mostrar "Bienvenido (username)" si el usuario está autenticado -->
          <template v-if="authStore.isAuthenticated">
            <span class="mr-4">Bienvenido, {{ authStore.user?.name }}</span>
            <button @click="logout" class="hover:text-gray-300">
              Cerrar sesión
            </button>
          </template>

          <!-- Mostrar "Iniciar sesión" si no está autenticado -->
          <template v-else>
            <RouterLink to="/login" class="hover:text-gray-300">
              Iniciar sesión
            </RouterLink>
          </template>
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
import { useAuthStore } from "./store";
import { onMounted } from "vue";

const authStore = useAuthStore();

// Mantener la sesión si ya está autenticado
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    authStore.user = storedUser;
    authStore.token = storedToken;
  }
});

// Función para cerrar sesión
const logout = () => {
  authStore.user = null;
  authStore.token = null;
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
</script>
