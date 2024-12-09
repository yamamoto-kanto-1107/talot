<template>
    <v-container max-width="1500">
        <v-row>
            <v-col>
                <v-row>
                    <v-card
                    class="backgroundCard"
                    width="600"
                    >
                        <v-card-title class="font-weight-bold text-center" style="height: 40px;">
                            <div class="text-wrap text-decoration-underline">{{ item.background.title }}</div>
                        </v-card-title>
                        <div class="text-wrap ma-3" align="center" style="font-size: 14px;">{{ item.background.confirm }}</div>
                        <v-table class="ma-3">
                            <thead>
                                <tr>
                                    <th class="bg-red-lighten-4 text-center font-weight-bold">正位置のキーワード</th>
                                    <th class="bg-indigo-lighten-4 text-center font-weight-bold" color="black">逆位置のキーワード</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(normal, index) in item.background.normal" :key="index">
                                    <td class="text-wrap">{{ normal }}</td>
                                    <td class="text-wrap">{{ item.background.reverse[index] }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-row>
                <v-row class="mt-10">
                    <v-col>
                        <v-row class="position-relative">
                            <img
                                :src="generateImgPath(item.img)"
                                height="500"
                                style="object-fit: cover; width: 300px;"
                            />
                            <v-card class="backgroundCard position-absolute w-50" style="right: 50px;">
                                <div class="text-wrap ma-3" style="font-size: 14px">{{ item.imgContent }}</div>
                            </v-card>
                            <v-card class="backgroundCard position-absolute w-50" style="right: 50px; top: 250px;">
                                <div class="text-wrap ma-3" style="font-size: 14px">{{ item.imgContent2 }}</div>
                            </v-card>
                            <v-card class="backgroundCard position-absolute w-50" style="right: 50px; top: 400px;">
                                <div class="text-wrap ma-3" style="font-size: 14px">{{ item.imgContent3 }}</div>
                            </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-row>
                <v-col style="padding: 0px;" class="mt-3">
                    <v-row justify="space-around" wrap>
                        <v-table class="ml-8">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th class="text-center bg-red-lighten-4 ">正位置の意味</th>
                                    <th class="text-center bg-indigo-lighten-4">逆位置の意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="content in item.contents" :key="content.title">
                                    <td class="text-wrap  font-weight-bold" >{{ content.title }}</td>
                                    <td class="text-wrap">
                                        {{ content.normal.join("\n") }}
                                        <!-- <div v-for="(text, index) in content.normal" :key="index">
                                            {{ text }}
                                        </div> -->
                                    </td>
                                    <td class="text-wrap">{{ content.reverse.join("\n") }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-row>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const generateImgPath = ref((img) => {
    return new URL(`../assets/images/${img}`, import.meta.url).href;
});
</script>

<style>
.allContent {
    border: 2px solid #E1BEE7 !important;
}
.backgroundCard{
    border:2px solid #84331F !important;
}
.text-wrap {
    white-space: pre-wrap;
    word-wrap: break-word;
}

</style>
