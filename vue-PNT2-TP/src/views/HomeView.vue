<template>
  <div class="max-w-7xl mx-auto text-center">
    <!-- Hero Section -->
    <section
      class="rounded-lg shadow-lg p-8 mb-10 bg-hero-background bg-center h-80 flex flex-col items-center justify-center"
    >
      <h1 class="text-4xl font-bold mb-4 text-primary">
        ¡Bienvenido a la Biblioteca Circular!
      </h1>
      <p class="mb-6 text-primary text-xl">
        Encuentra, comparte y descubre libros con una comunidad de apasionados
        por la lectura.
      </p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="/public/remote-work.svg"
          alt="Libros"
          class="w-full h-56 object-fill rounded-lg mb-4"
        />
        <h3 class="text-xl font-semibold text-primary mb-2">
          Explorá nuevos libros
        </h3>
        <p class="text-gray-600 mb-4">
          Encontrá una amplia variedad de libros en nuestra biblioteca. Novelas,
          poesía, ¡hay de todo!
        </p>
        <RouterLink to="/books" class="text-secondary hover:text-secondary-dark"
          >Descubrir Libros &rarr;</RouterLink
        >
      </div>

      <div
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="/public/book-and-people.svg"
          alt="Comparte Libros"
          class="w-full h-56 object-fill rounded-lg mb-4"
        />
        <h3 class="text-xl font-semibold text-primary mb-2">
          Compartí tu colección
        </h3>
        <p class="text-gray-600 mb-4">
          ¿Tenés libros que ya no lees? Subilos a nuestra plataforma y permití a
          otros disfrutarlos.
        </p>
        <RouterLink
          to="/books/add"
          class="text-secondary hover:text-secondary-dark"
          >Subir Libros &rarr;</RouterLink
        >
      </div>
      <div
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="/public/men-and-women-with-resolved.svg"
          alt="Usuarios"
          class="w-full h-56 object-fill rounded-lg mb-4"
        />
        <h3 class="text-xl font-semibold text-primary mb-2">
          Conectate con usuarios
        </h3>
        <p class="text-gray-600 mb-4">
          Conocé a otros lectores apasionados, intercambiá libros y ¡que la
          circulación de libros comience!
        </p>
        <RouterLink to="/users" class="text-secondary hover:text-secondary-dark"
          >Ver Usuarios &rarr;</RouterLink
        >
      </div>
    </section>
  </div>
</template>

<script setup></script>
