<template>
    <div :class="['logo', {'--black': black}]">
        <img :src="`/logo_${black ? 'black' : 'white'}.svg`" />
        <div>AUTO</div>
        <div>CHESS</div>
    </div>
</template>

<script>
export default {
    props: ['black'],
}
</script>
