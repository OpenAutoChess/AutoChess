<template>
    <div class="wrapper">

        <transition name="preloader-fade">
            <preloader class="preloader-wrapper" v-if="$isLoading()" />
        </transition>

        <nuxt />

        <client-only>
            <modal />
            <start-menu />
        </client-only>

    </div>
</template>

<script>
import Preloader from "@/components/partials/preloader.vue"
import Modal from "@/components/partials/modal.vue"
import StartMenu from '@/components/partials/game/startMenu'

export default {
    components: {
        Preloader, Modal, StartMenu
    },
}
</script>
