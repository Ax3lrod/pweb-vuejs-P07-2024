<template>
  <Navbar />
  <main class="w-full min-h-screen flex-col items-center justify-center pt-20">
    <button
      @click="toggleForm"
      class="mb-5 p-3 bg-green-500 text-white rounded hover:bg-green-700"
    >
      {{ showForm ? "Tutup Form Tambah Buku" : "Tambah Buku" }}
    </button>

    <AddBookForm v-if="showForm" />

    <h1 v-if="isLoading" class="font-bold text-xl text-center w-full">
      Loading...
    </h1>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full p-5 justify-items-center"
    >
      <template v-for="book in books" :key="book.title">
        <div
          @click="goToBookDetail(book._id)"
          class="cursor-pointer w-[300px] h-[400px] p-5 bg-white border-2 rounded-md border-black drop-shadow-lg hover:scale-105 transition-transform"
        >
          <div class="w-full h-4/5 rounded-md">
            <img
              :src="book.coverImage"
              alt="Book Cover"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <h1 class="font-bold text-xl truncate">{{ book.title }}</h1>
          <p class="text-sm">{{ book.author }}</p>
          <div class="flex">
            <p class="text-sm">⭐{{ book.rating.average }}</p>
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
import AddBookForm from "@/components/AddBookForm.vue";
import type { Book } from "@/types/Book";

const isLoading = ref(true);
const books = ref<Book[]>([]);
const showForm = ref(false);
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

    const data: Book[] = await response.json();
    books.value = data;
  } catch (error) {
    alert("An error occurred while fetching books.");
  } finally {
    isLoading.value = false;
  }
};

const toggleForm = () => {
  showForm.value = !showForm.value;
};

const goToBookDetail = (_id: string) => {
  router.push(`/book/${_id}`);
};

onMounted(() => {
  fetchBooks();
});
</script>
