/**
 * Creating an instance of the Vue class
 * */ 
var app = new Vue({
    el: '#app',
    data: { 
            userName: '',
            fullName: '',
            email: '',
            password: '',
            birthDate: ''
    },
    // submitting the post request to the database with the info
    methods: {
        submit: function (event){
            event.preventDefault();
            console.log({data:{userName:this.userName, fullName:this.fullName,email:this.email,password:this.password,birthDate:this.birthDate}});
            this.$http.post('/registration', {data:{userName:this.userName, fullName:this.fullName,email:this.email,password:this.password,birthDate:this.birthDate}}, (data) => {
                console.log(data);
            });
        }
    }
});