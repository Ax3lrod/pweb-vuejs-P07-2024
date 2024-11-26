<template>
  <main
    class="w-full min-h-screen flex-col items-center justify-center bg-slate-100"
    :class="showForm ? 'overflow-y-hidden' : ''"
  >
    <AddBookForm v-if="showForm" />
    <Navbar />
    <div class="w-full p-5 flex items-center justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search books by title, author, or tag..."
        class="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>
    <button
      @click="toggleForm"
      class="p-5 text-white rounded-full font-bold text-5xl fixed bottom-5 right-5 z-30 transition-transform duration-300 flex items-center justify-center"
      :class="showForm ? 'bg-red-500 rotate-45' : 'bg-teal-500'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-8 h-8 transform transition-transform duration-300"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>

    <h1 v-if="isLoading" class="font-bold text-xl text-center w-full">
      Loading...
    </h1>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full p-5 justify-items-center max-w-[90%] justify-self-center"
    >
      <template v-for="book in filteredBooks" :key="book.title">
        <div
          @click="goToBookDetail(book._id)"
          class="cursor-pointer w-[300px] h-[550px] p-5 bg-white rounded-md drop-shadow-xl hover:scale-105 transition-transform"
        >
          <div class="w-full h-4/5 rounded-md">
            <img
              :src="book.coverImage"
              alt="Book Cover"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <h1 class="font-bold text-xl truncate">{{ book.title }}</h1>
          <p class="text-sm mb-1">{{ book.author }}</p>

          <div class="flex flex-wrap gap-2 mb-1">
            <span
              v-for="(tag, index) in book?.tags.slice(0, 2)"
              :key="tag"
              :class="`px-3 py-1 rounded-md text-white text-sm ${
                tagColors[index % tagColors.length]
              }`"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="text-md">⭐{{ book.rating.average }}</p>
            <p class="text-sm">Stock: {{ book.qty }}</p>
          </div>
        </div>
      </template>
    </section>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import AddBookForm from "@/components/AddBookForm.vue";
import Footer from "@/components/Footer.vue";
import type { Book } from "@/types/Book";

const isLoading = ref(true);
const books = ref<Book[]>([]);
const showForm = ref(false);
const searchQuery = ref("");
const router = useRouter();

const tagColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

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

const filteredBooks = computed(() =>
  books.value.filter((book) =>
    [book.title, book.author, ...(book.tags || [])]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
);

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
