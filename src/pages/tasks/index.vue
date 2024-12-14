<script setup lang="ts">
import { tasksWithProjectQuery, type TasksWithProjects } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/tasksColumns';

usePageStore().pageData.title = 'My tasks';

// https://supabase.com/docs/reference/javascript/typescript-support#response-types-for-complex-queries

const tasks = ref<TasksWithProjects | null>(null);

async function getTasks() {
    const { data, error } = await tasksWithProjectQuery;

    if (error) console.log(error);

    tasks.value = data;
}

await getTasks();
</script>
<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
