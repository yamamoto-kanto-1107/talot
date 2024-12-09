export const useLogin = () =>{
    const supabase = useNuxtApp().$supabase
    const users = ref([])

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
    const actions = {
        getUsers: async() =>{
            await fetchUsers()
            console.log(users.value)
            return users.value
        },
        signinWithEmailAndPassword: async (email, password) => {
            await fetchUsers()
            if (users.value.find(v=>v.email === email && v.password === password)){
                return true
            }else{
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
        }
    };
    return {
        users,
        ...actions,
    }
}