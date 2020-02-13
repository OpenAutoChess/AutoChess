<template>
<table class="board -classical">
    <tbody v-if="controller">
        <tr v-for="i in 8" :key="i">
            <Cell
                v-for="j in 8" :key="j"
                :row="i"
                :col="j"
                :piece="controller.getPiece(i, j)"
                @click.native="controller.setActiveCell(i, j)">
            </Cell>
        </tr>
    </tbody>
</table>
</template>

<script>
import Cell from "@/components/chess/partials/cell"
import Controller from "@/chess/controllers/Classical"

export default {
    components: { Cell },
    data() {
        return {
            controller: null,
        }
    },
    created() {
        this.controller = new Controller()
    }
}

</script>
