<template>
  <main
    class="w-full min-h-screen flex-col flex justify-center items-center bg-teal-600 gap-20"
  >
    <h1 class="font-bold text-4xl lg:text-6xl text-center text-white">
      Selamat Datang di PerpusIT
    </h1>
    <form
      @submit.prevent="handleRegister"
      class="gap-5 p-10 w-[90%] lg:w-2/5 h-fit bg-white border-2 rounded-md border-black drop-shadow-lg flex flex-col items-center"
    >
      <h1 class="font-bold text-xl">Register</h1>
      <div class="w-full h-fit">
        <label for="username" class="font-medium text-sm">Username</label>
        <input
          id="username"
          type="text"
          v-model="username"
          class="w-full p-2 border-2 border-black rounded-md"
          placeholder="Input your username."
          required
        />
      </div>
      <div class="w-full h-fit">
        <label for="email" class="font-medium text-sm">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          class="w-full p-2 border-2 border-black rounded-md"
          placeholder="Input your email."
          @input="validateEmail"
          :class="emailError ? 'border-red-500' : ''"
          required
        />
        <p v-if="emailError" class="text-sm text-red-500">
          Invalid email format.
        </p>
      </div>
      <div class="w-full h-fit">
        <label for="password" class="font-medium text-sm">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          class="w-full p-2 border-2 border-black rounded-md"
          placeholder="Input your password."
          @input="validatePassword"
          :class="passwordError ? 'border-red-500' : ''"
          required
        />
        <p v-if="passwordError" class="text-sm text-red-500">
          Password must be at least 8 characters, include an uppercase letter, a
          lowercase letter, and a number.
        </p>
      </div>
      <button
        type="submit"
        class="w-full p-2 mt-4 text-white bg-teal-700 rounded-md hover:bg-teal-800"
        :disabled="emailError || passwordError"
      >
        Register
      </button>
      <p class="text-sm mt-2">
        Sudah punya akun?
        <router-link to="/login" class="text-teal-600 hover:underline">
          Login di sini
        </router-link>
      </p>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const emailError = ref(false);
const passwordError = ref(false);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailRegex.test(email.value);
};

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  passwordError.value = !passwordRegex.test(password.value);
};

const handleRegister = async () => {
  if (emailError.value || passwordError.value) {
    alert("Please fix the errors before submitting.");
    return;
  }

  try {
    const response = await fetch(
      "https://pweb-express-mongodb-p07-2024.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed.");
    }

    const data = await response.json();
    alert("Registration successful! You can now log in.");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }
};
</script>
