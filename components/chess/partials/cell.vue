<template>
<td :class="['cell -' + color, {'active': isActiveCell, 'path': isActivePath}]">
    <img v-if="piece" :src="`/pieces/merida/${piece.getImage()}.png`">
</td>
</template>

<script>
export default {
    props: ['row', 'col', 'piece'],
    computed: {
        color: function() {
            return (this.row + this.col)%2 ? 'grey' : 'white'
        },
        isActiveCell: function() {
            if (!this.$parent.controller.activeCell) {
                return false
            }
            return this.row == this.$parent.controller.activeCell.row && this.col == this.$parent.controller.activeCell.col
        },
        isActivePath: function() {
            return this.$parent.controller.isActivePath(this.row, this.col)
        }
    },
    mounted() {

    }
}
</script>
