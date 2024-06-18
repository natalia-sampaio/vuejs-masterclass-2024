<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
    <div>
        <h1>Project {{ route.params?.id }}</h1>
        <RouterLink to="/projects">Go to projects</RouterLink>
    </div>
</template>
