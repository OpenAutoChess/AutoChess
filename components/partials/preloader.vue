<template>
    <div :class="`--${preloader}`">
        <component :is="component" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            preloader: 'preloader/GET_PRELOADER',
            component: 'preloader/GET_COMPONENT'
        })
    },
    mounted() {
        if (process.client) {
            setTimeout(() => {
                this.$stopLoading()
            }, 3000)
        }
    }
}
</script>
