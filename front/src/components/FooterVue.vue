<template>
    <v-footer elevation="10" height="90"  class=" white foot mx-3 "  padless>
        <v-row justify="center" no-gutters>
            
            <span class=" py-5 text-center black--text" >
                {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
            </span>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-home',
            'mdi-email',
            'mdi-calendar',
            'mdi-delete',
        ],
        items: [
            'default',
            'absolute',
            'fixed',
        ],
        padless: false,
        variant: 'default',
    }),
    computed: {
        localAttrs() {
            const attrs = {}

            if (this.variant === 'default') {
                attrs.absolute = false
                attrs.fixed = false
            } else {
                attrs[this.variant] = true
            }
            return attrs
        },
    },
}
</script>

<style  scoped>
.foot {
    margin: 1rem;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>