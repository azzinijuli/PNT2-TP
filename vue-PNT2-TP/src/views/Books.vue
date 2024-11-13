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

      <!-- Filtro de Género -->
      <div>
        <label for="genre-filter" class="block text-sm text-gray-600"
          >Género</label
        >
        <select
          id="genre-filter"
          v-model="filters.genre"
          class="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos</option>
          <option value="Ficción">Ficción</option>
          <option value="Poesía">Poesía</option>
          <option value="Novela">Novela</option>
          <option value="Ensayo">Ensayo</option>
          <option value="Cuento">Cuento</option>
        </select>
      </div>

      <!-- Dirección de Orden (Ascendente predeterminado) -->
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
    <ul
      v-if="filteredBooks.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <li
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white rounded-lg shadow-lg p-6 transform hover:scale-102 hover:shadow-2xl transition-transform"
      >
        <div class="mb-4">
          <!-- Título del libro -->
          <h3 class="text-xl font-semibold text-primary mb-2">
            {{ book.title }}
          </h3>

          <!-- Autor y estado del libro -->
          <p class="text-sm text-gray-500 mb-2">
            Autor: <span class="font-medium">{{ book.author }}</span>
            &nbsp;
            <span class="italic">(Estado: {{ book.condition }})</span>
          </p>

          <!-- Descripción del libro -->
          <p class="text-gray-600 line-clamp-3">{{ book.description }}</p>
        </div>

        <!-- Información del propietario -->
        <p class="text-sm text-gray-600">
          Propietario:
          <router-link
            :to="`/profile/${book.userId}`"
            class="text-tertiary font-medium hover:underline hover:text-primary transition"
          >
            Ver Perfil
          </router-link>
        </p>
      </li>
    </ul>

    <!-- Empty States based on filters -->
    <p v-else class="text-gray-500">
      <!-- Message for no books after applying filters -->
      <span v-if="appliedFilters">
        No se encontraron libros que coincidan con los filtros seleccionados.
      </span>
      <!-- Message for when no books at all -->
      <span v-else> Cargando libros... </span>
    </p>
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
        genre: "",
        orderDirection: "asc", // Dirección ascendente predeterminada
      },
    };
  },
  computed: {
    // Computed property to determine if any filters are applied
    appliedFilters() {
      return (
        this.filters.condition ||
        this.filters.available !== "" ||
        this.filters.genre
      );
    },
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

      // Filtrar por género
      if (this.filters.genre) {
        booksToFilter = booksToFilter.filter(
          (book) => book.genre === this.filters.genre
        );
      }

      // Ordenar alfabéticamente en base a la dirección seleccionada
      booksToFilter.sort((a, b) => {
        if (this.filters.orderDirection === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });

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
