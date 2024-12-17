<script setup lang="ts">
const router = useRouter();

const errorStore = useErrorStore();

const error = ref(errorStore.activeError);

const message = ref('');
const customCode = ref(0);
const details = ref('');
const code = ref('');
const hint = ref('');
const statusCode = ref(0);
const stack = ref('');

if (error.value && !('code' in error.value)) {
    message.value = error.value.message;
    customCode.value = error.value.customCode ?? 0;
    stack.value = error.value.stack ?? '';
}

if (error.value && 'code' in error.value) {
    message.value = error.value.message;
    details.value = error.value.details;
    hint.value = error.value.hint;
    code.value = error.value.code;
    statusCode.value = error.value.statusCode ?? 0;
}

router.afterEach(() => {
    errorStore.activeError = null;
});
</script>
<template>
    <section class="error">
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
    </section>
</template>
<style scoped>
.error {
    @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
    @apply text-7xl text-destructive;
}

.error__code {
    @apply font-extrabold text-7xl text-secondary;
}

.error__status {
    @apply font-bold text-5xl text-secondary;
}

.error__msg {
    @apply text-3xl font-bold text-primary;
}

.error__stack {
    @apply text-left whitespace-pre-wrap font-mono leading-10 bg-secondary rounded-xl;

    h3 {
        @apply border-b border-background p-4;
    }

    p {
        @apply p-4;
    }

    p:first-line {
        @apply bg-background;
    }
}

.error-footer {
    @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
    @apply text-lg text-muted-foreground;
}

p {
    @apply my-2;
}
</style>
