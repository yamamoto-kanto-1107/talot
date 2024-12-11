export default defineNuxtRouteMiddleware(async (to, from) =>{
    console.log('call')
    const { currentUser } = useLogin()
    console.log(currentUser.value)
    console.log('after')
    if(!currentUser.value && to.path !== '/'){
        return navigateTo('/')
    }
})

import { useLogin } from '@/composables/loginConfirms'