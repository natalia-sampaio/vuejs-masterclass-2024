<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from 'database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';
import type { QueryData } from '@supabase/supabase-js';

usePageStore().pageData.title = 'My tasks';

// https://supabase.com/docs/reference/javascript/typescript-support#response-types-for-complex-queries

const tasksWithProjectQuery = supabase.from('tasks').select(`
        *,
        projects (
            id,
            name,
            slug
        )
    `);

type TasksWithProjects = QueryData<typeof tasksWithProjectQuery>;

const tasks = ref<TasksWithProjects | null>(null);

async function getTasks() {
    const { data, error } = await tasksWithProjectQuery;

    if (error) console.log(error);

    tasks.value = data;
}

await getTasks();

const columns: ColumnDef<TasksWithProjects[0]>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h(
                RouterLink,
                {
                    to: `/tasks/${row.original.id}`,
                    class: 'text-left font-medium hover:bg-muted block w-full'
                },
                () => row.getValue('name')
            );
        }
    },
    {
        accessorKey: 'status',
        header: () => h('div', { class: 'text-left' }, 'Status'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('status'));
        }
    },
    {
        accessorKey: 'due_date',
        header: () => h('div', { class: 'text-left' }, 'Due Date'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'));
        }
    },
    {
        accessorKey: 'projects',
        header: () => h('div', { class: 'text-left' }, 'Project'),
        cell: ({ row }) => {
            return row.original.projects
                ? h(
                      RouterLink,
                      {
                          to: `/projects/${row.original.projects.slug}`,
                          class: 'text-left font-medium hover:bg-muted block w-full'
                      },
                      () => row.original.projects?.name
                  )
                : '';
        }
    },
    {
        accessorKey: 'collaborators',
        header: () => h('div', { class: 'text-left' }, 'Collaborators'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-left font-medium' },
                JSON.stringify(row.getValue('collaborators'))
            );
        }
    }
];
</script>
<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
