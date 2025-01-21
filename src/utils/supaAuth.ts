import { supabase } from '@/lib/supabaseClient';
import { useAuthStore } from '@/stores/auth';
import type { LoginForm, RegisterForm } from '@/types/AuthForm';

const authStore = useAuthStore();

export async function register(formData: RegisterForm) {
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
    });

    if (data.user) createProfile(data.user.id, formData);

    if (error) return console.log(error);

    await authStore.setAuth(data.session);

    return true;
}

export async function login(formData: LoginForm) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
    });

    if (error) return console.log(error);

    await authStore.setAuth(data.session);

    return true;
}

async function createProfile(id: string, formData: RegisterForm) {
    const { error } = await supabase.from('profiles').insert({
        id: id,
        username: formData.username,
        full_name: formData.firstName.concat(' ', formData.lastName)
    });

    if (error) return console.log('Profiles err: ', error);
}
