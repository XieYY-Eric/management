<template>
    <!-- <Home></Home> -->
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
    name: 'App',
    components: { RouterView }
}
</script>

<style>
body {
  background: linear-gradient(180deg, rgb(19.04, 37.45, 84.81) 0%, rgba(0, 32.49, 116.04, 0) 94.28%);
  border-color: #000000;
  /* box-shadow: 0px 4px 4px #00000040; */
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

.container{
    padding: 10px 50px 10px 50px;
    margin: 40px 30px 0px 30px;
    border: 10px solid black;
    border-radius: 45px;
    width: auto;
    height: 80vh;
}

.tablestyle{
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

.tablestyle td, .tablestyle th{
    border: 1px solid #ddd;
    padding: 8px;
}
.tablestyle tr:nth-child(even){
    background-color: #f2f2f2;
}
.tablestyle tr:nth-child(odd){
    background-color: #9d9595;
}

.tablestyle tr:hover{
    background-color: #ddd;
}

.tablestyle th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #477f95;
    color: white;
}
button:hover{
    cursor: pointer;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.Register{
    background-color: #355170;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 5%;
    border: solid 1px black;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
</style>
