<template>
    <v-container id="cardcontainer" class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
                <v-card elevation="8">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-row>
                                <v-col classe="cardbox" cols="12" md="8">
                                    <v-card-text class="mt-12">
                                        <h1 class="text-center font-weight-light display-2 black--text text--black">Groupomania</h1>

                                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                                        <v-text-field prepend-icon="mdi-account" name="login" label="Adresse mail"
                                            type="text" v-model="email" :rules="emailValidate"
                                            @click="errorMessage = ''"></v-text-field>
                                        <v-text-field id="password" prepend-icon="mdi-lock" name="password"
                                            label="Mot de passe" type="password" v-model="password" :rules="rules">
                                        </v-text-field>
                                    </v-card-text>
                                    <v-alert dense outlined type="error" class="mx-5" v-if="errorMessage"
                                        @click="errorMessage = ''">
                                        {{ errorMessage }}
                                    </v-alert>
                                    <div class="text-center mt-3">
                                        <v-btn class="ma-4 primary" rounded color="black"  @click="login()">SIGN IN</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="4" class="pa-5 primary">
                                    <v-card-text class="white--text mt-12">
                                        <h1 class="text-center display-1">Hello, Friend!</h1>
                                        <h5 class="text-center">Enter your personal details and start journay with us
                                        </h5>
                                    </v-card-text>
                                    <div class="text-center">
                                        <v-btn class="ma-5 dark white--text" white rounded outlined  @click="step++">SIGN UP</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-window-item>
                        <v-window-item :value="2">
                            <v-row class="fill-height">
                                <v-col cols="12" md="4" class="black">
                                    <v-card-text class="white--text mt-12">
                                        <h1 class="text-center display-1">Welcome Back!</h1>
                                        <h5 class="text-center">To Keep connected with us please login with your
                                            personnel info</h5>
                                    </v-card-text>

                                    <div class="text-center">
                                        <v-btn :disabled="email && password == ''" @click="step--" class="ma-5 primary" rounded
                                            outlined dark>Sign in</v-btn>
                                    </div>
                                </v-col>

                                <v-col cols="12" md="8">
                                    <v-card-text class="mt-12">
                                        <h3 class="text-center display-2 primary--text text--black">Create Account</h3>

                                        <v-form>
                                            <v-text-field prepend-icon="mdi-account" v-model="first_name" label="Prénom"
                                                hide-details="auto" autocomplete="off" :rules="rules"
                                                @click="error = null"></v-text-field>
                                            <v-text-field prepend-icon="mdi-account" v-model="last_name" label="Nom"
                                                hide-details="auto" autocomplete="off" :rules="rules"
                                                @click="error = null"></v-text-field>
                                            <v-text-field prepend-icon="mdi-at" v-model="email" label="Adresse mail"
                                                hide-details="auto" autocomplete="off" :rules="emailValidate"
                                                @click="error = null"></v-text-field>
                                            <v-text-field prepend-icon="mdi-lock" v-model="password"
                                                label="Mot de passe" type="password" autocomplete="off"
                                                :rules="passwordValidate" @click="error = null"></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-alert dense text type="success" class="mx-5" v-if="validateForm">
                                        {{ validateForm }}
                                    </v-alert>
                                    <v-alert dense outlined type="error" class="mx-5" v-if="error"
                                        @click="error = null">
                                        {{ error }}
                                    </v-alert>
                                    <div class="text-center mt-n5">
                                        <v-btn :disabled="email && password && last_name && first_name == ''"
                                            @click="register()" class="ma-5" rounded color="black black" dark>SIGN UP
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthServices from "@/services/AuthServices";
export default {

    data() {

        return {
            step: 1,
            last_name: "",
            first_name: "",
            email: "",
            password: "",
            error: null,
            validateForm: "",
            rules: [
                value => !!value || 'Obligatoire',
                value => (value && value.length >= 3) || 'Minimum 3 caractères',
                value => (value && value.length <= 30) || 'Maximum 30 caractères',
            ],
            emailValidate: [
                value => (value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Merci de rentrer une addresse mail valide',
            ],
            passwordValidate: [
                value => (value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) || 'Le mots de passe doit contenir : un nombre, huits caractères et un caractère spécial',
            ],
            errorMessage: '',
        };

    },
    methods: {
        async login() {
            try {
                const response = await AuthServices.login({
                    email: this.email,
                    password: this.password,
                });
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessToken", response.data.token);
                this.$store.dispatch("setToken", response.data.token);
                this.$store.dispatch("setUserId", response.data.UserId);
                const router = this.$router;
                setTimeout(function () {
                    router.push("/posts").catch(() => { });
                    location.reload(true);
                }, 10);
            } catch (error) {
                this.errorMessage = "Aucun compte trouvé, merci de vérifier vos informations de connexion"
            }
        },

        async register() {
            try {
                await AuthServices.signup({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                });
                
                this.validateForm = "Inscription réussi, vous pouvez vous connecter";
                    
                setTimeout(() => this.step--, 2000);
                
            } catch (error) {
                this.error = "Merci de remplir toutes les conditions demandées"
            }
        },
        loginPage() {
            const router = this.$router;
            setTimeout(function () {
                router.push("/").catch(() => { });
            }, 2000);
        },
    },
};


</script>

<style scoped>
#cardcontainer {
    height: 85vh;
}

.elevation-12 {
    padding: 1rem;
}
</style>
