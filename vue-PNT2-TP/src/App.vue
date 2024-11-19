<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-accent2 text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <RouterLink to="/" class="text-2xl font-bold hover:text-gray-300">
          Biblioteca Circular
        </RouterLink>

        <div>
          <template v-if="authStore.isAuthenticated">
            <div class="relative">
              <button @click="toggleMenu" class="focus:outline-none">
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div
                v-if="menuOpen"
                class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10"
              >
                <div class="flex flex-col p-4">
                  <button
                    @click="goToProfile"
                    class="text-primary hover:text-gray-700 py-2"
                  >
                    Mi perfil
                  </button>
                  <button
                    @click="logout"
                    class="text-red-600 hover:text-red-800 py-2"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <RouterLink to="/login" class="hover:text-gray-300">
              Iniciar sesión
            </RouterLink>
          </template>
        </div>
      </div>
    </nav>

    <main class="p-6">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const menuOpen = ref(false);

// mantiene la sesión si ya está autenticado
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    authStore.user = storedUser;
    authStore.token = storedToken;
  }
});

const logout = () => {
  authStore.user = null;
  authStore.token = null;
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  menuOpen.value = false;
  router.push("/");
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// redirige a "Mi perfil"
const goToProfile = () => {
  const userId = authStore.user?.id;
  if (userId) {
    menuOpen.value = false;
    router.push(`/profile/${userId}`);
  }
};
</script>
