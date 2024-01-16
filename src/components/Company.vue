<template>
    <NavBar></NavBar>
    <div class="container">
        <h1>Company Page</h1>
        <button style="display: block;
    margin-left: auto;"
    @click="insertHandler">Insert new Record</button>
        <form class="selecter" v-on:submit.prevent="formHandler">
            <label style="margin-right: 20px;">Name</label>
            <input type="text" placeholder="输入关键字" v-model="formData.name">

            <button style="margin-left: auto;">submit</button>
        </form>
        <table class="tablestyle">
            <th>DepartmentID</th>
            <th>Name</th>
            <th>CreateTime</th>
            <th>Actions</th>
            <tr v-for="(dep,index) in departments" :key=index>
                <td>{{dep.id}}</td>
                <td>{{dep.name}}</td>
                <td>{{dep.createTime}}</td>
                <td><button @click="updateHandler(id,dep)" style="margin-left: 10px;">Update</button><button style="margin-left: 10px;" @click="deleteHandler(dep.id)">Delete</button></td>
            </tr>
        </table>
        <!-- delete -->
        <ConfirmWindow
        v-if="showConfirmWindow"
        :onConfirm="handleConfirm"
        :onCancel="closeAWindows"
        />
        <!-- update -->
        <CompanyWindow 
        v-if="showUpdateWindow"
        :onConfirm="closeAWindows"
        :onCancel="closeAWindows"
        :dept = "selectedDept"
        @handleUpdate="handleUpdate"
        />
        <!-- insert -->
        <CompanyWindow 
        v-if="showInsertWindow"
        :onConfirm="closeAWindows"
        :onCancel="closeAWindows"
        @handleInsert="handleInsert"
        />
    </div>
</template>
  
<script>
import NavBar from "./NavBar.vue"
import axios from "axios"
import ConfirmWindow from "./ConfirmWindow.vue"
import CompanyWindow from "./CompanyWindow.vue"
export default {
    name: 'Company',
    components:{NavBar, ConfirmWindow, CompanyWindow},
    data(){
        return {
            departments:[{
                id:1,
                name:"IT",
                createTime:"none"
            },{
                id:2,
                name:"HR",
                createTime:"none"
            },{
                id:3,
                name:"ADMIN",
                createTime:"none"
            },{
                id:4,
                name:"FreeLoader",
                createTime:"none"
            }],
            formData:{name:""},
            showConfirmWindow:false,
            showUpdateWindow:false,
            showInsertWindow:false,
            selectedDepId:null,
            selectedDept:null
        }
    },
    methods:{
        async formHandler(){
            const searchDeptLink = "http://127.0.0.1:8081/depts";
            axios.get(searchDeptLink,{
                params:{
                    ...this.formData
                }
            }).then(response => {
                console.log(response)
                if(response.data.code == 1){
                    this.departments = response.data.data;
                }else{
                    alert("Error")
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        insertHandler(){
            this.showInsertWindow = true;
        },
        updateHandler(id,dept){
            this.selectedDepId = id;
            this.selectedDept = dept;
            this.showUpdateWindow=true;
        },
        deleteHandler(id){
            this.selectedDepId = id;
            this.showConfirmWindow=true;
        },
        handleConfirm() {
            //proceed to delete this record from the database with id

            const deleteDeptLink = `http://127.0.0.1:8081/depts/${this.selectedDepId}`;
            axios.delete(deleteDeptLink, {}).then(
                response =>{
                    if(response.data.code == 1){
                        //delete success
                        //remove the item from the view
                        this.departments = this.departments.filter(dep => dep.id != this.selectedDepId);
                    }
                }
            ).catch(function(e){
                console.log(e);
            });
            this.showConfirmWindow = false;
        },
        handleUpdate(data){
            console.log("receveing data: ", data)
            const updateDepLink = `http://127.0.0.1:8081/depts`;
            axios.put(updateDepLink, {
                ...data
            }).then(
                response =>{
                    console.log(response);
                    if(response.data.code == 1){
                        this.loadAllData();
                    }
                }
            ).catch(function(e){
                console.log(e);
            });
        },
        handleInsert(data){
            console.log("receveing data: ", data)
            const insertDepLink = `http://127.0.0.1:8081/depts`;
            axios.post(insertDepLink, {
                ...data
            }).then(response => {
                console.log(response)
                if(response.data.code == 1){
                    this.loadAllData()
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        closeAWindows() {
            //close the pop up window
            this.showConfirmWindow = false;
            this.showUpdateWindow = false;
            this.showInsertWindow= false;
        },
        loadAllData(){
            const getDeptsLink = "http://127.0.0.1:8081/depts";
            axios.get(getDeptsLink, {
                params:{...this.formData}
            }).then(response =>{
                // console.log(response.data.data)
                this.departments = response.data.data
            }).catch(function(error){
                console.log(error);
            })
        }
    },
    mounted(){
        
        let user = localStorage.getItem('user-info');
        if (!user){
            this.$router.push({name:"Login"});
        }else{
            this.loadAllData();
        }
    }

}
</script>
  
<style scoped>
.selecter{
    padding: 2px;
    display: flex;
    justify-content: space-between;
    margin: 5px;
    margin-bottom: 20px;
}
.selecter input{
    width: 3.5cm;
    border-radius: 5px;
}

.selecter button{
    cursor: pointer;
}

</style>