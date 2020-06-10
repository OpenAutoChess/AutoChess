<template>
    <div class="signup-modal">
        <button class="close" @click="close">&#10005;</button>
        <div>
            <logo :black="true" />
        </div>
        <form action="" @submit.prevent="sendSignup" method="POST">
            <div>
                <input type="text" name="user_name" v-model="user.user_name" placeholder="Username" required />
            </div>
            <div>
                <input type="email" name="email" v-model="user.email" placeholder="Email" required />
            </div>
            <div>
                <input type="password" name="password" v-model="user.password" placeholder="Password" required />
            </div>
            <div>
                <input type="password" name="password2" v-model="user.password2" placeholder="Confirm password" required />
            </div>
            <div class="policy">
                <label>
                    <input type="checkbox" name="policy" v-model="user.policy" />
                    I accept the <nuxt-link to="/policy">Terms of Service and Privacy Policy</nuxt-link>
                </label>
            </div>
            <div class="submit">
                <button type="submit">Create an account</button>
            </div>
            <div class="signin">
                <button type="button" @click.prevent="signin">I have an account.</button>
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
                user_name: '',
                password: '',
                password2: '',
                policy: false
            }
        }
    },
    watch: {
        '$route.fullPath': function() {
            this.$closeModal('signup')
        }
    },
    mounted() {

    },
    methods: {
        ...mapActions({
            signup: 'auth/signup'
        }),
        async sendSignup() {
            try {
                let resp = await this.signup({...this.user})
                this.signin()
            } catch(e) {
                
            }
        },
        close() {
            this.$closeModal('signup')
        },
        signin() {
            this.close()
            this.$showModal('signin')
        },
    }
}

</script>
