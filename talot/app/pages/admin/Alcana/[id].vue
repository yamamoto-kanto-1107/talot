<template>
    <v-container>
        <v-row>
            <v-form style="width: 100%;" ref="form" v-model="valid">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="8">
                            <v-btn :icon="mdiArrowLeft" variant="outlined" class="mb-3" to="/admin/cardMaster" @click="clearImg"></v-btn>
                        </v-col>
                        <v-col cols="4" justify= "end">
                            <div class="d-flex align-center">
                                <v-btn class="mr-3" variant="outlined" color="success" @click="gotoPreview" height="50">プレビュー</v-btn>
                                <v-btn class="mr-3" variant="outlined" color="info" @click="saveInfo" height="50">保存</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-tabs v-model="tab">
                        <v-tab class="text-h6">カード基本情報</v-tab>
                        <v-tab class="text-h6">運勢の情報</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item>
                            <v-row>
                                <v-col class="align-center justify-center pt-10">
                                    <v-file-input label="画像" v-model="imgFile" accept="image/*" density="compact" class="my-5" @change="previewImg"/>
                                    <img :src="readImg" alt="" width="160" v-if="readImg">
                                    <img :src="preview.img" v-if="!readImg" width="160">
                                    <v-textarea class="my-6" label="画像の説明１" v-model="preview.imgContent" outlined dense :rules="[rules.required]"></v-textarea>
                                    <v-textarea class="my-6" v-model="preview.imgContent2" label="画像の説明２" outlined dense rows="1" :rules="[rules.required]"></v-textarea>
                                    <v-textarea class="my-6" v-model="preview.imgContent3" label="画像の説明３" outlined dense :rules="[rules.required]"></v-textarea>
                                    <v-textarea class="my-6" v-model="preview.name" label="名前" outlined dense :rules="[rules.required]"></v-textarea>
                                    <v-select class="my-6" :items="items" v-model="preview.category1" label="カテゴリ１" :rules="[rules.required]"></v-select>
                                    <v-select class="my-6" :items="items2" v-model="preview.category2" label="カテゴリ２" :rules="[rules.required]"></v-select>
                                    <v-text-field class="my-6" v-model="preview.no" label="並び順" :rules="[rules.required]"></v-text-field>
                                    <v-textarea class="my-6" v-model="preview.background.confirm" label="カードの背景" :rules="[rules.required]"></v-textarea>
                                    <v-row class="mb-10 mt-10">
                                        <v-col cols="5">
                                            <h2 class="mb-6">正位置の キーワード</h2>
                                            <div v-for="(normal,normalIndex) in preview.background.normal" :key="normalIndex" class="mb-3">
                                                <v-row align="center">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="preview.background.normal[normalIndex]" :rules="[rules.required]"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2" class="d-flex justify-center">
                                                        <v-icon :icon="mdiMinus" @click="deleteText(preview.background.normal, normalIndex)" color="orange"></v-icon>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div>
                                                <v-icon :icon="mdiPlus" @click="addText(preview.background.normal)" color="orange"></v-icon>
                                            </div>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col cols="5">
                                            <h2 class="mb-6">逆位置のキーワード</h2>
                                            <div v-for="(reverse,reverseIndex) in preview.background.reverse" class="mb-3" :key="reverseIndex">
                                                <v-row align="center">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="preview.background.reverse[reverseIndex]" :rules="[rules.required]"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2" class="d-flex justify-center">
                                                        <v-icon :icon="mdiMinus" color="orange" @click="deleteText(preview.background.reverse, reverseIndex)"></v-icon>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div>
                                                <v-icon :icon="mdiPlus" color="orange" @click="addText(preview.background.reverse)" ></v-icon>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tabs-window-item>
                        <v-tabs-window-item>
                            <v-expansion-panels class="mt-3">
                                <v-expansion-panel v-for="(content,index) in preview.contents" :key="index">
                                    <v-expansion-panel-title>
                                        <h3>{{ content.title }}</h3>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-row class="align-center justify-center">
                                            <v-col cols="6">
                                                <v-row class="mb-10 pa-3">
                                                    <v-col class="bg-red-lighten-5" style="border: 1px solid #FFEBEE; border-radius: 3%;">
                                                        <h4 class="mb-4">正位置の意味</h4>
                                                        <div v-for="(normal,normalIndex) in preview.contents[index].normal" :key="normalIndex" class="mb-6">
                                                            <v-row align="center">
                                                                <v-col cols="10">
                                                                    <v-text-field v-model="preview.contents[index].normal[normalIndex]" :rules="[rules.required]"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="2" class="d-flex justify-center">
                                                                    <v-icon :icon="mdiMinus" color="orange" @click="deleteText(preview.contents[index].normal, normalIndex)"></v-icon>
                                                                </v-col>
                                                            </v-row>
                                                        </div>
                                                        <div align="center">
                                                            <v-icon :icon="mdiPlus" @click="addText(preview.contents[index].normal)" color="orange"></v-icon>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                            <v-col cols="6">
                                                <v-row class="mb-10 pa-3">
                                                    <v-col class="bg-blue-lighten-5" style="border: 1px solid #E3F2FD; border-radius: 3%;">
                                                        <h4 class="mb-4">逆位置の意味</h4>
                                                        <div v-for="(reverse,reverseIndex) in preview.contents[index].reverse" :key="reverseIndex" class="mb-6">
                                                            <v-row align="center">
                                                                <v-col cols="10">
                                                                    <v-text-field v-model="preview.contents[index].reverse[reverseIndex]" :rules="[rules.required]"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="2" class="d-flex justify-center">
                                                                    <v-icon :icon="mdiMinus" @click="deleteText(preview.contents[index].reverse, reverseIndex)" color="orange"></v-icon>
                                                                </v-col>
                                                            </v-row>
                                                        </div>
                                                        <div align="center">
                                                            <v-icon :icon="mdiPlus" @click="addText(preview.contents[index].reverse)" color="orange"></v-icon>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-col>
            </v-form>
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    middleware:['admin']
})
import { mdiArrowLeft, mdiMinus, mdiPlus, mdiMenuDown, mdiMenuUp, mdiEyeClosed } from '@mdi/js';

