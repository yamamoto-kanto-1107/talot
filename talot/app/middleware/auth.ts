export default defineNuxtRouteMiddleware(async (to, from) =>{
    const { currentUser } = useLogin()
    if(!currentUser.value && to.path !== '/'){
        return navigateTo('/')
    }
})

import { useLogin } from '@/composables/loginConfirms'