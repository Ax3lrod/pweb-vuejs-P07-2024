<template>
  <Navbar />
  <main class="w-full min-h-screen flex-col items-center justify-center">
    <h1 class="font-bold text-4xl lg:text-6xl text-center text-white">
      Katalog Buku
    </h1>
    <section class="flex flex-wrap gap-5 items-center w-full p-5">
      <h1
        v-if="isLoading"
        class="font-bold text-xl text-center justify-self-center w-full"
      >
        Loading...
      </h1>
      <template v-for="book in books" :key="book._id">
        <div
          class="w-[300px] h-[400px] p-5 bg-white border-2 rounded-md border-black drop-shadow-lg justify-self-center"
        >
          <div class="w-full h-4/5 rounded-md">
            <img
              :src="book.coverImage"
              alt="Book Cover"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <h1 class="font-bold text-xl">{{ book.title }}</h1>

          <p class="text-sm">{{ book.author }}</p>

          <div class="flex">
            <p class="text-sm">{{ book.rating.average }}</p>
          </div>
        </div>
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
const isLoading = ref(true);

const books = ref([]);
const router = useRouter();

const fetchBooks = async () => {
  try {
    const response = await fetch(
      "https://pweb-express-mongodb-p07-2024.vercel.app/api/book",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 403) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }

    const data = await response.json();
    books.value = data;
    isLoading.value = false;
  } catch (error) {
    console.error(error.message);
    alert("An error occurred while fetching books.");
  }
};

onMounted(() => {
  fetchBooks();
});
</script>
