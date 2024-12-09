<template>
    <div>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-navigation-drawer
            v-model="drawer"
            absolute
        >
            <v-list nav dense>
                <v-list-item to="/admin">
                    <v-list-item-title>ユーザー管理</v-list-item-title>
                </v-list-item>
                <v-list-item to="/admin/cardMaster">
                    <v-list-item-title >カードマスタ</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script setup>
const { talots } =useTalot()
const drawer = ref(true)

const litleArcana = ['エース',2,3,4,5,6,7,8,9,10,'ペイジ','ナイト','クイーン','キング']
</script>