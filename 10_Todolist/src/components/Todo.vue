<template>
  <section class="todolist">
    <header>
      <input type="text" placeholder="Ajouter une tache" v-model="newTodo" @keyup.enter="addTodo" />
      <ul class="filter">
        <li>
          <a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a>
        </li>
        <li>
          <a
            href="#"
            :class="{selected: filter === 'todo'}"
            @click.prevent="filter = 'todo'"
          >À faire</a>
        </li>
        <li>
          <a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a>
        </li>
      </ul>
    </header>
    <main>
      <ul>
        <li
          v-for="todo in filteredTodos"
          :key="todo.key"
          class="todo"
          :class="{completed: todo.completed, editing: todo === editing}"
        >
          <div>
            <label class="checkbox">
              <input type="checkbox" v-model="todo.completed" />
              <span class="checkmark"></span>
            </label>
            <p @dblclick.prevent="editTodo(todo)">{{ todo.name }}</p>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input
            type="text"
            v-model="todo.name"
            @keyup.enter="doneEdit"
            @blur="doneEdit"
            @keyup.esc="cancelEdit"
            v-focus="todo === editing"
          />
        </li>
      </ul>
    </main>
    <footer v-show="hasTodos">
      <label class="checkbox">
        <input type="checkbox" v-model="allDone" />
        <span class="checkmark"></span>
        <p>{{ remaining }} tâches à faire</p>
      </label>

      <button @click.prevent="deleteCompleted" v-show="hasCompleted">Supprimer les tâches faites</button>
    </footer>
  </section>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      filter: "all",
      editing: null,
      oldTodo: ""
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        key: this.todos.length,
        name: this.newTodo,
        completed: false,
        editing: false
      });

      this.newTodo = "";
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo);
    },
    deleteCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    editTodo(todo) {
      this.editing = todo;
      this.oldTodo = todo.name;
    },
    doneEdit() {
      this.editing = null;
    },
    cancelEdit() {
      this.editing.name = this.oldTodo;
      this.doneEdit();
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    filteredTodos() {
      if (this.filter === "todo") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === "done") {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    },
    hasTodos() {
      return this.todos.length > 0;
    },
    hasCompleted() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  directives: {
    focus(el, value) {
      if (value) {
        Vue.nextTick(() => {
          el.focus();
        });
      }
    }
  }
};
</script>

<style src="./todo.css">
</style>