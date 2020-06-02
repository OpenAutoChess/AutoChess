<template>
    <div class="wrapper">

        <transition name="preloader-fade">
            <preloader class="preloader-wrapper" v-if="$isLoading()" />
        </transition>

        <nuxt />

        <client-only>
            <modal />
        </client-only>

    </div>
</template>

<script>
import Preloader from "@/components/partials/preloader.vue"
import Modal from "@/components/partials/modal.vue"

export default {
    components: {
        Preloader, Modal
    },
}
</script>
