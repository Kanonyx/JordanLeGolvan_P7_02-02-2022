<template>
    <v-footer id="vfooter" padless="padless">
        <v-card elevation="8" tile width="100%" class="white darken-1 text-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                    <v-icon color="primary" size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
                <br>{{ new Date().getFullYear() }} — Groupomania
            </v-card-text>


        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ]
    }),
}
</script>

<style lang="scss" scoped>
#vfooter {
    position: fixed;
    bottom: 0;
    min-width: 100%;
    z-index: 999;
}
</style>