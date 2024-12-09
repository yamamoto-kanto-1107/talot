<template>
    <v-container>
        <div align="right" class="mb-3">
            <v-btn variant="outlined" to="/admin/createUser">新規作成</v-btn>
        </div>
        <v-card>
            <v-card-title align="center">管理者画面</v-card-title>
            <v-divider></v-divider>
            <v-data-table class="ma-3" :headers="tableHead" :items="users">
                <template v-slot:[`item.delete`]="{ item }">
                    <v-btn :icon="mdiDelete" @click="deleteItem(item.id,item.name)" variant="outlined">
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup>
import { mdiDelete } from "@mdi/js";

const { deleteLoginUser } = useLogin()
const { getUsers } = useLogin()

const users = ref([]);
const tableHead = [
    { title: 'id', key: 'id' },
    { title: '名前', key: 'name' },
    { title: 'メールアドレス', key: 'email' },
    { title: 'パスワード', key: 'password'},
    { title: '削除', key:'delete'}
]

users.value = await getUsers();

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

</script>