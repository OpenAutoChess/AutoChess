<template>
    <div>
        <transition-group name="modal-fade">
            <div class="modal-wrapper" v-if="$isOpen('signin')" key="signin-modal">
                <signin />
            </div>
            <div class="modal-wrapper" v-if="$isOpen('signup')" key="signup-modal">
                <signup />
            </div>
        </transition-group>
    </div>
</template>

<script>
import Signup from '@/components/modals/signup'
import Signin from '@/components/modals/signin'

export default {
    components: {
        Signup, Signin
    },
}

</script>
