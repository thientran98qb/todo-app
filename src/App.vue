<template>
  <div id="app">
    <Header />
    <div class="main-section">
      <list-todo />
    </div>
  </div>
</template>

<script>
import ListTodo from './components/todos/ListTodo.vue'
import Header from './components/header/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    ListTodo
  },
  data() {
    return {
    
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
.container {
  width: 1050px;
  padding: 0 15px;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.main-section {
  padding: 50px 0;
  width: 500px;
  margin: 0 auto;
}
.form-inline {
  width: 100%;
  display: inline-flex;
}
.form-control {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: gray;
  flex: 1;
  &:focus-visible {
    outline: none;
    border: 1px solid gray;
  }
}
.btn-submit {
  border: none;
  background-color: #0d6efd;
  color: #fff;
  height: 100%;
  padding: 0 10px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.btn {
    background: transparent;
    display: inline-block;
    padding: 5px 6px;
    margin: 0 10px;
    color: black;
    border: 1px solid #4c4949;
    border-radius: 5px;
    cursor: pointer;
    &:hover, &.active {
        background: #0d6efd;
        border:1px solid #0d6efd;
        color: #fff;
    }
}
</style>
