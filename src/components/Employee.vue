<template>
    <NavBar></NavBar>
    <div class="container">
        <h1>Employee Page</h1>
        <button style="display: block;
    margin-left: auto;"
    @click="insertHandler">Insert new Record</button>
        <form class="selecter" v-on:submit.prevent="formHandler" id="selecterF">
            <label>Name</label>
            <input type="text" placeholder="输入关键字" v-model="formData.name">
            <label>Gender</label>
            <input type="number" placeholder="输入性别" v-model="formData.gender">
            <label>EnrollDateBegin</label>
            <input type="text" placeholder="输入入职时间(yyyy-mm-dd)" v-model="formData.enrollDateStart">
            <label>EnrollDateEnd</label>
            <input type="text" placeholder="输入入职时间(yyyy-mm-dd)" v-model="formData.enrollDateEnd">
            <button>submit</button>
        </form>
        <div style="overflow-x:auto;">
            <table class="tablestyle">
            <th>Name</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Title</th>
            <th>CreateTime</th>
            <th>Salary</th>
            <th>Action</th>
            <tr v-for="(emp,index) in employees" :key=index>
                <td>{{emp.name}}</td>
                <td>{{emp.gender}}</td>
                <td><img :src= emp.image alt="what"/></td>
                <td>{{emp.title}}</td>
                <td>{{emp.createTime}}</td>
                <td>{{emp.salary}}</td>
                <td><button @click="UpdateHandler(emp)" style="margin-left: 10px;">Update</button><button @click="deleteHandler(emp.id)" style="margin-left: 10px;">Delete</button></td>
            </tr>
        </table>
        </div>
        
        <ConfirmWindow
        v-if="showConfirmWindow"
        :onConfirm="handleDeleteConfirm"
        :onCancel="closeAWindows"
        />
        <EmployeeWindow
        v-if="showUpdateWindow"
        title="Update Window"
        :onConfirm="closeAWindows"
        :onCancel="closeAWindows"
        :emp="selectedEmp"
        @updateNewEmp="updateNewEmp"
        />

        <EmployeeWindow
        v-if="showInsertWindow"
        title="Insert Window"
        :onConfirm="closeAWindows"
        :onCancel="closeAWindows"
        @addNewEmp="addNewEmp"
        />

        <div class="pageOption">
            <label>PageSize</label>
            <input type="number" 
            placeholder="输入页面大小" 
            v-model="formData.pageSize" 
            style="margin-right: auto;"
            min=1>
            <label v-on:click="toFirstPage" class="arrows">&lt;&lt;</label>
            <label @click="previousPage" class="arrows">&lt;</label>
            <input type="number" value=1 
            v-model="formData.page"
            min=1>
            <label @click="nextPage" class="arrows">></label>
            <label v-on:click=toLastPage class="arrows">>></label>
        </div>
    </div>
</template>
  
