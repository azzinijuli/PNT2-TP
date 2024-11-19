<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        @click="login"
        class="w-full bg-primary text-white p-3 rounded hover:bg-primary-dark transition"
      >
        Iniciar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  await authStore.login(email.value, password.value);

  if (authStore.isAuthenticated) {
    // Verificar si el rol es admin y redirigir a la página correspondiente
    if (authStore.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/"); // Redirigir a la página de inicio para usuarios no admins
    }
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    if (authStore.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }
});
</script>
