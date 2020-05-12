<template>
  <div id="app">
    <header>
      <h1>Todo list</h1>
    </header>
    <main>
      <Todo></Todo>
    </main>
  </div>
</template>

<script>
import Todo from "./components/Todo.vue";

export default {
  name: "App",
  components: {
    Todo
  }
};
</script>

<style src="./style.css">
</style>