<template>
    <div>
        <span>
            <input type="checkbox" @change="checkAllTodo" :checked="!allDone" name="checkAll" id="checkAll">
            <label for="checkAll"> Check All</label>
        </span>
    </div>
</template>
<script>
export default {
    name: 'todo-check-all',
    computed: {
        allDone() {
            return this.$store.getters.allDone;
        }
    },
    methods: {
        checkAllTodo(event) {
           this.$store.dispatch('checkAllTodo', event.target.checked);
        }
    }
}
</script>
