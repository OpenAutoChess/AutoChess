<template>
    <section class="container">
        <client-only>
            <board></board>
        </client-only>
    </section>
</template>

<script>
import board from '@/components/chess/boards/classical'

export default {
    components: { board }
}
</script>
