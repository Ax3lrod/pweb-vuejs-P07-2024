<template>
  <section
    class="top-0 w-full fit flex items-center bg-teal-700 text-white p-5 px-5"
  >
    <router-link to="/catalog" class="w-1/2 flex justify-start items-center">
      <h1 class="font-bold text-xl">PerpusIT</h1>
    </router-link>
    <div class="w-1/2 flex justify-end items-center relative">
      <button @click="toggleDropdown">
        <span v-if="username" class="text-lg font-medium"
          >Hi, {{ username }}</span
        >
      </button>

      <div
        class="p-5 w-40 h-fit bg-teal-600 text-white absolute right rounded-md drop-shadow-lg -bottom-24"
        v-if="dropdownActive"
      >
        <button class="text-semibold" @click="logout">Logout</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const username = ref<string | null>(null);
const dropdownActive = ref(false);

function toggleDropdown() {
  dropdownActive.value = !dropdownActive.value;
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  username.value = null;
  router.push("/login");
}

onMounted(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    username.value = storedUsername;
  }
});
</script>
