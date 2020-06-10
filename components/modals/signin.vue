<template>
    <div class="signin-modal">
        <button class="close" @click="close">&#10005;</button>
        <div>
            <logo :black="true" />
        </div>
        <form action="" @submit.prevent="sendLogin" method="POST">
            <div>
                <input type="email" name="email" v-model="user.email" placeholder="Email" required />
            </div>
            <div>
                <input type="password" name="password" v-model="user.password" placeholder="Password" required />
            </div>
            <div class="forgot">
                <button type="button" @click="forgot">Forgot password?</button>
            </div>
            <div class="submit">
                <button type="submit">Login</button>
            </div>
            <div class="create">
                <button type="button" @click.prevent="signup">Create an account.</button>
            </div>
        </form>
    </div>
</template>

<script>
import Logo from '@/components/partials/logo'
import { mapActions } from 'vuex'

export default {
    components: {
        Logo
    },
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    watch: {
        '$route.fullPath': function() {
            this.$closeModal('signin')
        }
    },
    mounted() {

    },
    methods: {
        ...mapActions({
            login: 'auth/signin'
        }),
        async sendLogin() {
            this.login({...this.user})
            // this.close()
        },
        close() {
            this.$closeModal('signin')
        },
        signup() {
            this.close()
            this.$showModal('signup')
        },
        forgot() {
            this.close()
            this.$showModal('forgot')
        }
    }
}

</script>
