<script setup lang="ts">
import { supabase } from './lib/supabaseClient';

const errorStore = useErrorStore();
const authStore = useAuthStore();

onErrorCaptured((error) => {
    errorStore.setError({ error });
});

onMounted(async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) await authStore.setAuth(data.session);
});
</script>

<template>
    <AuthLayout>
        <AppErrorPage v-if="errorStore.activeError" />
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