const route = useRoute();
const { getters, preview, setPreviewImg,insertTalotInfo,getPreviewImg, clear} = useTalot();

const rules = {
    required: (value) => !!value || "この項目は必須です",
};

const items = ['大アルカナ','小アルカナ']
const items2 = ['ワンド','カップ','ソード','ペンタクル','なし']
const tab = ref()
const imgFile = ref([])
const readImg = ref()
const form = ref()
const valid = ref(false)


const addText = (array) => {
    array.push([""]);
}

readImg.value =  getPreviewImg()

const previewImg = function(){
    console.log(imgFile.value)
    if(imgFile.value){
        const reader = new FileReader()
        reader.onload = function(e){
            readImg.value = e.target.result
        }
        reader.readAsDataURL(imgFile.value)
    }
}

const deleteText = (array, index) => {
    array.splice(index, 1);
}

const openTabs = ref({});
const open = (id) =>{
    openTabs.value[id] = !openTabs.value[id]

}

const gotoPreview = function(){
    if(readImg.value){
        setPreviewImg(readImg.value)
    }
    navigateTo({ path : '/admin/preview' })
}

const saveInfo =async function(){
    preview.img = imgFile.value.name
    const resultInsert = await insertTalotInfo(imgFile.value)

    if (resultInsert){
        navigateTo({path:'/admin/cardMaster'})
    }else{
        alert('データを保存できませんでした。')
    }

}

const generateImgPath = ref((img) => {
    return new URL(`/assets/images/${img}`, import.meta.url).href;
});

const clearImg = () =>{
    clear()
}

</script>