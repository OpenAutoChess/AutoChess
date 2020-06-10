<template>
    <div v-click-outside="closeMenu" :class="['start-wrapper', {'--active': isOpen}]">
        <div class="types-wrapper">
            <div :class="['type', {'--active': game.mode == mode.key}]" v-for="mode in modes" :key="mode.key">
                <button @click="choosemode(mode)"><span>{{ mode.name }}</span></button>
                <div class="options" v-if="mode.options">
                    <div v-for="option in mode.options">
                        <label>
                            <input type="checkbox" :name="mode.key" :value="option.key" v-model="game.options" :disabled="mode.disabled" />
                            {{ option.name }}
                        </label>
                    </div>
                </div>
            </div>
            <div>
                Online: {{ controller.online }}
                Searching: {{ controller.searching }}
            </div>
        </div>

        <button class="close" @click="closeMenu">
            <span></span>
        </button>

        <div class="buttons-wrapper">
            <button @click="findMatch">
                <svg width="300px" height="60px" viewBox="0 0 300 60" class="border">
                    <polyline points="299,1 299,59 1,59 1,1 299,1" class="bg-line" />
                    <polyline points="299,1 299,59 1,59 1,1 299,1" class="hl-line" />
                </svg>
                <span v-if="controller.isSearching">FINDING MATCH...</span>
                <span v-else-if="isOpen">FIND MATCH</span>
                <span v-else>PLAY CHESS</span>
            </button>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import SearchController from '@/chess/controllers/SearchController'
import { mapGetters } from 'vuex'

export default {
    directives: {
        ClickOutside
    },
    data() {
        return {
            controller: null,
            isOpen: false,
            game: {
                mode: 'classical',
                options: ['ranked', 'unranked'],
            },
            modes: [
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
                    name: 'play against computer',
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
                    options: [],
                    new: true,
                },
                {
                    key: 'blitz',
                    name: 'blitz',
                    options: [
                        {
                            key: 'ranked',
                            name: 'ranked'
                        },
                        {
                            key: 'unranked',
                            name: 'unranked'
                        },
                    ],
                },
                {
                    key: 'classical',
                    name: 'classical',
                    options: [
                        {
                            key: 'ranked',
                            name: 'ranked'
                        },
                        {
                            key: 'unranked',
                            name: 'unranked'
                        },
                    ],
                },
            ]
        }
    },
    computed: {
        ...mapGetters({
            authToken: 'auth/GET_TOKEN'
        })
    },
    created() {
        if(process.client) {
            this.controller = new SearchController()
        }
    },
    methods: {
        openMenu() {
            this.isOpen = true
        },
        closeMenu() {
            this.isOpen = false
        },
        choosemode(mode) {
            this.game.mode = mode.key
            this.game.options = []
            for(let i=0;i<mode.options.length;++i) {
                this.game.options.push(mode.options[i].key)
            }
            console.log(this.game.options)
        },
        findMatch() {
            if (this.controller.isSearching) {
                this.controller.stopSearch()
                return
            }
            if (!this.isOpen) {
                this.openMenu()
                return
            }
            this.controller.search(this.game)
        }
    }
}
</script>
