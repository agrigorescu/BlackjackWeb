/**
 * Creating an instance of the Vue class
 * */ 
var app = new Vue({
    el: '#app',
    data: { 
            userName: '',
            password: ''
    },
    // submitting the post request to the Bee CLI to start running
    methods: {
        submit: function (event){
            event.preventDefault();
            console.log({data:{userName:this.userName, password:this.password}});
            this.$http.post('/login', {data:{userName:this.userName, password:this.password}}, (data) => {
                console.log(data);
            });
        }
    }
});

    