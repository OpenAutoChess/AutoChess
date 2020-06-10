<template>
    <div>
        <button @click="test">qwe</button>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        //
    },
    mounted() {
    },
    methods: {
        ...mapActions({
            signin: 'auth/signin',
            signup: 'auth/signup',
            fetchUser: 'profile/fetchUser',
        }),
        async test() {
            this.$showModal('signin')
        }
    }
}
</script>
