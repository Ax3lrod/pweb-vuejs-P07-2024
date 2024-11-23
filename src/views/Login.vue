<template>
  <main
    class="w-full min-h-screen flex-col flex justify-center items-center bg-teal-600 gap-20"
  >
    <h1 class="font-bold text-4xl lg:text-6xl text-center text-white">
      Selamat Datang di PerpusIT
    </h1>
    <form
      @submit.prevent="handleLogin"
      class="gap-5 p-10 w-[90%] lg:w-2/5 h-fit bg-white border-2 rounded-md border-black drop-shadow-lg flex flex-col items-center"
    >
      <h1 class="font-bold text-xl">Login</h1>
      <div class="w-full h-fit">
        <label for="username" class="font-medium text-sm"
          >Username / Email</label
        >
        <input
          id="username"
          type="text"
          v-model="username"
          class="w-full p-2 border-2 border-black rounded-md"
          placeholder="Input your username or email."
          required
        />
      </div>
      <div class="w-full h-fit">
        <label for="password" class="font-medium text-sm">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          class="w-full p-2 border-2 border-black rounded-md"
          placeholder="Input your password."
          required
        />
      </div>
      <button
        type="submit"
        class="w-full p-2 mt-4 text-white bg-teal-700 rounded-md hover:bg-teal-800"
      >
        Login
      </button>
      <p class="text-sm mt-2 text-center">
        Belum punya akun?
        <router-link to="/register" class="text-teal-600 hover:underline">
          Daftar Sekarang
        </router-link>
      </p>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const username = ref("");
const password = ref("");

const router = useRouter();
const route = useRoute();

const handleLogin = async () => {
  try {
    const response = await fetch(
      "https://pweb-express-mongodb-p07-2024.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("username", data.data.user.username);

    router.push("/catalog");
  } catch (error) {
    alert(error.message);
  }
};
</script>
