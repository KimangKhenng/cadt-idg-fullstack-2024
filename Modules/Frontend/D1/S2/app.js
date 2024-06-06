const app = Vue.createApp({
    data() {
        return {
            todos:[],
            complete: [],
            task: ''
        };
    },
    methods:{
        addToList(){
            if (this.task.trim() !== '') {
                this.todos.push(this.task)
                this.task = ''
            }
        },
        deleteTask(index){
            console.log("Hello")
        },
        completeTask(index){
            console.log("Complete")
        }
    }
});
app.mount('#app');