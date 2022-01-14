<template>
    <div class="todo__list--item">
        <input type="checkbox" v-model="done" @change="itemEdited" />
        <span 
            :class="{ completed : done}"
            v-if="!edit"
            @dblclick="editItem"
            >{{ title }}
        </span>
        <input type="text" v-else v-model="title" 
            @keydown.esc="cancelEdit" 
            @blur="itemEdited" 
            @keydown.enter="itemEdited" name="todo"
        >
        <button class="btn" @click="pluralize">Pluralize</button>
        <div @click="removeItem(id)">&times;</div>
    </div>
</template>
<script>
export default {
    name: 'ItemTodo',
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        checkAll() {
            this.done = this.checkAll ? true : this.todo.done
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            done: this.todo.done,
            edit: this.todo.edit,
            dataBeforeEdit: ''
        }
    },
    created() {
        eventBus.$on('pluralize', this.handlePluralize);
    },
    beforeDestroy() {
        eventBus.$off('pluralize', this.handlePluralize)
    },
    methods: {
        handlePluralize() {
            this.title = this.title + 's';
            this.$store.dispatch('updateTodo', {
                'id': this.id,
                'title': this.title,
                'done': this.done,
                'edit': this.edit
            });
        },
        pluralize() {
            eventBus.$emit('pluralize');
        },
        removeItem(index) {
            this.$store.dispatch('removeItem', index);
        },
        editItem() {
            this.dataBeforeEdit = this.title
            this.edit = true;
        },
        itemEdited() {
            if(this.title.trim().length === 0) {
                this.title = this.dataBeforeEdit;
            }
            this.edit = false
            this.$store.dispatch('updateTodo', {
                'id': this.id,
                'title': this.title,
                'done': this.done,
                'edit': this.edit
            });
        },
        cancelEdit() {
            this.title = this.dataBeforeEdit
            this.edit = false
        },
    }
}
</script>
<style scoped lang="scss">
    .completed {
        text-decoration: line-through;
    }
</style>
