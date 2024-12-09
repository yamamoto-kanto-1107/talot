<template>
    <v-container>
        <v-card
        class="my-3 talotContent"
        >
            <v-card-text align="center">-目次-</v-card-text>
                <v-card-text align="center">
                    <v-list align="left" v-for="content in contentArr" :key="content.id">
                        <v-list-item :to='content.to'>{{ content.text2 }}</v-list-item>
                    </v-list>
                </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
const contentArr = [
    {
        id:0,
        text2:'Ⅰ.このカードの背景',
        to:'#talot-background'
    },
    {
        id:1,
        text2:'Ⅲ.全体運',
        to:'#all-luck'
    },
    {
        id:2,
        text2:'Ⅳ.恋愛運',
        to:'#恋愛運'
    },
    {
        id:3,
        text2:'Ⅴ.仕事運',
        to:'#仕事運'
    },
    {
        id:4,
        text2:'Ⅵ.金運',
        to:'#金運'
    },
    {
        id:5,
        text2:'Ⅰ.健康運',
        to:'#健康運'
    }
]
</script>

<style scoped>
.talotContent {
border: 2px solid #E1BEE7;
}
</style>
