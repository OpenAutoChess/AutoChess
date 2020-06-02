<template>
    <div>
        <transition name="modal-fade">
            <div class="modal-wrapper" v-if="$isOpen('auth')">
                <Auth />
            </div>
        </transition>
    </div>
</template>

<script>
import Auth from '@/components/modals/auth'

export default {
    components: {
        Auth
    },
    mounted() {
        // setTimeout(() => {
        //     this.$showModal('auth')
        //     setTimeout(() => {
        //         // this.$closeModal('auth')
        //     }, 3000)
        // }, 3000)
    }
}

</script>
