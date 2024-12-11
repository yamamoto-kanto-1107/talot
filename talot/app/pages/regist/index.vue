<template>
    <v-container class="fill-height d-flex flex-column align-center justify-center">
        <v-card width="320">
            <v-card-title align="center">新規登録画面</v-card-title>
            <v-card-action>
                <v-col>
                    <v-row class="ma-3">
                        <v-text-field label="氏名" v-model="name"></v-text-field>
                    </v-row>
                    <v-row class="ma-3">
                        <v-text-field label="メールアドレス" v-model="mailAddress"></v-text-field>
                    </v-row>
                    <v-row class="ma-3">
                        <v-text-field label="パスワード" type="password" v-model="password"></v-text-field>
                    </v-row>
                    <v-row justify="center" class="my-5">
                        <v-btn variant="outlined" to="/home">登録</v-btn>
                    </v-row>
                </v-col>
            </v-card-action>
        </v-card>
    </v-container>
</template>

<script setup>
definePageMeta({
    middleware:['admin']
})
const name =ref('')
const mailAddress = ref('')
const password = ref('')
</script>