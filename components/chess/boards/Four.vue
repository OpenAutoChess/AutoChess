<template>
    <table class="board -four">
        <tr v-for="row in 12">
            <td :class="['cell -' + cellColor(row, col), {'-active': controller.isActiveCell(row, col)}]" v-for="col in 12" @click="controller.setActiveCell(row, col)">
                <img v-if="piece(row, col)" :src="`/pieces/${image(row, col)}.png`">
            </td>
        </tr>
    </table>
</template>

<script>

export default {
    props: [
        "controller"
    ],
    mounted() {

    },
    methods: {
        piece(i, j) {
            return this.controller.getPiece(i, j)
        },
        cellColor(i, j) {
            if ((i<3 && (j<3 || j>10)) || (i>10 && (j<3 || j>10))) {
                return ''
            }
            return (i + j)%2 ? 'grey' : 'white'
        },
        image(i, j) {
            return this.piece(i, j).Color + this.piece(i, j).Class
        }
    }
}
</script>
