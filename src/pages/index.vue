<script setup lang="ts"></script>
<template>
    <div>
        <h1>Home Page</h1>
        <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Go to project 1</RouterLink>
    </div>
</template>
