<script setup lang="ts">
import { RouterView } from 'vue-router';
import AuthLayout from '@/components/Layout/main/AuthLayout.vue';
</script>

<template>
    <AuthLayout>
        <RouterView />
    </AuthLayout>
</template>