<script>
import NavBar from "./NavBar.vue"
import axios from "axios"
import ConfirmWindow from "./ConfirmWindow.vue"
import EmployeeWindow from "./EmployeeWindow.vue"
export default {
    name: 'Employee',
    components:{NavBar, ConfirmWindow, EmployeeWindow},
    data(){
        return {
            employees:[{
                id:1,
                name: "SA",
                gender: 2,
                image: "default.webp",
                title: 2,
                createTime: "2024-01-05",
                salary: 12000
            },{
                id:2,
                name: "SA1",
                gender: 2,
                image: "default.webp",
                title: 2,
                createTime: "2024-01-05",
                salary: 12000
            },{
                id:3,
                name: "SA2",
                gender: 1,
                image: "default.webp",
                title: 1,
                createTime: "2024-01-05",
                salary: 12000
            },{
                id:4,
                name: "SA3",
                gender: 2,
                image: "default.webp",
                title: 1,
                createTime: "2024-01-05",
                salary: 12000
            }],
            formData:{
                name:"",
                enrollDateStart:"",
                enrollDateEnd:"",
                pageSize:10,
                page:1
            },
            totalRecords:0,
            showConfirmWindow: false,
            showUpdateWindow:false,
            showInsertWindow:false,
            confirmationText: "",
            selectedEmployeeId: null,
            selectedEmp:null,
        }
    },
    methods:{
        async formHandler(){
            console.warn("Button pressed"+ JSON.stringify(this.formData))
            const getEmployeeLink = "http://127.0.0.1:8081/employees/selection";
            axios.get(getEmployeeLink, {
                params:{...this.formData}
            }).then(response =>{
                console.log(response.data.data)
                if(response.data.code == 1){
                    this.employees = response.data.data.rows;
                }
                
                // console.log(this.employees)
            }).catch(function(error){
                console.log(error);
            });
        },
        toFirstPage(){
            this.formData.page = 1;
            this.loadData();
        },
        toLastPage(){
            this.formData.page = Math.min(Math.ceil(this.totalRecords / this.formData.pageSize),10);
            this.loadData();
        },
        previousPage(){
            if(this.formData.page > 1){
                this.formData.page-=1;
                this.loadData();
            } 
        },
        nextPage(){
            const max_page = Math.ceil(this.totalRecords / this.formData.pageSize);
            if(this.formData.page < max_page){
                this.formData.page+=1;
                this.loadData();
            }
          
        },
        UpdateHandler(emp){
            this.selectedEmp = emp;
            this.showUpdateWindow= true;
        },
        //show 
        deleteHandler(id){
            this.selectedEmployeeId = id;
            this.showConfirmWindow=true;
        },
        insertHandler(){
            //display the window
            this.showInsertWindow=true;
            
        },
        //do the delete api call
        handleDeleteConfirm() {
            //proceed to delete this record from the database with id
            this.showConfirmWindow = false;
            this.employees = this.employees.filter(emp => emp.id != this.selectedEmployeeId);
      
            const deleteEmployeeLink = `http://127.0.0.1:8081/employees/${this.selectedEmployeeId}`;
            axios.delete(deleteEmployeeLink, {}).then(
                response =>{
                    if(response.data.code == 1){
                        //delete success
                        //remove the item from the view
                        this.employees = this.employees.filter(emp => emp.id != this.selectedEmployeeId);
                    }else{
                        console.log(response.data)
                    }
                }
            ).catch(function(e){
                console.log(e);
            });
        },
        //close the window
        closeAWindows() {
            //close the pop up window
            this.showConfirmWindow = false;
            this.showUpdateWindow = false;
            this.showInsertWindow= false;
        },
        updateNewEmp(data){
            console.log("recieveing data:", data)
            const updateEmpLink = `http://127.0.0.1:8081/employees`;
            axios.put(updateEmpLink, {
                ...data
            }).then(
                response =>{
                    console.log(response);
                    if(response.data.code == 1){
                        //update success
                        // empIndex = this.employees.findIndex((emp => emp.id == selectedEmp.id ))
                        // this.employees[empIndex] = response.data.data;
                        this.loadData();
                    }
                }
            ).catch(function(e){
                console.log(e);
            });
        },
        addNewEmp(emp){
            console.log("recieve data", emp);
            //do the api
  
            const insertEmployeeLink = "http://127.0.0.1:8081/employees"
            axios.post(insertEmployeeLink, {
                ...emp
            }).then(response => {
                console.log(response)
                if(response.data.code == 1){
                    this.loadData();
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        loadData(){
            const getEmployeeLink = "http://127.0.0.1:8081/employees/selection";
            axios.get(getEmployeeLink, {
                params:{...this.formData}
            }).then(response =>{
                // console.log(response.data.data)
                if(response.data.code == 1){
                    this.employees = response.data.data.rows;
                    this.totalRecords = response.data.data.total;
                }
                
                // console.log(this.employees)
            }).catch(function(error){
                console.log(error);
            });
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if (!user){
            this.$router.push({name:"Login"});
        }else{
            this.loadData();
        }
    }

}
</script>

<style scoped>
.selecter{
    padding: 2px;
    display: block;
    justify-content: space-between;
    margin: 5px;
    margin-bottom: 20px;
}
.selecter input{
    width: 3.5cm;
    border-radius: 5px;
}

.selecter button:hover{
    cursor: pointer;
}
.selecter label, .selecter input{
    margin-right:10px;
}
.pageOption{
    display: flex;
}

.pageOption input{
    width: 30px;
}
img{
    width: 50px;
    height: 50px;
}

.arrows{
    margin-left: 10px;
    margin-right: 10px;
}   
.arrows:hover{
    cursor: pointer;
    background-color: cyan;
}
</style>
  
