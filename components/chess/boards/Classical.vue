<template>
    <div class="board-wrapper">
        <table class="board -classical">
            <tr v-for="row in 8">
                <td :class="['cell -' + cellColor(row, col)]" v-for="col in 8">
                    <img v-if="piece(row, col)" :src="`/pieces/merida/${image(row, col)}.png`">
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
    props: [
        "controller"
    ],
    mounted() {
        console.log()
    },
    methods: {
        piece(i, j) {
            return this.controller.getPiece(i, j)
        },
        color(i, j) {
            let piece = this.piece(i, j)
            return piece ? piece.color : ''
        },
        cellColor(i, j) {
            return (i + j)%2 ? 'grey' : 'white'
        },
        image(i, j) {
            return this.piece(i, j).getImage()
        }
    }
}
</script>
