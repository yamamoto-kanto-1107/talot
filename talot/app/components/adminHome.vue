<template>
    <v-container>
        <div align="right" class="mb-3">
            <v-btn variant="outlined" to="/admin/createUser">新規作成</v-btn>
        </div>
        <v-card>
            <v-card-title align="center">ユーザー</v-card-title>
            <v-divider></v-divider>
            <v-data-table class="ma-3" :headers="tableHead" :items="users">
                <template v-slot:[`item.delete`]="{ item }">
                    <v-icon :icon="mdiDelete" @click="deleteItem(item.id,item.name)" color="red"></v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-card class="mt-10">
            <v-card-title align="center">管理者ユーザー</v-card-title>
            <v-divider></v-divider>
            <v-data-table class="ma-3" :headers="tableHead" :items="admin">
                <template v-slot:[`item.delete`]="{ item }">
                    <v-icon :icon="mdiDelete" @click="deleteAdminItem(item.id,item.name)" color="red"></v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup>
import { mdiDelete } from "@mdi/js";

const { deleteLoginUser,deleteAdminUser } = useLogin()
const { getUsers,getAdmin } = useLogin()

const users = ref([]);
const admin = ref([])
const tableHead = [
    { title: 'id', key: 'id' },
    { title: '名前', key: 'name' },
    { title: 'メールアドレス', key: 'email' },
    { title: 'パスワード', key: 'password'},
    { title: '削除', key:'delete'}
]

users.value = await getUsers();
admin.value = await getAdmin()

const deleteItem = async function(id,name){
    const judgeDelete = window.confirm(`${name}を削除してもいいですか？`)
    if (judgeDelete){
        const deleteResult = await deleteLoginUser(id)

        if(deleteResult){
            window.location.reload()
            return true
        }else{
            alert(`${name}を削除できませんでした。`)
        }
    }else{
        return
    }
}

const deleteAdminItem = async function(id,name){
    const judgeAdminDelete = window.confirm(`${name}を削除してもいいですか？`)
    if (judgeAdminDelete){
        const deleteAdminResult = await deleteAdminUser(id)

        if(deleteAdminResult){
            window.location.reload()
            return true
        }else{
            alert(`${name}を削除できませんでした。`)
        }
    }else{
        return
    }
}

</script>