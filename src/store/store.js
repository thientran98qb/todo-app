import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import db from '../firebase'

Vue.use(Vuex);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [],
        loading: true
    },
    getters: {
        countTodoNotDone(state) {
            return state.todos.filter(todo => !todo.done).length
        },
        allDone(state, getters) {
            return getters.countTodoNotDone != 0
        },
        todoFilters(state) {
            if (state.filter === 'all') {
                return state.todos
            } else if (state.filter === 'active') {
                return state.todos.filter(el=>el.done)
            } else {
                return state.todos.filter(el=>!el.done)
            }
        },
        hasCompleted(state) {
            return state.todos.findIndex(todo => todo.done) !== -1 ? true : false;
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                done: false,
                edit: false
            })
        },
        removeItem(state, id) {
            const index = state.todos.findIndex(todo => todo.id === id)
            state.todos.splice(index, 1);
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id)
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'done': todo.done,
                'edit': todo.edit,
            })
        },
        checkAllTodo(state, checked) {
            state.todos.forEach(el => el.done = checked)
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(el => !el.done)
        },
        changeFilter(state, filter) {
            state.filter = filter
        },
        retrieveData(state, todos) {
            state.todos = todos
        }
    },
    actions: {
        retrieveData() {
            console.log(db.collection('todos').get());
            // const snapshot = await db.collection('todos').get();
            // snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            // });

            // context.commit('retrieveData', response.data)
            
        },
        addTodo(context, todo) {
            axios.post('/todo', {
                title: todo.title,
                done: false
            })
                .then(response => {
                    context.commit('addTodo', response.data)
                })
                .catch(err => console.log(err))
        },
        removeItem(context, id) {
            axios.delete('/todo/' + id)
                .then(() => {
                    context.commit('removeItem', id);
                })
                .catch(err => console.log(err))
        },
        updateTodo(context, todo) {
            axios.patch('/todo/' + todo.id, {
                title: todo.title,
                done: todo.done
            })
                .then(response => {
                    context.commit('updateTodo', response.data);
                })
                .catch(err => console.log(err))
        },
        checkAllTodo(context, checked) {
            axios.patch('/checkAllTodo' ,{
                done: checked
            })
                .then(() => {
                    context.commit('checkAllTodo', checked);
                })
                .catch(err => console.log(err))
        },
        clearCompleted(context) {
            const todos = store.state.todos.filter(el => el.done === 1).map(el => el.id)
            axios.delete('/destroyCompleted' ,{
                data: {
                    todos: todos
                }
            })
                .then(() => {
                    context.commit('clearCompleted');
                })
                .catch(err => console.log(err))
        },
        changeFilter(context, filter) {
            context.commit('changeFilter', filter);
        }
    }
});
