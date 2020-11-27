<template>
    <div id="main-app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style lang="scss" scoped>
#main-app {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow-y: hidden;
}
</style>
