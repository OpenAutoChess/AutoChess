<template>
    <div class="wrapper">
        <transition name="preloader-fade">
            <preloader class="preloader-wrapper" v-if="$isLoading()" />
        </transition>
        <nuxt />
    </div>
</template>
<script>
import Preloader from "@/components/partials/preloader.vue"

export default {
    components: {
        Preloader
    },
}
</script>
