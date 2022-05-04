<template>
    <v-card id="newpost" elevation="8" max-width="750" height="120" class="offset-md-3 mx-auto">

        <v-card-text>

            <div class="d-flex justify-center mt-4">
                <v-btn height="54" outlined class="mx-1" color="primary" @click="$refs.file.click()">
                    <v-icon  >mdi-camera-enhance</v-icon>
                </v-btn>
                <input v-show="false" ref="file" type="file" label="sel"
                    accept="image/png, image/jpeg, image/bmp, image/gif" name="image" @change="onFileChange" />
                
                <v-avatar class="mx-1"  v-if="url"  rounded size="54">
                    <v-img  :src="url"></v-img>
                </v-avatar>
                <v-textarea label="Quoi de neuf ?" auto-grow outlined rows="1" row-height="15" cols="500"
                    class="mx-1" v-model="message"></v-textarea>
                <span v-if="message">
                    <span class="d-flex justify-end mx-1">
                        <v-btn height="55" v-if="url" depressed color="primary" class="btn align-self-center"
                            @click.prevent.stop="uploadImage(); publishPost()">
                            <v-icon>mdi-email-fast-outline</v-icon>
                        </v-btn>
                        <v-btn height="55" v-else depressed color="primary" class="btn align-self-center"
                            @click.prevent.stop="publishPost()">
                            <v-icon>mdi-email-fast-outline</v-icon>
                        </v-btn>
                    </span>
                </span>
            </div>

            
            <!-- Disable button if message is empty -->

        </v-card-text>
    </v-card>
</template>

<script>
import PostServices from "@/services/PostServices";
let user = JSON.parse(localStorage.getItem("user"));
export default {
    data() {
        return {
            file: "",
            fileName: "",
            UserId: user.id,
            message: null,
            url: null
        };
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        uploadImage() {
            this.file = this.$refs.file.files[0];
            this.fileName = this.file.name;
        },
        async publishPost() {
            const fd = new FormData();
            fd.append("message", this.message);
            fd.append("UserId", this.UserId);
            if (this.file !== null) {
                fd.append("image", this.file);
            }
            await PostServices.createPost(fd);
            location.reload(true);
        },
    },

};
</script>
<style lang="scss" scoped>

#newpost {
    margin-top: 85px;
}

</style>
