<script setup lang="ts">
import { projectsQuery, type Projects } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = 'Projects';

const projects = ref<Projects | null>(null);

async function getProjects() {
    const { data, error, status } = await projectsQuery;

    if (error) useErrorStore().setError({ error, customCode: status });

    projects.value = data;
}

await getProjects();
</script>
<template>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
