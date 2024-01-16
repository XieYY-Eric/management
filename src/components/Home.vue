<template>
    <NavBar></NavBar>
    <div class="container">
        <h1 style="letter-spacing: 5px;
    font-weight: bold;
    font-style: italic;">Management</h1>
        <p style="font-size: 1.5em;">Welcome to the management project, in this system, you can check your employee and companies</p>
        <br>
        <p style="font-size: 1.5em;">This project is connected to backend implemented in Java Spring boot, contact Eric for any problem</p>
        <br>
        <img class="homepage" src="homePageImage.png" alt="Image not found">
    </div>
       <!-- <div>
        <h1>Home Page</h1>
    </div> -->
</template>
  
<script>
import NavBar from "./NavBar.vue"
export default {
    name: 'HomePage',
    components:{NavBar},
    mounted(){
        let user = localStorage.getItem('user-info');
        if (!user){
            this.$router.push({name:"Login"});
        }
    }
}
</script>
  
<style scoped>
.homepage{
    width: 100%;
}

</style>
