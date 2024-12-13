export default defineNuxtRouteMiddleware(async (to, from) =>{
    const {currentAdmin} = useLogin()

    if(!currentAdmin.value && to.path !== '/admin/login'){
        return navigateTo('/admin/login')
    }
})

import { useLogin } from '@/composables/loginConfirms'