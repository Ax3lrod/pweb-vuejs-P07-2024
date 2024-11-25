<template>
  <Navbar />
  <main class="w-full h-fit flex justify-center pt-10">
    <section class="w-[40%] flex justify-center">
      <div class="w-[300px] h-[400px]">
        <img
          :src="book?.coverImage"
          alt="Book Cover"
          class="w-full h-full object-cover rounded-md border-8 border-black"
        />
      </div>
    </section>
    <section class="w-[60%] flex flex-col items-start">
      <h1 class="font-bold text-4xl mt-5">{{ book?.title }}</h1>
      <p class="text-lg">By {{ book?.author }}</p>
      <p class="text-lg">Rating: ⭐{{ book?.rating?.average }}</p>
      <p class="text-lg">Published on: {{ book?.publishedDate }}</p>
      <p class="text-lg">Quantity: {{ book?.qty }}</p>
      <p class="text-base mt-4 lg:w-3/5 w-[90%]">
        {{ book?.description }}
      </p>
      <div class="flex flex-wrap gap-2 mt-4">
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
      <button
        class="bg-teal-700 text-white rounded-md mt-5 w-40 p-2 hover:bg-teal-800 hover:scale-95 hover:transition-transform"
        @click="goBack"
      >
        Back
      </button>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Book } from "@/types/Book";
import Navbar from "@/components/Navbar.vue";

const route = useRoute();
const router = useRouter();
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

    if (!response.ok) {
      throw new Error("Failed to fetch book details.");
    }

    book.value = await response.json();
  } catch (error) {
    alert("An error occurred while fetching book details.");
  }
};

onMounted(() => {
  fetchBookDetail();
});
</script>
