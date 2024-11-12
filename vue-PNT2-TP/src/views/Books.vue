<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold text-primary mb-6">Todos los libros</h1>

    <!-- Filtros -->
    <div class="mb-6 flex space-x-4">
      <!-- Filtro de Condición -->
      <div>
        <label for="condition-filter" class="block text-sm text-gray-600"
          >Condición</label
        >
        <select
          id="condition-filter"
          v-model="filters.condition"
          class="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Usado">Usado</option>
        </select>
      </div>

      <!-- Filtro de Disponibilidad -->
      <div>
        <label for="availability-filter" class="block text-sm text-gray-600"
          >Disponibilidad</label
        >
        <select
          id="availability-filter"
          v-model="filters.available"
          class="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos</option>
          <option value="true">Disponible</option>
          <option value="false">No disponible</option>
        </select>
      </div>

      <!-- Filtro de Orden -->
      <div>
        <label for="order-direction" class="block text-sm text-gray-600"
          >Orden</label
        >
        <select
          id="order-direction"
          v-model="filters.orderDirection"
          class="p-2 border border-gray-300 rounded-lg"
        >
          <option value="asc">Ascendente (A-Z)</option>
          <option value="desc">Descendente (Z-A)</option>
        </select>
      </div>
    </div>

    <!-- Lista de Libros -->
    <ul v-if="filteredBooks.length">
      <li
        v-for="book in filteredBooks"
        :key="book.id"
        class="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
      >
        <div class="mb-2">
          <h3 class="text-lg font-bold text-secondary">{{ book.title }}</h3>
          <p class="text-sm text-gray-600">
            Autor: {{ book.author }} (Estado: {{ book.condition }})
          </p>
          <p class="text-sm text-gray-600">{{ book.description }}</p>
        </div>
        <p class="text-sm text-gray-600">
          Propietario:
          <router-link
            :to="`/profile/${book.userId}`"
            class="text-tertiary hover:text-primary"
            >Ver Perfil</router-link
          >
        </p>
      </li>
    </ul>
    <p v-else class="text-gray-500">Cargando libros...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      filters: {
        condition: "",
        available: "",
        sort: "alphabetical",
      },
    };
  },
  computed: {
    filteredBooks() {
      let booksToFilter = [...this.books];

      // Filtrar por condición
      if (this.filters.condition) {
        booksToFilter = booksToFilter.filter(
          (book) => book.condition === this.filters.condition
        );
      }

      // Filtrar por disponibilidad
      if (this.filters.available !== "") {
        const availability = this.filters.available === "true";
        booksToFilter = booksToFilter.filter(
          (book) => book.available === availability
        );
      }

      // Ordenar alfabéticamente
      if (this.filters.sort === "alphabetical") {
        booksToFilter.sort((a, b) => {
          if (this.filters.orderDirection === "asc") {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
      }

      return booksToFilter;
    },
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get(
          "https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/books"
        );
        this.books = response.data;
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    },
  },
};
</script>
