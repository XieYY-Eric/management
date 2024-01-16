<template>
    <!-- <h1>Header</h1> -->
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/employee">Employee</router-link>
        <router-link to="/company">Companies</router-link>
        <a v-on:click="logout" href="#">Quit</a>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    methods:{
        logout(){
            localStorage.removeItem("user-info");
            this.$router.push("Login");
        }
    }
}
</script>

<style>
.nav{
    background-color: black;
    overflow: scroll;
    border: solid 1px black;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: auto;
}
.nav a{
    float: left;
    color: #f2f2f2f2;
    padding: 2.5vh;
    text-align: center;
    font-size: 30px;
    text-decoration: none;
}
a:hover {
    background: #ddd;
    color: #333;
}
</style>