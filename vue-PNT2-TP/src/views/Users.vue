<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold text-primary mb-6">Usuarios</h1>
    <ul v-if="users.length">
      <li
        v-for="user in users"
        :key="user.id"
        class="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
      >
        <img
          :src="user.avatar"
          alt="avatar"
          class="w-12 h-12 rounded-full border-2 border-tertiary"
        />
        <div>
          <h3 class="text-lg font-bold text-secondary">{{ user.name }}</h3>
          <router-link
            :to="`/profile/${user.id}`"
            class="text-sm text-tertiary hover:text-primary"
            >Ver Perfil</router-link
          >
        </div>
      </li>
    </ul>
    <p v-else class="text-gray-500">Cargando usuarios...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(
          "https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/users"
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },
  },
};
</script>
