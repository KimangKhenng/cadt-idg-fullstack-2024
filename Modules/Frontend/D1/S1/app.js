const app = Vue.createApp({
    data() {
        return {
            message: 'Welcome to Vue!',
            count: 0,
        };
    },
    methods:{
        increment(){
            this.count++
            if(this.count == 10){
                this.message = `You have reached ${this.count}`
            }else{
                this.message = `You have not reached ${this.count}`
            }
        },
        decrement(){
            this.count--
        }
    }
});
app.mount('#app');