<template>
    <div>
        <button :class="['btn', {active: filter === 'all'}]" @click="changeFilter('all')">All Todo</button>
        <button :class="['btn', {active: filter === 'active'}]" @click="changeFilter('active')">All Done</button>
        <button :class="['btn', {active: filter === 'completed'}]" @click="changeFilter('completed')">All Not Done</button>
    </div>
</template>
<script>
export default {
    name: 'todo-filtered',
    computed: {
        filter() {
            return this.$store.state.filter;
        }
    },
    methods: {
        changeFilter(filter) {
            this.$store.dispatch('changeFilter',filter);
        }
    }
}
</script>
