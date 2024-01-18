<script>
import axios from "axios"
export default{
    name:"Signup",
    data() {
        return {
            confirmPassword:"",
            formData:{
              username:"",
              name:"",
              password: ""
            }
        };
    },
    methods:{
        async signUp(){
            //fetch user information
            try{
                if(this.formData.password != this.confirmPassword){
                  alert("Password doesn't match");
                  return;
                }
                const portNum=8081;
                let link = `http://127.0.0.1:${portNum}/signup`
                let result = await axios.post(link,{
                    ...this.formData
                });
                if (result.data.code == 1){
                    //sign up success, proceed to login page
                    this.$router.push({ name: 'Login' });
                }else{
                  alert(result.data.message);
                }
            }catch(e){
                console.log(e);
                alert(e);
            }
            
        }
    },
}
</script>

<template>
    <div class="container">
      <h1>Sign Up</h1>
      <div class="Register">
          <input type="text" v-model="formData.username" placeholder="Enter UserName" />
          <input type="text" v-model="formData.name" placeholder="Enter Name" />
          <input type="password" v-model="formData.password" placeholder="Enter Password" />
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" />
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

