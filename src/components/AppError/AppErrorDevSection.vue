<script setup lang="ts">
defineProps<{
    message: string;
    customCode: number;
    code: string;
    statusCode: number;
    hint: string | null;
    details: string;
    stack: string;
}>();
</script>

<template>
    <div>
        <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
        <h1 class="error__code">{{ customCode || code }}</h1>
        <p class="error__status" v-if="statusCode">Status code: {{ statusCode }}</p>
        <p class="error__msg">{{ message }}</p>
        <p v-if="hint">Hint: {{ hint }}</p>
        <p v-if="details">Details: {{ details }}</p>
        <div class="error__stack" v-if="stack">
            <h3>Stack:</h3>
            <p>{{ stack }}</p>
        </div>
        <div class="error-footer">
            <p class="error-footer__text">You'll find lots to explore on the home page.</p>
            <RouterLink to="/">
                <Button class="max-w-36"> Back to homepage </Button>
            </RouterLink>
        </div>
    </div>
</template>
