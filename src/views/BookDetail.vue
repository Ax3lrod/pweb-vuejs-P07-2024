<template>
  <Navbar />
  <h1 v-if="isLoading" class="font-bold text-xl text-center w-full">
    Loading...
  </h1>
  <main
    class="w-full h-fit flex lg:flex-row flex-col items-center justify-center pt-10"
    v-if="!isLoading"
  >
    <section class="w-full lg:w-[40%] flex justify-center">
      <div class="w-[300px] h-[400px] overflow-hidden rounded-md">
        <img
          :src="book?.coverImage"
          alt="Book Cover"
          class="w-full h-full object-cover rounded-md border-2 border-black hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
    </section>
    <section
      class="w-full lg:w-[60%] flex flex-col items-center lg:items-start gap-2"
    >
      <h1 class="font-bold text-4xl mt-5">{{ book?.title }}</h1>
      <p class="text-lg">By {{ book?.author }}</p>
      <p class="text-lg">Rating: ⭐{{ book?.rating?.average }}</p>
      <p class="text-lg">Published on: {{ book?.publishedDate }}</p>
      <p class="text-lg">Quantity: {{ book?.qty }}</p>
      <p class="text-base mt-4 lg:w-3/5 w-[90%] text-center lg:text-left">
        {{ book?.description }}
      </p>
      <p class="font-semibold">Tags:</p>
      <div class="flex flex-wrap gap-2 lg:mt-4">
        <span
          v-for="(tag, index) in book?.tags"
          :key="tag"
          :class="`px-3 py-1 rounded-md text-white text-sm ${
            tagColors[index % tagColors.length]
          }`"
        >
          {{ tag }}
        </span>
      </div>
      <div class="flex lg:flex-row flex-col gap-4 mt-5">
        <!-- Tombol Back -->
        <button
          class="bg-teal-700 text-white rounded-md w-40 p-2 hover:bg-teal-800 hover:scale-95 hover:transition-transform"
          @click="goBack"
        >
          Back
        </button>

        <!-- Tombol Delete -->
        <button
          class="bg-red-700 text-white rounded-md w-40 p-2 hover:bg-red-800 hover:scale-95 hover:transition-transform"
          @click="handleDelete"
        >
          Delete
        </button>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Book } from "@/types/Book";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const book = ref<Book | null>(null);

const tagColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function goBack() {
  router.push("/catalog");
}

const fetchBookDetail = async () => {
  try {
    const response = await fetch(
      `https://pweb-express-mongodb-p07-2024.vercel.app/api/book/${route.params.id}`,
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
      throw new Error("Failed to fetch book details.");
    }

    book.value = await response.json();
  } catch (error) {
    alert("An error occurred while fetching book details.");
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async () => {
  try {
    if (confirm("Are you sure you want to delete this book?")) {
      const response = await fetch(
        `https://pweb-express-mongodb-p07-2024.vercel.app/api/book/${route.params.id}`,
        {
          method: "DELETE",
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
        throw new Error("Failed to delete the book.");
      }

      alert("Book deleted successfully!");
      router.push("/catalog");
    }
  } catch (error) {
    alert("Failed to delete the book. Please try again.");
  }
};

onMounted(() => {
  fetchBookDetail();
});
</script>
