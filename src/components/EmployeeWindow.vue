<template>
<div class="modal-overlay">
    <div class="modal">
        <h1>{{ title }}</h1>
        <div class="Register">
            <input type="text" v-model="FormData.username" placeholder="Enter Username" />
            <input type="text" v-model="FormData.name" placeholder="Enter Name" />
            <img :src="FormData.image" alt="Not displayed" @click="openFileInput"/>
            <input type="file" id="file" ref="fileInput" @change="handleFileChange" style="display: none;">
            <input type="number" v-model="FormData.gender" placeholder="Enter gender" />
            <input type="number" v-model="FormData.title" placeholder="Enter title" />
            <input type="number" v-model="FormData.deptId" placeholder="Enter department"/>
            <input type="number" v-model="FormData.salary" placeholder="Enter Salary" />
        </div>
        <button @click="confirm" style="margin-right: 30px;">Confirm</button>
        <button @click="onCancel">Cancel</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';

    export default{
        props:{
            title: String,
            onConfirm: Function,
            onCancel: Function,
            emp: Object
        },
        data(){
            return {
                FormData:{
                    username:"",
                    image:null,
                    name:"",
                    gender:null,
                    title:null,
                    deptId:null,
                    salary:""}
            }
        },
        methods:{
            confirm(){
                this.$emit('addNewEmp',{...this.FormData});
                this.$emit('updateNewEmp', {...this.FormData})
                this.onConfirm();
            },
            handleFileChange(event) {
                const fileInput = event.target;
                if (fileInput.files && fileInput.files[0]) {
                    
                    // const newImageUrl = URL.createObjectURL(fileInput.files[0]);
                    // this.FormData.image = newImageUrl;

                    const uploadLink = "http://127.0.0.1:8081/upload";
                    let fd = new FormData();
                    fd.append('image', fileInput.files[0]);
                    axios.post(uploadLink,fd, {
                        headers:{
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response=>{
                        console.log(response);
                        if(response.data.code == 1){
                            //good response, set url
                            this.FormData.image = response.data.data;
                        }else{
                            console.log(response.data.message);
                        }
                    }).catch(e=>{
                        console.log(e);
                    })
                }
            },
            openFileInput() {
                // Trigger file input click
                this.$refs.fileInput.click();
            },
        },
        mounted(){
            if(this.emp){
                this.FormData = {...this.emp};
            }
            
        }
    }
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 60%;
    height: 80%;
}
.Register{
    background-color: aqua;
    justify-items: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
    padding: 40px 40px 40px 40px;
    border: solid 1px black;
    margin-bottom: 50px;
}

.Register img{
    width: 100px;
    height: 100px;
    border: 1px solid black;
    border-radius: 45%;
}
.Register img:hover{
    cursor: pointer;
}
.Register input{
    width: 200px;
    height: 30px;
    border: 1px solid black;
}
.modal button{
    width: 100px;
    height: 30px;
    border-radius: 25px;
    text-align: center;
    cursor: pointer;
}

.modal button:disabled {
  cursor: default;
  opacity: .3;
}

.modal button:hover {
  background-image: linear-gradient(#51A9EE, #147BCD);
  border-color: #1482D0;
  text-decoration: none;
}

.modal button:active {
  background-image: linear-gradient(#3D94D9, #0067B9);
  border-color: #006DBC;
  outline: none;
}

.modal button:focus {
  box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
  outline: none;
}
</style>