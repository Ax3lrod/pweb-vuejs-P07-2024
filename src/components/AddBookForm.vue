<template>
  <main class="fixed w-full min-h-screen flex justify-center items-center py-20 inset-0 z-30 overflow-y-auto">
    <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
    <div class="lg:w-3/5 bg-white rounded-lg p-8 shadow-lg z-20 mt-32">
      <form @submit.prevent="handleAddBook">
        <h2 class="text-lg font-bold mb-4">Tambah Buku</h2>

        <div class="mb-4">
          <label for="title" class="block font-medium">Judul</label>
          <input
            v-model="form.title"
            id="title"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="author" class="block font-medium">Penulis</label>
          <input
            v-model="form.author"
            id="author"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="publishedDate" class="block font-medium"
            >Tanggal Terbit</label
          >
          <input
            v-model="form.publishedDate"
            id="publishedDate"
            type="date"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="publisher" class="block font-medium">Penerbit</label>
          <input
            v-model="form.publisher"
            id="publisher"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block font-medium">Deskripsi</label>
          <textarea
            v-model="form.description"
            id="description"
            class="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="tags" class="block font-medium"
            >Tag (pisahkan dengan koma)</label
          >
          <input
            v-model="tagsInput"
            id="tags"
            type="text"
            class="w-full border p-2 rounded"
          />
        </div>

        <div class="mb-4">
          <label for="coverImage" class="block font-medium"
            >Gambar Sampul (URL)</label
          >
          <input
            v-model="form.coverImage"
            id="coverImage"
            type="url"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="initialQty" class="block font-medium">Jumlah Buku</label>
          <input
            v-model.number="form.initialQty"
            id="initialQty"
            type="number"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <button type="submit" class="bg-blue-500 text-white p-2 rounded">
          Tambah Buku
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  title: "",
  author: "",
  publishedDate: "",
  publisher: "",
  description: "",
  coverImage: "",
  tags: [] as string[],
  initialQty: 1,
  rating: { average: 0, count: 0 },
  qty: 1,
});

const tagsInput = ref("");

const handleAddBook = async () => {
  // Pisahkan tags berdasarkan koma
  form.value.tags = tagsInput.value.split(",").map((tag) => tag.trim());

  // Sync `qty` dengan `initialQty`
  form.value.qty = form.value.initialQty;

  try {
    const response = await fetch(
      "https://pweb-express-mongodb-p07-2024.vercel.app/api/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form.value),
      }
    );

    if (!response.ok) {
      throw new Error("Gagal menambahkan buku.");
    }

    alert("Buku berhasil ditambahkan!");
    router.push("/catalog"); // Refresh halaman katalog
  } catch (error) {
    alert(error.message);
  }
};
</script>
