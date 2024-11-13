<template>
  <h1>Esta vista es de administrador</h1>
  <p>Bienvenido/a, {{ authStore.user.name }}</p>
</template>

<script setup>
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
</script>
