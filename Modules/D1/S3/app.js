const app = Vue.createApp({
    data() {
        return {
            message: 'Welcome to BootCamp D1 S3',
            count: 0,
            link:'https://www.tfdevs.com',
            books: [
                { title: 'Book 1', image: './assets/book1.png', show: false },
                { title: 'Book 2', image: './assets/book2.png', show: false },
                { title: 'Book 3', image: './assets/book3.png', show: false }
            ]
        }
    },
    methods:{
        handleMouseOver(){
            this.count++
        },
        handleMouseLeave(){
            this.count = 0
        },
        handleDBClick(){
            this.count*=2
        },
    }
});
app.mount('#app');