<script>
import axios from "axios";
export default{
    name:"Login",
    data() {
        return {
            formData:{
                username: "",
                password: "",
            }
        };
    },
    methods:{
        async login(){
            let portNum = 8081;
            //fetch user information
            let link = `http://127.0.0.1:${portNum}/login`;
            try{
                let result = await axios.post(link,{
                    ...this.formData
                });
                if (result.data.code == 1){
                    localStorage.setItem("user-info",JSON.stringify( {...this.formData, "jwt_token":result.data.data}));
                    this.$router.push({ name: 'HomePage' });
                }else{
                    alert(result.data.message)
                }
            }catch(error){
                alert("无法登陆，检查后端服务器")
            }
            
            
            //    this.$router.push({ name: "Home"});
        },
        async signUp(){
            //fetch user information
            // let link = `http://localhost:3000/users?username=${this.username}&password=${this.password}`
            // let result = await axios.get(link);
            // if (result.status == 200 && result.data.length > 0){
            //     localStorage.setItem("user-info", JSON.stringify(result.data));
            //     this.$router.push({ name: 'Home' });
            // }
            this.$router.push({name:"Signup"})
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if (user){
            this.$router.push({name:"HomePage"});
        }
    }
}
</script>

<template>
    <!-- <img src="../assets/logo.svg" class="logo" /> -->
    <div class="container">
        <h1>Login</h1>
        <div class="Register">
            <input type="text" v-model="formData.username" placeholder="Enter Username" />
            <input type="password" v-model="formData.password" placeholder="Enter Password" />
            <button v-on:click="login">Login</button>
            <button v-on:click="signUp">signUp</button>
        </div>
    </div>

</template>


<style scoped>
.container H1{
    display: flex;
    justify-content: space-around;
    font-size: 3em;
}
.Register input{
    width: 200px;
    height: 30px;
    border: 1px solid black;
}
.Register button{
    width: 100px;
    height: 30px;
    border-radius: 25px;
    text-align: center;
    cursor: pointer;
}

.Register button:disabled {
  cursor: default;
  opacity: .3;
}

.Register button:hover {
  background-image: linear-gradient(#51A9EE, #147BCD);
  border-color: #1482D0;
  text-decoration: none;
}

.Register button:active {
  background-image: linear-gradient(#3D94D9, #0067B9);
  border-color: #006DBC;
  outline: none;
}

.Register button:focus {
  box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
  outline: none;
}


</style>

