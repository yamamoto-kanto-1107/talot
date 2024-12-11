export default defineNuxtRouteMiddleware(async (to, from) =>{
    const {currentAdmin} = useLogin()
    console.log(currentAdmin.value)

    if(!currentAdmin.value && to.path !== '/admin/login'){
        console.log('call admin')
        return navigateTo('/admin/login')
    }
})

import { useLogin } from '@/composables/loginConfirms'