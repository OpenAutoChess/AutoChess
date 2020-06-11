<template>
    <div v-click-outside="closeMenu" :class="['start-wrapper', {'--active': isOpen}]">
        <div class="types-wrapper">
            <div :class="['type', {'--active': game.mode == mode.key, '--new': mode.new}]" v-for="mode in modes" :key="mode.key">
                <button @click="choosemode(mode)" :class="{'--disabled': mode.disabled}" :disabled="mode.disabled"><span>{{ mode.name }}</span></button>
                <div class="options">
                    <div class="ranked" v-if="mode.ranked">
                        <label>
                            <input type="radio" :name="`${mode.key}_ranked`" :value="true" v-model="game.ranked" />
                            RANKED
                        </label>
                        <label>
                            <input type="radio" :name="`${mode.key}_unranked`" :value="false" v-model="game.ranked" />
                            UNRANKED
                        </label>
                        <hr/>
                    </div>
                    <div v-for="option in mode.options" v-if="mode.options">
                        <label>
                            <input type="checkbox" :name="mode.key" :value="option.key" v-model="game.options" :disabled="option.disabled" />
                            {{ option.name }}
                        </label>
                    </div>
                    <div v-for="duration in mode.durations" v-if="mode.durations">
                        <label>
                            <input type="checkbox" :name="mode.key" :value="duration.key" v-model="game.durations" :disabled="duration.disabled" />
                            {{ duration.name }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="indicators">
                <div>
                    Online: {{ controller.online }}
                </div>
                <div>
                    Searching: {{ controller.searching }}
                </div>
            </div>
        </div>

        <button class="close" @click="closeMenu">
            <span></span>
        </button>

        <div class="stop-wrapper" v-if="controller.isSearching && !controller.found">
            <div class="info">
                <span v-if="getMode(game.mode)">{{ getMode(game.mode).name }}, </span>
                <span v-if="getMode(game.mode) && getMode(game.mode).ranked">{{ game.ranked ? 'ranked' : 'unranked' }}, </span>
                <span class="timer">{{ formatTimer(controller.timer) }}</span>
            </div>
            <div class="stop">

                <div>
                    <div class="online-info">
                        <div class="online-popover">
                            <div>Online: {{ controller.online }}</div>
                            <div>Searching: {{ controller.searching }}</div>
                            <div>Estimated wait time: {{ formatTimer(controller.waitTime) }}</div>
                        </div>
                        &#9432;
                    </div>
                    FINDING MATCH...
                </div>
                <button @click="stopSearch">&#10005;</button>
            </div>
        </div>
        <div class="search-wrapper" v-else-if="!controller.found">
            <button class="search" @click="findMatch">
                <svg width="300px" height="60px" viewBox="0 0 300 60" class="border">
                    <polyline points="299,1 299,59 1,59 1,1 299,1" class="bg-line" />
                    <polyline points="299,1 299,59 1,59 1,1 299,1" class="hl-line" />
                </svg>
                <span v-if="isOpen">FIND MATCH</span>
                <span v-else>PLAY CHESS</span>
            </button>
        </div>
        <div class="game-ready" v-if="controller.found && controller.clients">
            <transition-group name="fade">
                <div class="accept-wrapper" v-if="!controller.accepted" key="accept-modal">
                    <div class="head-wrapper">
                        <div class="head">Your game is ready</div>
                        <div class="title">{{ getMode(game.mode).name }}</div>
                    </div>
                    <div class="body">
                        <div class="accept">
                            <button @click="controller.acceptGame()">Accept</button>
                        </div>
                        <div class="cancel">
                            <button @click="controller.declineGame()">Decline Match</button>
                        </div>
                    </div>
                </div>
                <div class="clients-wrapper" v-else key="clients-modal">
                    <div class="client" v-for="client in Object.keys(controller.clients)">
                        <img :class="{'--accepted': controller.clients[client].accepted, '--canceled': controller.clients[client].canceled}" :src="controller.clients[client].Avatar" :alt="controller.clients[client].UserName" />
                        <span>{{ controller.clients[client].UserName }}</span>
                    </div>
                </div>
            </transition-group>
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
                durations: ['15m', '1h', '2h', '1d'],
                ranked: false,
                options: [],
            },
            modes: [
                {
                    key: 'puzzles',
                    name: 'puzzles',
                    disabled: false,
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
                    display: false,
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
                    disabled: false,
                    name: '4 player chess',
                    options: [
                        {
                            key: 'teams',
                            name: 'teams'
                        },
                        {
                            key: 'ffa',
                            name: 'ffa'
                        },
                    ],
                    durations: [
                        {
                            key: '5m',
                            name: '5 MIN'
                        },
                        {
                            key: '10m',
                            name: '10 MIN'
                        },
                    ],
                    new: true,
                },
                {
                    key: 'blitz',
                    name: 'blitz',
                    ranked: true,
                    options: [],
                    durations: [
                        {
                            key: '5m',
                            name: '5 MIN'
                        },
                        {
                            key: '10m',
                            name: '10 MIN'
                        },
                    ],
                },
                {
                    key: 'classical',
                    name: 'classical',
                    ranked: true,
                    options: [],
                    durations: [
                        {
                            key: '15m',
                            name: '15 MIN'
                        },
                        {
                            key: '1h',
                            name: '1 HOUR'
                        },
                        {
                            key: '2h',
                            name: '2 HOUR'
                        },
                        {
                            key: '1d',
                            name: '1 DAY',
                        },
                    ],
                },
            ]
        }
    },
    computed: {
        ...mapGetters({
            authToken: 'auth/GET_TOKEN'
        }),
    },
    created() {
        if(process.client) {
            this.controller = new SearchController()
        }
    },
    methods: {
        formatTimer(timer) {
            var date = new Date(0);
            date.setSeconds(timer);
            if (Math.floor(timer / 6000) >= 1) {
                return date.toISOString().substr(11, 8);
            }
            return date.toISOString().substr(14, 5);
        },
        getMode: function(key) {
            for(let i = 0;i<this.modes.length;++i) {
                if (this.modes[i].key == key) {
                    return this.modes[i]
                }
            }
            return null
        },
        openMenu() {
            if (!this.$isSignedIn()) {
                this.$showModal('signin')
                return
            }
            this.isOpen = true
        },
        closeMenu() {
            this.isOpen = false
        },
        choosemode(mode) {
            this.game.mode = mode.key
            this.game.ranked = mode.ranked ? this.game.ranked : false

            this.game.options = []
            this.game.durations = []

            if (mode.options) {
                for(let i=0;i<mode.options.length;++i) {
                    if (!mode.options[i].disabled) {
                        this.game.options.push(mode.options[i].key)
                    }
                }
            }
            if (mode.durations) {
                for(let i=0;i<mode.durations.length;++i) {
                    if (!mode.durations[i].disabled) {
                        this.game.durations.push(mode.durations[i].key)
                    }
                }
            }
        },
        findMatch() {
            if (!this.isOpen) {
                this.openMenu()
                return
            }
            this.controller.search(this.game)
        },
        stopSearch() {
            this.controller.stopSearch()
        }
    }
}
</script>
