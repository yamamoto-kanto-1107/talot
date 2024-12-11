const currentUser =ref()
const currentAdmin =ref()
export const useLogin = () =>{
    const supabase = useNuxtApp().$supabase
    const users = ref([])
    const adminUsers = ref([])


    const fetchUsers = async () =>{
        const {data, error} = await supabase
            .from('users')
            .select('id, name, email, password')
        if (error){
            console.log(error)
        }else{
            users.value = data
        }
    }

    const fetchAdmin = async () =>{
        const {data:adminData,error:adminError} = await supabase
            .from('admin')
            .select('id,name,email,password')
        if(adminError){
            console.log(adminError)
        }else{
            adminUsers.value = adminData
        }
    }
    const actions = {
        getUsers: async() =>{
            await fetchUsers()
            console.log(users.value)
            return users.value
        },
        getAdmin: async() =>{
            await fetchAdmin()
            return adminUsers.value
        },
        signinAdmin:async(email,password) =>{
            await fetchAdmin()
            console.log(adminUsers.value)
            if(adminUsers.value.find(v=>v.email === email && password === password)){
                currentAdmin.value = true
                return true
            }else{
                currentAdmin.value = false
                return false
            }
        },
        signinWithEmailAndPassword: async (email, password) => {
            await fetchUsers()
            if (users.value.find(v=>v.email === email && v.password === password)){
                currentUser.value = true
                return true
            }else{
                currentUser.value = false
                return false
            }
        },
        deleteLoginUser:async(id) =>{
            console.log(id)
            const { err } = await supabase
                .from('users')
                .delete()
                .eq('id',id)

            if(err){
                console.log(err)
                return false
            }else{
                return true
            }
        },
        deleteAdminUser:async(id) =>{
            const { err } = await supabase
                .from('admin')
                .delete()
                .eq('id',id)

            if(err){
                console.log(err)
                return false
            }else{
                return true
            }
        },
        addLoginUser:async (insertData) =>{
            console.log(insertData)
            const { err } = await supabase
                .from('users')
                .insert([insertData])
            if (err){
                console.log(err)
                return false
            }else{
                return true
            }
        },
        addAdminUser:async(insertData) =>{
            const { error } = await supabase
                .from('admin')
                .insert([insertData])
            if(error){
                console.log(error)
                return false
            }else{
                return true
            }
        }
    };
    return {
        users,
        currentUser,
        currentAdmin,
        ...actions,
    }
}