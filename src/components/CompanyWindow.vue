<template>
    <div class="modal-overlay">
        <div class="modal">
            <h1>{{ title }}</h1>
            <div class="Register">
                <input type="text" v-model="FormData.name" placeholder="Enter Name" />
            </div>
            <button @click="confirm" style="margin-right: 30px;">Confirm</button>
            <button @click="onCancel">Cancel</button>
        </div>
    </div>
    </template>
    
    <script>
        export default{
            props:{
                title: {default:"Title", type:String},
                onConfirm: Function,
                onCancel: Function,
                dept: Object
            },
            data(){
                return {
                    FormData:{
                        name:"",
                        }
                }
            },
            methods:{
                confirm(){
                    this.$emit('handleUpdate',{...this.FormData});
                    this.$emit('handleInsert', {...this.FormData})
                    this.onConfirm();
                }
            },
            mounted(){
                if(this.dept){
                    this.FormData = {...this.dept};
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
        margin-bottom: 30px;
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