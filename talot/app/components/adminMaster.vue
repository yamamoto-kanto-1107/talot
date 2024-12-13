<template>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field label="名前" v-model="search"></v-text-field>
        </v-col>
        <v-col>
          <v-select label="カテゴリ１" :items="category1" v-model="searchCategory1"></v-select>
        </v-col>
        <v-col>
          <v-select label="カテゴリ２" :items="category2" v-model="searchCategory2"></v-select>
        </v-col>
        <v-col class="d-flex align-center">
          <div>
            <v-btn @click="newItem" variant="outlined">新規作成</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="filterTable" :search="search">
                <template v-slot:[`item.action`]="{ item }">
                    <v-icon :icon="mdiPencil" @click="editItem(item)" class="mr-3" color="blue"></v-icon>
                    <v-icon :icon="mdiDelete" @click="deleteTalot(item.id,item.name)" color="red"></v-icon>
                </template>
            </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup>
definePageMeta({
    middleware:['admin']
})
import { ref } from 'vue'
import { mdiPencil,mdiDelete } from "@mdi/js";

const { talots, setPreview, getTalots,deleteItem } = useTalot();
const headers = [
    { title: '名前', key: 'name' },
    { title: 'カテゴリ１', key: 'category1' },
    { title: 'カテゴリ２', key: 'category2' },
    { title: 'Actions', key: 'action'}
]

const TalotsData = ref()
TalotsData.value = await getTalots()

const category1 = ['大アルカナ', '小アルカナ']
const category2 = ['なし','カップ','ペンタクル','ソード','ワンド']

const search = ref('')
const searchCategory1 = ref('')
const searchCategory2 = ref('')


const filterTable = computed(() =>{
    return TalotsData.value.filter(item =>{
        const matchSearch = item.name.toLowerCase().includes(search.value.toLowerCase());
        const matchCategory1 = searchCategory1.value ? item.category1 === searchCategory1.value : true;
        const matchCategory2 = searchCategory2.value ? item.category2 === searchCategory2.value : true;

        return matchSearch & matchCategory1 & matchCategory2
    })
})

const editItem = function(item){
  console.log(item)
  setPreview(item);
  navigateTo(`/admin/Alcana/${item.id}`);
}

const newItem = function(){
  setPreview();
  navigateTo(`/admin/Alcana/0`);
}

const deleteTalot = async function(id,name){
  const judgeDelete = window.confirm(`${name}を削除してもいいですか？`)
  if (judgeDelete){
    const deleteResult = await deleteItem(id)

    if (deleteResult){
      window.location.reload()
    }else{
      alert(`${id}を削除することができませんでした`)
    }
  }else{
    return
  }
}
</script>
