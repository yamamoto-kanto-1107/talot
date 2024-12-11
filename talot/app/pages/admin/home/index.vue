<template>
    <v-container>
        <v-row>
            <adminSide />
            <admin-home />
        </v-row>
    </v-container>
</template>
<script setup>
definePageMeta({
    middleware:['admin']
})
</script>
