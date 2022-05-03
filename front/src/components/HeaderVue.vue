<template>
    <nav  fixed class="mb-15">
        <v-toolbar height="85" app elevation="8">
            <v-toolbar-title black v-if="$store.state.isUserLoggedIn">
                <v-icon color="primary" x-large @click="backToPostsPage">mdi-web</v-icon>
                <span>Groupomania</span>
            </v-toolbar-title>

            <v-toolbar-title v-else>
                <v-icon x-large color="primary">mdi-web</v-icon>
                <span color="black">Groupomania</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-app-bar-nav-icon color="primary" x-large @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer" inset app right  temporary  id="navdraw">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="primary--text text-h6 mt-5 mb-4">Menu</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
                    <v-divider></v-divider>


            <v-list dense nav>
                <v-list-item v-if="$store.state.isUserLoggedIn" class="my-11" @click="backToPostsPage()">
                    <v-list-item-icon>
                        <v-icon large color="primary">mdi-home-assistant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="$store.state.isUserLoggedIn" class="my-11" @click="profil(UserId)">
                    <v-list-item-icon>
                        <v-icon large color="primary">mdi-card-account-details-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Mon Profil</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="$store.state.isUserLoggedIn" class="my-11" @click="showUsers()">
                    <v-list-item-icon>
                        <v-icon large color="primary">mdi-account-group</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Utilisateurs</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="!$store.state.isUserLoggedIn" class="my-11" @click="navigateTo({ name: 'Login' })">
                    <v-list-item-icon>
                        <v-icon large color="primary">mdi-consolidate</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Connexion</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="$store.state.isUserLoggedIn" class="my-11" @click="logout">
                    <v-list-item-icon>
                        <v-icon large color="primary">mdi-exit-to-app</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Déconnexion</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
let user = JSON.parse(localStorage.getItem("user"));
export default {
    data() {
        return {
            drawer: false,
            UserId: user.id,
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route).catch(() => { });
        },
        logout() {
            this.$store.dispatch("setToken", null);
            this.$store.dispatch("setUser", null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            // catch method to remove basic error with multiple click on router
            this.$router.push({ name: "Login" }).catch(() => { });
        },
        showUsers() {
            // See advance problem about this in function
            const router = this.$router;
            setTimeout(function () {
                router.push("/users").catch(() => { });
            }, 10);
        },
        profil(userId) {
            const router = this.$router
            setTimeout(function () {
                router.push(`/profil/${userId}`).catch(() => { });
            }, 10)
        },
        backToPostsPage() {
            const router = this.$router;
            setTimeout(function () {
                router.push("/posts").catch(() => { });
            }, 10);
        }
    },
}
</script>

<style scoped>
.mdicons {
    height: 15rem;
}

img {
    margin-top: 9px;
}

nav {
    width: 100%;
    position: fixed;
    top: 0;
    top: 0;
    z-index: 1000;
    

} 

/* #navdraw {
    width: 35rem;
    
    position: fixed;
    top: 0;
}  */
</style>