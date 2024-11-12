<template>
  <div class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold text-primary mb-6">
      {{ isEdit ? "Editar Libro" : "Agregar Nuevo Libro" }}
    </h1>
    <form @submit.prevent="saveBook">
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary">Título</label>
        <input
          type="text"
          v-model="book.title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary">Autor</label>
        <input
          type="text"
          v-model="book.author"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>
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
      <div class="mb-4">
        <label class="block text-sm font-medium text-secondary">Género</label>
        <input
          type="text"
          v-model="book.genre"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-secondary">Estado</label>
        <select
          v-model="book.status"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        >
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
          <option value="buen estado">En buen estado</option>
          <option value="deteriorado">Deteriorado</option>
        </select>
      </div>
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

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        description: "",
        genre: "",
        status: "",
      },
      isEdit: false,
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  mounted() {
    const bookId = this.route.params.id;
    if (bookId) {
      this.isEdit = true;
      this.fetchBook(bookId);
    }
  },
  methods: {
    async fetchBook(id) {
      try {
        const response = await axios.get(
          `https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books/${id}`
        );
        this.book = response.data;
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    },
    async saveBook() {
      try {
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
