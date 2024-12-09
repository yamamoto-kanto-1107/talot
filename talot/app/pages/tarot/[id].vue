<template>
    <div>
        <talot-title :title="talot.name" :items="talots" v-model="input" class="mb-3" />
         <talot-all-luck :item="talot" />
    </div>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;
const { getters } = useTalot();
const { talots } = useTalot();

const input = ref("");
const talot = await getters(id);
console.log(talot)
const items = ref(getters.talots)

const drawer = ref(false)

</script>