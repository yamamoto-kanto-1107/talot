<template>
    <v-container class="mx-auto">
        <v-btn variant="outlined" class="mb-3" :icon="mdiArrowLeft" to="/admin/home"></v-btn>
        <div  align="center">
            <v-card class="w-50">
                <v-card-title align="center">新規ユーザー作成</v-card-title>
                <v-divider></v-divider>
                <v-card-item>
                    <v-form ref="form" @submit.prevent>
                        <v-text-field label="名前" class="w-50 text-left my-3" v-model="name" :rules="[rules.required]" ></v-text-field>
                        <v-text-field label="メールアドレス" class="w-50 text-left mb-3" v-model="email" :rules="[rules.required]"></v-text-field>
                        <v-text-field
                            label="パスワード"
                            class="w-50 text-left"
                            v-model="password"
                            :rules="[rules.required]"
                            :append-inner-icon="show ? mdiEye : mdiEyeClosed"
                            @click:append-inner="show = !show"
                            :type="show ? 'text' : 'password'" >
                        </v-text-field>
                        <v-switch class="w-50" label="admin" color="red" v-model="isAdmin"></v-switch>
                        <v-btn variant="outlined" class="mt-3" @click="createUser" type="submit">作成</v-btn>
                    </v-form>
                </v-card-item>
            </v-card>
        </div>
    </v-container>
</template>
<script setup>
import { mdiArrowLeft,mdiEye,mdiEyeClosed } from "@mdi/js";
const name = ref()
const email = ref()
const password = ref()
const isAdmin = ref()

const show =ref(true)

const form = ref()

const rules = {
  required: (value) => !!value || "この項目は必須です",
};

const { addLoginUser,addAdminUser } = useLogin()

const createUser = async function(){
    const varidResult = await form.value.validate()
    if (varidResult.valid){
        const insertData = {
            name:name.value,
            email:email.value,
            password:password.value
        }
        try{
            if(!isAdmin.value){
                const result = await addLoginUser(insertData)

                if (result){
                    await navigateTo('/admin/home')
                }else{
                    alert('ユーザーの登録に失敗しました')
                }
            }else{
                const AdminResult = await addAdminUser(insertData)

                if(AdminResult){
                    await navigateTo('/admin/home')
                }else{
                    alert('管理者ユーザーの登録に失敗しました')
                }
            }

        }catch(e){
            console.log('errorが発生しました')
            console.log(e)
        }
    }
}

</script>