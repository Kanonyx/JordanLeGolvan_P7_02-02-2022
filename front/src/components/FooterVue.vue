<template>
    <v-footer id="vfooter" padless="padless">
        <v-card flat tile width="100%" class="blue darken-1 text-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                    <v-icon color="white" size="24px">
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
    position: relative;
   margin-top: 170px;
    min-width: 100%;
    z-index: 0;
}
</style>