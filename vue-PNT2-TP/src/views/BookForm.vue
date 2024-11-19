<template>
  <div class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold text-primary mb-6">
      {{ isEdit ? "Editar Libro" : "Agregar Nuevo Libro" }}
    </h1>
    <form @submit.prevent="saveBook">
      <!-- Campo para el título -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary">Título</label>
        <input
          type="text"
          v-model="book.title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <!-- Campo para el autor -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary">Autor</label>
        <input
          type="text"
          v-model="book.author"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <!-- Campo para la descripción -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary"
          >Descripción</label
        >
        <textarea
          v-model="book.description"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        ></textarea>
      </div>

      <!-- Campo para el género -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary">Género</label>
        <input
          type="text"
          v-model="book.genre"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <!-- Campo para la condición (renombrado de 'status' a 'condition') -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary"
          >Condición</label
        >
        <select
          v-model="book.condition"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        >
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
          <option value="buen estado">En buen estado</option>
          <option value="deteriorado">Deteriorado</option>
        </select>
      </div>

      <!-- Campo para comentarios del usuario (userComments) -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary"
          >Comentarios del Usuario</label
        >
        <textarea
          v-model="book.userComments"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        ></textarea>
      </div>

      <!-- Botón de submit -->
      <button
        type="submit"
        class="w-full bg-tertiary text-white py-2 rounded-md hover:bg-primary focus:ring-4 focus:ring-primary focus:ring-opacity-50 transition"
      >
        {{ isEdit ? "Actualizar" : "Agregar" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store";

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        description: "",
        genre: "",
        condition: "",
        userComments: "",
        userId: null,
      },
      isEdit: false,
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    return { route, router, authStore };
  },
  mounted() {
    const bookId = this.route.params.id;
    if (bookId) {
      this.isEdit = true;
      this.fetchBook(bookId);
    } else {
      // si es un nuevo libro, asignar el userId al usuario autenticado
      this.book.userId = this.authStore.user.id;
    }
  },
  methods: {
    async fetchBook(id) {
      try {
        const response = await axios.get(
          `https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books/${id}`
        );
        this.book = response.data;
        this.book.condition = this.book.status;
        delete this.book.status;
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    },
    async saveBook() {
      try {
        // asignar el userId del usuario autenticado
        this.book.userId = this.authStore.user.id;

        if (this.isEdit) {
          await axios.put(
            `https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books/${this.route.params.id}`,
            this.book
          );
        } else {
          await axios.post(
            "https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books",
            this.book
          );
        }
        this.router.push("/books");
      } catch (error) {
        console.error("Error al guardar el libro:", error);
      }
    },
  },
};
</script>
