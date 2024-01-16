import { createRouter, createWebHashHistory } from "vue-router"
import Home from "./components/Home"
import Employee from "./components/Employee"
import Company from "./components/Company"
import test from "./components/test"
import Login from "./components/Login"
import Signup from "./components/Signup"

const routes = [
    {
        name:"Login",
        component:Login,
        path:"/"
    },
    {
        name:"Signup",
        component:Signup,
        path:"/signup"
    },
    {
        name:"HomePage",
        component:Home,
        path:"/home",
    },
    {
        name:"Employee",
        component:Employee,
        path:"/employee",
    },
    {
        name:"Company",
        component:Company,
        path:"/company",
    },{
        name:"Test",
        component:test,
        path:"/test"
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router