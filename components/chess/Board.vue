<template>
    <div class="board-wrapper">
        <component :is="this.controller.component" v-if="this.controller.component" :controller="controller" />
    </div>
</template>

<script>

export default {
    props: [
        "controller"
    ],
}
</script>
