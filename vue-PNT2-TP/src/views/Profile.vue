<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <div v-if="user">
      <div class="flex items-center space-x-4 mb-6">
        <img
          :src="user.avatar"
          alt="avatar"
          class="w-16 h-16 rounded-full border-2 border-tertiary"
        />
        <div>
          <h1 class="text-2xl font-semibold text-primary">{{ user.name }}</h1>
          <p class="text-sm text-gray-600">
            Miembro desde: {{ new Date(user.createdAt).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <h2 class="text-xl font-semibold text-secondary mb-4">
        Libros de {{ user.name }}
      </h2>
      <ul v-if="books.length">
        <li
          v-for="book in books"
          :key="book.id"
          class="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex items-start"
        >
          <img
            src="/public/book.svg"
            alt="Book Icon"
            class="aspect-square w-12 h-12 mr-4"
          />
          <div class="flex-1">
            <div class="mb-2">
              <!-- Título y detalles del libro -->
              <h3 class="text-lg font-bold text-secondary">{{ book.title }}</h3>
              <p class="text-sm text-gray-600">
                Autor: {{ book.author }} (Estado: {{ book.condition }})
              </p>
              <p class="text-sm text-gray-600">{{ book.description }}</p>
              <p class="text-sm text-gray-600">
                Comentarios: {{ book.userComments }}
              </p>
            </div>
            <!-- Opciones de edición si es el usuario actual -->
            <div v-if="isCurrentUser">
              <RouterLink
                :to="`/books/edit/${book.id}`"
                class="text-sm text-tertiary hover:text-primary"
              >
                Editar
              </RouterLink>
              <button
                @click="deleteBook(book.id)"
                class="ml-4 text-sm text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
      </ul>

      <p v-else class="text-gray-500">Este usuario no tiene libros.</p>
    </div>
    <p v-else class="text-gray-500">Cargando perfil...</p>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      user: null,
      books: [],
      currentUser: {
        id: null,
        name: "",
      },
    };
  },
  computed: {
    isCurrentUser() {
      return this.user && this.user.id === this.currentUser.id;
    },
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  mounted() {
    const userId = this.route.params.id;
    this.fetchUser(userId);
    this.fetchUserBooks(userId);
  },
  methods: {
    async fetchUser(id) {
      try {
        const response = await axios.get(
          `https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/users/${id}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    },
    async fetchUserBooks(userId) {
      try {
        const response = await axios.get(
          "https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books"
        );
        // filtrar los libros que pertenecen al usuario
        this.books = response.data.filter((book) => book.userId === userId);
      } catch (error) {
        console.error("Error al obtener libros del usuario:", error);
      }
    },
    async deleteBook(bookId) {
      if (confirm("¿Estás seguro de eliminar este libro?")) {
        try {
          await axios.delete(
            `https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books/${bookId}`
          );
          this.fetchUserBooks(this.user.id); // refresh a la lista de libros
        } catch (error) {
          console.error("Error al eliminar el libro:", error);
        }
      }
    },
  },
};
</script>
