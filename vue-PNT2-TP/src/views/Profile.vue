<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <!-- Empty state if user not found -->
    <div
      v-if="userNotFound"
      class="text-center p-6 flex flex-col justify-center items-center"
    >
      <img
        src="/public/telescope.svg"
        alt="Usuario no encontrado"
        class="h-48 w-48"
      />
      <p class="text-xl text-accent2 font-semibold py-2">
        Usuario perdido en el espacio
      </p>
      <p class="text-gray-600">
        Parece que el usuario que estás buscando se escapó de nuestra órbita.
      </p>
    </div>

    <!-- Profile section if user is found -->
    <div v-else-if="user">
      <div
        class="flex items-center space-x-6 mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        <!-- Avatar -->
        <img
          :src="user.avatar"
          alt="avatar"
          class="w-20 h-20 rounded-full object-cover"
        />
        <div class="flex-1">
          <!-- User Name -->
          <h1 class="text-3xl font-semibold text-primaryDark mb-2">
            {{ user.name }}
          </h1>

          <!-- Member Since -->
          <p class="text-sm text-gray-700 mb-2">
            <span class="font-semibold text-secondary">Miembro desde:</span>
            {{ new Date(user.createdAt).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <!-- Books section -->
      <h2 class="text-xl font-semibold text-primaryDark mb-4">
        Libros de {{ user.name }}
      </h2>
      <ul v-if="books.length">
        <li
          v-for="book in books"
          :key="book.id"
          class="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <div class="flex items-start space-x-4">
            <!-- Book icon -->
            <img
              src="/public/book.svg"
              alt="Book Icon"
              class="w-16 h-16 rounded-lg p-2"
            />
            <div class="flex-1">
              <!-- Book title and details -->
              <div class="flex flex-col gap-y-2">
                <h3 class="text-2xl font-semibold text-primary mb-2">
                  {{ book.title }}
                </h3>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold text-accent1">Autor:</span>
                  {{ book.author }} (Estado: {{ book.condition }})
                </p>
                <p class="text-sm text-gray-600 italic">
                  {{ book.description }}
                </p>
                <p class="text-sm text-gray-500">
                  <span class="font-semibold text-accent2">Comentarios:</span>
                  {{ book.userComments }}
                </p>
              </div>

              <!-- Edit and delete options -->
              <div v-if="isCurrentUser" class="mt-4 flex space-x-4">
                <RouterLink
                  :to="`/books/edit/${book.id}`"
                  class="text-sm text-tertiary hover:text-primary transition-colors duration-300 ease-in-out"
                >
                  Editar
                </RouterLink>
                <button
                  @click="deleteBook(book.id)"
                  class="text-sm text-red-600 hover:text-red-800 transition-colors duration-300 ease-in-out"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <p v-else class="text-gray-500">Este usuario no tiene libros.</p>
    </div>

    <!-- Loading state -->
    <p v-else class="text-gray-500">Cargando perfil...</p>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { useAuthStore } from "../store";

export default {
  data() {
    return {
      user: null,
      books: [],
      userNotFound: false, // State to track if user is not found
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
    const authStore = useAuthStore();

    return { route, authStore };
  },
  mounted() {
    const userId = this.route.params.id;
    this.fetchUser(userId);
    this.fetchUserBooks(userId);

    // Set currentUser from auth store
    if (this.authStore.user) {
      this.currentUser = {
        id: this.authStore.user.id,
        name: this.authStore.user.name,
      };
    }
  },
  methods: {
    async fetchUser(id) {
      try {
        const response = await axios.get(
          `https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/users/${id}`
        );
        if (response.data) {
          this.user = response.data;
          this.userNotFound = false; // Reset if user is found
        } else {
          this.userNotFound = true; // Set userNotFound if no user is found
        }
      } catch (error) {
        this.userNotFound = true; // If error occurs, set userNotFound
        console.error("Error al obtener el perfil del usuario:", error);
      }
    },
    async fetchUserBooks(userId) {
      try {
        const response = await axios.get(
          "https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books"
        );
        // Filter the books that belong to the user
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
          this.fetchUserBooks(this.user.id); // Refresh the list of books
        } catch (error) {
          console.error("Error al eliminar el libro:", error);
        }
      }
    },
  },
};
</script>
