<template>
    <div v-click-outside="closeMenu" :class="['start-wrapper', {'--active': isOpen}]">
        <div class="types-wrapper">
            <div :class="['type', {'--active': game.type == type.key}]" v-for="type in types" :key="type.key">
                <button @click="chooseType(type.key)"><span>{{ type.name }}</span></button>
                <div class="options" v-if="type.options">
                    <div v-for="option in type.options">
                        {{ option.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="buttons-wrapper">
            <button @click="findMatch">
                <svg width="300px" height="60px" viewBox="0 0 300 60" class="border">
                    <polyline points="299,1 299,59 1,59 1,1 299,1" class="bg-line" />
                    <polyline points="299,1 299,59 1,59 1,1 299,1" class="hl-line" />
                </svg>
                <span v-if="isOpen">FIND MATCH</span>
                <span v-else>PLAY CHESS</span>
            </button>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    directives: {
        ClickOutside
    },
    data() {
        return {
            isOpen: false,
            game: {
                type: 'unranked',
                options: [],
            },
            types: [
                {
                    key: 'puzzles',
                    name: 'puzzles',
                    options: [
                        {
                            key: 'directmates',
                            name: 'directmates',
                            disabled: false,
                        },
                        {
                            key: 'helpmates',
                            name: 'helpmates',
                            disabled: true,
                        },
                        {
                            key: 'Selfmates',
                            name: 'Selfmates',
                            disabled: true,
                        },
                        {
                            key: 'Helpselfmates',
                            name: 'Helpselfmates',
                            disabled: true,
                        },
                        {
                            key: 'Reflexmates',
                            name: 'Reflexmates',
                            disabled: true,
                        },
                        {
                            key: 'Seriesmovers',
                            name: 'Seriesmovers',
                            disabled: true,
                        },
                        {
                            key: 'retros',
                            name: 'Retrograde analysis problems',
                            disabled: true,
                        },
                        {
                            key: 'Construction',
                            name: 'Construction tasks',
                            disabled: true,
                        },
                    ]
                },
                {
                    key: 'computer',
                    name: 'play agains computer',
                    options: [
                        {
                            key: 1,
                            name: 'level 1',
                        },
                        {
                            key: 2,
                            name: 'level 2',
                        },
                        {
                            key: 3,
                            name: 'level 3',
                        },
                        {
                            key: 4,
                            name: 'level 4',
                        },
                    ]
                },
                {
                    key: 'four',
                    name: '4 player chess',
                    new: true,
                },
                {
                    key: 'ranked',
                    name: 'ranked',
                    options: [
                        {
                            key: 'classical',
                            name: 'classical'
                        },
                        {
                            key: 'blitz',
                            name: 'blitz'
                        },
                    ],
                },
                {
                    key: 'unranked',
                    name: 'unranked',
                    options: [
                        {
                            key: 'classical',
                            name: 'classical'
                        },
                        {
                            key: 'blitz',
                            name: 'blitz'
                        },
                    ],
                },
            ]
        }
    },
    methods: {
        openMenu() {
            this.isOpen = true
        },
        closeMenu() {
            this.isOpen = false
        },
        chooseType(type) {
            this.game.type = type
        },
        findMatch() {
            if (!this.isOpen) {
                this.openMenu()
                return
            }
        }
    }
}
</script>
