<template>
    <div class="card">
        <div class="form-todo">
            <form action="" @submit.prevent="submit">
            <div class="form-inline">
                <input 
                type="text" 
                placeholder="What's making today ?" 
                v-model="textInput" 
                class="form-control"
                >
                <div>
                <button 
                    class="btn-submit" 
                    type="submit" 
                    :disabled="textInput === ''"
                >
                    Add Todo
                </button>
                </div>
            </div>
            </form>
        </div>
        <ul class="todo__list">
            <div class="todo__list--items">
                <div v-if="$store.state.loading" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                    <li 
                        v-for="(todo, index) in todoFilters" 
                        :key="todo.id" 
                    >
                        <item-todo 
                            :todo="todo"
                            :checkAll="!allDone"
                            :index="index"
                        />
                    </li>
                </transition-group>
            </div>
            <div class="footer" v-if="$store.state.todos.length > 0">
                <div class="footer-top">
                    <todo-check-all></todo-check-all>
                    <todo-item-remaining></todo-item-remaining>
                </div>
                <div class="footer-bottom">
                    <todo-filtered></todo-filtered>
                    <todo-clear-completed></todo-clear-completed>
                </div>
            </div>
            <div v-else>Please enter todo item</div>
        </ul>
    </div>
</template>
<script>
import ItemTodo from './ItemTodo.vue';
import TodoItemRemaining from './TodoItemRemaining.vue';
import TodoCheckAll from './TodoCheckAll.vue';
import TodoFiltered from './TodoFiltered.vue';
import TodoClearCompleted from './TodoClearCompleted.vue';

import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'ListTodo',
    components: {
        ItemTodo,
        TodoItemRemaining,
        TodoCheckAll,
        TodoFiltered,
        TodoClearCompleted
    },
    data() {
        return {
            dataBeforeEdit: '',
            textInput: '',
        }
    },
    created() {
        this.$store.dispatch('retrieveData');
    },
    computed: {
        allDone() {
            return this.$store.getters.allDone;
        },
        todoFilters() {
            return this.$store.getters.todoFilters;
        },
    },
    methods: {
        submit() {
            if (this.textInput === '') {
                return;
            }
            this.$store.dispatch('addTodo', {
                id: uuidv4(),
                title: this.textInput
            });
            this.textInput = '' 
        }
    }
}
</script>
<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
    .form-todo {
        margin-bottom: 10px;
    }
    .card {
        background-color: #fff;
        border: 1px solid #ebebeb;
        box-shadow: 0 3px 10px rgba(0, 0, 0 , .2);
        border-radius: 3px;
        padding: 15px;
        margin: 15px 0;
    }
    .todo__list {
        &--items {
            padding: 15px 0;
        }
        &--item {
            padding: 10px;
            font-size: 17px;
            box-shadow: 0 3px 4px rgb(1 1 1 / 10%);
            letter-spacing: 1px;
            background-color: #fff;
            color: #000;
            margin-bottom: 5px;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            animation-duration: 0.3s;
            &:last-child {
                border-bottom: none;
            }
            &:hover {
                cursor: pointer;
                opacity: 0.9;
            }
        }
    }
    .footer {
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-top: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;
        }
        &-bottom {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    ///css loading
    .lds-spinner {
    color: gray;
    display: block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: auto;
    }
    .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
    }
    .lds-spinner div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 3px;
        left: 37px;
        width: 6px;
        height: 18px;
        border-radius: 20%;
        background: gray;
    }
    .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
    }
    .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
    }
    .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
    }
    .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
    }
    .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
    }
    .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
    }
    .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
    }
    .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
    }
    .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
    }
    .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
    }
    .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
    }
    .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
    }
    @keyframes lds-spinner {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
    }
</style>
