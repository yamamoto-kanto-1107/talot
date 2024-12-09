<template>
    <v-container>
        <v-row>
            <v-form style="width: 100%;" ref="form" v-model="valid">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="8">
                            <v-btn :icon="mdiArrowLeft" variant="outlined" class="mb-3" to="/admin/cardMaster"></v-btn>
                        </v-col>
                        <v-col cols="4" justify= "end">
                            <div class="d-flex align-center">
                                <v-btn class="mr-3" variant="outlined" color="success" @click="gotoPreview">プレビュー</v-btn>
                                <v-btn variant="outlined" color="info" @click="saveInfo" type="submit">保存</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-tabs v-model="tab">
                        <v-tab> カード基本情報</v-tab>
                        <v-tab>運勢の情報</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item>
                            <v-row>
                                <v-col class="align-center justify-center pt-10">
                                    <v-file-input label="画像" v-model="imgFile" accept="image/*" density="compact" class="my-5" @change="insertImg"/>
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
                                                        <v-btn size="32" variant="outlined" :icon="mdiMinus" @click="deleteText(preview.background.normal, normalIndex)"></v-btn>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div>
                                                <v-btn size="32" :icon="mdiPlus" variant="outlined" @click="addText(preview.background.normal)"></v-btn>
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
                                                        <v-btn size="32" variant="outlined" :icon="mdiMinus" @click="deleteText(preview.background.reverse, reverseIndex)"></v-btn>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div>
                                                <v-btn size="32" :icon="mdiPlus" variant="outlined" @click="addText(preview.background.reverse)"></v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tabs-window-item>
                        <v-tabs-window-item>
                            <div class="w-100" v-for="(content, key) in preview.contents" :key="content.id">
                                <div align="center" class="my-3">
                                    <v-btn variant="text" @click="open(key)">{{ content.title }} <v-icon :icon="openTabs[key] ? mdiMenuDown : mdiMenuUp"></v-icon> </v-btn>
                                </div>
                                <v-row class="align-center justify-center" v-if="openTabs[key]">
                                    <v-col cols="6">
                                        <v-row class="mb-10 pa-3">
                                            <v-col class="bg-red-lighten-5" style="border: 1px solid #FFEBEE; border-radius: 3%;">
                                                <h3 class="mb-4">正位置の意味</h3>
                                                <div v-for="(normal,normalIndex) in preview.contents[key].normal" :key="normalIndex" class="mb-6">
                                                    <v-row align="center">
                                                        <v-col cols="10">
                                                            <v-text-field v-model="preview.contents[key].normal[normalIndex]" :rules="[rules.required]"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2" class="d-flex justify-center">
                                                            <v-btn size="32" variant="outlined" :icon="mdiMinus" @click="deleteText(preview.contents[key].normal, normalIndex)"></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                                <div align="center">
                                                    <v-btn size="32" :icon="mdiPlus" variant="outlined" @click="addText(preview.contents[key].normal)" :rules="[rules.required]"></v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-row class="mb-10 pa-3">
                                            <v-col class="bg-blue-lighten-5" style="border: 1px solid #E3F2FD; border-radius: 3%;">
                                                <h3 class="mb-4">逆位置の意味</h3>
                                                <div v-for="(reverse,reverseIndex) in preview.contents[key].reverse" :key="reverseIndex" class="mb-6">
                                                    <v-row align="center">
                                                        <v-col cols="10">
                                                            <v-text-field v-model="preview.contents[key].reverse[reverseIndex]"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2" class="d-flex justify-center">
                                                            <v-btn size="32" variant="outlined" :icon="mdiMinus" @click="deleteText(preview.contents[key].reverse, reverseIndex)"></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                                <div align="center">
                                                    <v-btn size="32" :icon="mdiPlus" variant="outlined" @click="addText(preview.contents[key].reverse)"></v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-col>
            </v-form>
        </v-row>
    </v-container>
</template>

<script setup>
import { mdiArrowLeft, mdiMinus, mdiPlus, mdiMenuDown, mdiMenuUp, mdiEyeClosed } from '@mdi/js';

const route = useRoute();
const { getters, preview, setImg,insertTalotInfo } = useTalot();

const rules = {
    required: (value) => !!value || "この項目は必須です",
};

const items = ['大アルカナ','小アルカナ']
const items2 = ['ワンド','カップ','ソード','ペンタクル','なし']
const tab = ref()
const imgFile = ref()
const readImg = ref()
const form = ref()
const valid = ref(false)

const addText = (array) => {
    array.push([""]);
}

const insertImg = async function(){
    const reader = new FileReader()

    reader.onload = function(){
        readImg.value = reader.result
    }
    reader.readAsDataURL(imgFile.value)
    console.log(imgFile.value.name)
    preview.img = imgFile.value.name
}


const deleteText = (array, index) => {
    array.splice(index, 1);
}

const openTabs = ref({});
const open = (id) =>{
    openTabs.value[id] = !openTabs.value[id]

}

const gotoPreview = function(){
    setImg(readImg.value)
    navigateTo({ path : '/admin/preview' })
}

const saveInfo = function(){
    form.value.validate();
    if (valid.value){
        console.log('cass')
        const resultInsert = insertTalotInfo()
    }
}
</script>