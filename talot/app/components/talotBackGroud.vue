<template>
    <v-container>
        
    </v-container>
</template>
<script setup>
const props = defineProps(
    {
        backgroudCard: {
            type: String,
            default: "",
            required: true,
        },
        normalPosition:{
            type:String,
            default:"",
            required: true
        },
        reversePosition:{
            type:String,
            default:"",
            required:true
        }
    },
);
</script>

<style>
.backgroundContent{
    border: 2px solid #E1BEE7;
}
.normal{
    white-space: pre-wrap;
}

</style>
