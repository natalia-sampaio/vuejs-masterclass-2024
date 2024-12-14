import { supabase } from '@/lib/supabaseClient';
import type { QueryData } from '@supabase/supabase-js';

export const tasksWithProjectQuery = supabase.from('tasks').select(`
        *,
        projects (
            id,
            name,
            slug
        )
    `);

export type TasksWithProjects = QueryData<typeof tasksWithProjectQuery>;

export const projectsQuery = supabase.from('projects').select();
export type Projects = QueryData<typeof projectsQuery>;
