<template>
    <v-container>
        <v-row>
            <adminSide />
            <AdminMaster />
        </v-row>
        <!-- {{ a }}

        <v-text-field v-model="b.text"/> -->
    </v-container>
</template>

<script setup>
definePageMeta({
    middleware:['admin']
})
const a = {
    text: "aaaa",
    name: "b"
}

// const b = ref(a)
const b = ref(JSON.parse(JSON.stringify(a)))
</script>