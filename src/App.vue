<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <AuthLayout>
        <RouterView v-slot="{ Component, route }">
            <Suspense v-if="Component" :timeout="0">
                <component :is="Component" :key="route.name"></component>
                <template #fallback>
                    <span>Loading...</span>
                </template>
            </Suspense>
        </RouterView>
    </AuthLayout>
</template>
