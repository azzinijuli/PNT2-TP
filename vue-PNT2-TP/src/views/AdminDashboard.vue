<template>
  <div class="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-primary mb-6">
      Panel de Informes (Administrador)
    </h1>
    <p class="text-xl text-gray-600">Bienvenido/a, {{ authStore.user.name }}</p>

    <!-- Informe de Libros Más Intercambiados -->
    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-primary mb-4">
        Libros Más Intercambiados
      </h2>
      <ul class="space-y-4">
        <li
          v-for="book in mostExchangedBooks"
          :key="book.id"
          class="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-semibold text-primary">
                {{ book.title }}
              </h3>
              <p class="text-sm text-gray-500">Autor: {{ book.author }}</p>
              <p class="text-sm text-gray-500">
                Condición: {{ book.condition }}
              </p>
            </div>
            <div class="text-sm text-gray-400">
              <p><strong>Comentarios:</strong> {{ book.userComments }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Informe de Usuarios Más Activos -->
    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-primary mb-4">
        Usuarios Más Activos
      </h2>
      <ul class="space-y-4">
        <li
          v-for="user in mostActiveUsers"
          :key="user.id"
          class="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <img
                :src="user.avatar"
                alt="User Avatar"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <h3 class="text-xl font-semibold text-primary">
                  {{ user.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
            </div>
            <div class="text-sm text-gray-400">
              <p>
                <strong>Fecha de Registro:</strong>
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store";
import axios from "axios";

const authStore = useAuthStore();

// Variables para almacenar los datos de los informes
const mostExchangedBooks = ref([]);
const mostActiveUsers = ref([]);

// Función para obtener los datos de los informes
onMounted(async () => {
  try {
    // Obtener los libros más intercambiados
    const responseBooks = await axios.get(
      "https://673d0a0f4db5a341d833d114.mockapi.io/bibliotecacircular/mostExchangedBooks"
    );
    mostExchangedBooks.value = responseBooks.data;

    // Obtener los usuarios más activos
    const responseUsers = await axios.get(
      "https://673d0a0f4db5a341d833d114.mockapi.io/bibliotecacircular/mostActiveUsers"
    );
    mostActiveUsers.value = responseUsers.data;
  } catch (error) {
    console.error("Error al obtener los datos de los informes:", error);
  }
});
</script>

<style scoped>
/* Colores y tipografía personalizados */
.text-primary {
  color: #4f46e5; /* Azul vibrante */
}

.bg-primary {
  background-color: #4f46e5; /* Azul vibrante */
}

.text-secondary {
  color: #9ca3af; /* Gris suave */
}

.bg-secondary {
  background-color: #f3f4f6; /* Gris muy suave */
}

.text-tertiary {
  color: #10b981; /* Verde vibrante */
}

.bg-tertiary {
  background-color: #10b981; /* Verde vibrante */
}

.text-gray-400 {
  color: #d1d5db; /* Gris claro */
}

.text-gray-500 {
  color: #6b7280; /* Gris medio */
}

.bg-gray-50 {
  background-color: #f9fafb; /* Gris muy claro */
}

.bg-gray-100 {
  background-color: #f3f4f6; /* Gris más oscuro */
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
