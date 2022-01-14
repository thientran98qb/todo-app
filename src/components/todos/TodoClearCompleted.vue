<template>
    <div>
        <button class="btn" v-show="hasCompleted" @click="clearCompleted">Clear completd</button>
    </div>
</template>
<script>
export default {
    name: 'todo-clear-completed',
    computed: {
        hasCompleted() {
            return this.$store.getters.hasCompleted;
        }
    },
    methods: {
        clearCompleted() {
           this.$store.dispatch('clearCompleted');
        }
    }
}
</script>
