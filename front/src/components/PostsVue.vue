<template>
    <div class="container">

        <div v-html="error" />
        <NewPost />

        <v-container class="my-15" v-for="(post, index) in posts" :key="index">
            <v-row justify="space-around">
                <v-card elevation="8" width="750">
                    <v-img elevation="8" v-if="post.imageUrl" height="400px" :src="post.imageUrl">
                        <v-card-title class="font-weight-light white--text ">

                            <v-spacer></v-spacer>
                            <v-card mb-2 flat class="text-right justify-end align-end" color="transparent">
                                <v-toolbar-title
                                    class="text-subtitle-2 align-end font-weight-light white--text justify-end align-end ">
                                    {{ dateParser(post.createdAt) }}
                                </v-toolbar-title>

                                <v-col cols="2" class="pa-0 d-flex text-center justify-end align-end"
                                    v-if="post.UserId == UserId || userAdmin === true">
                                </v-col>
                            </v-card>
                            <div class="text-center">
                                <v-menu left bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon color="white">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item>
                                            <v-btn color="white" class="mx-3" @click="messageToEdit(post)"
                                                    v-if="post.UserId == UserId"><v-icon color="primary">mdi-pencil-outline</v-icon></v-btn>
                                                <v-btn color="white" class="mx-3" @click="deleteMessage(post.id)">
                                                    <v-icon  color="red">mdi-delete-alert</v-icon></v-btn>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <div class="d-flex ml-3 mt-n4">
                            <v-avatar size="69">
                                <img class="customcursor" alt="user" :src="post.User.avatar"
                                    @click="profil(post.UserId)" />
                            </v-avatar>
                            <p class="mt-5 ml-3 font-weight-light white--text" @click="profil(post.UserId)"> {{
                                    post.User.first_name
                            }}
                            </p>
                        </div>


                    </v-img>
                    <v-img v-else height="160px" src="@/assets/luke-chesser-IGtutkXikuc-unsplash.jpg">
                        <v-app-bar>
                            <v-toolbar-title class="text-subtitle-2 font-weight-light  pl-0"> {{
                                    dateParser(post.createdAt)
                            }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-col cols="2" class="pa-0 d-flex text-center justify-end align-end"
                                v-if="post.UserId == UserId || userAdmin === true">
                                <div class="text-center">
                                    <v-menu left bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon color="dark">mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-btn color="white" class="mx-3" @click="messageToEdit(post)"
                                                    v-if="post.UserId == UserId"><v-icon color="primary">mdi-pencil-outline</v-icon></v-btn>
                                                <v-btn color="white" class="mx-3" @click="deleteMessage(post.id)">
                                                    <v-icon  color="red">mdi-delete-alert</v-icon></v-btn>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </div>
                            </v-col>
                        </v-app-bar>
                        <v-card-title class="white--text ">
                            <v-avatar size="66">
                                <img class="customcursor" alt="user" :src="post.User.avatar"
                                    @click="profil(post.UserId)" />
                            </v-avatar>
                            <p class="ml-3 mt-3 font-weight-light" @click="profil(post.UserId)"> {{
                                    post.User.first_name
                            }}</p>
                        </v-card-title>
                    </v-img>
                    <v-card-text>

                        <div class="font-weight-bold ml-8 mb-2">{{ post.User.first_name }} {{ post.User.last_name }} :
                            <v-chip class="ma-2 white--text" outlined color="primary">{{ post.message }}</v-chip>
                        </div>
                        <div class="offset-md-1 mx-auto">

                        </div>
                        <v-divider></v-divider>

                        <div v-if="post.Comments.length">
                            <v-col>
                                <v-btn icon color="black" @click="toggleActive(index); commentShow(post, post.id)">
                                    <v-icon>{{ show.includes(index) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                                <span class="mx-1">{{ post.Comments.length }} commentaire(s)</span>
                            </v-col>
                        </div>
                        <v-expand-transition>

                            <div v-show="show.includes(index)">

                                <div v-for="comment in post.Comments" :key="comment.id"
                                    class="d-flex align-center pr-4 pl-4">

                                    <v-card-text>

                                        <span class="profil" @click="profil(comment.UserId)">
                                            <b>{{ comment.first_name }} {{ comment.last_name }} : </b>
                                        </span>
                                        <v-chip class="ma-2 white--text" color="primary">
                                            {{ comment.text }}</v-chip>
                                        <v-spacer></v-spacer>

                                    </v-card-text>
                                    <v-icon v-if="comment.UserId == UserId || userAdmin === true" class="cross"
                                        color="dark" @click="deleteComment(comment.id)">x</v-icon>

                                </div>

                            </div>

                        </v-expand-transition>

                        <div>
                            <v-col width="900" class="d-flex justify-end">
                                <v-btn @click="commentPost(post.id)" outlined class="primary--text">
                                    <v-icon>mdi-tooltip-edit-outline</v-icon>

                                </v-btn>
                            </v-col>
                        </div>
                        <div>
                            <v-dialog v-model="comment" width="500">
                                <v-card>
                                    <v-col cols="12" sm="12">
                                        <v-textarea label="Message" filled auto-grow outlined rows="2" row-height="15"
                                            v-model="text"></v-textarea>
                                    </v-col>
                                    <v-divider></v-divider>
                                    <v-card-actions v-if="text">
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="publishComment(currentPostId)">Publier
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </v-card-text>
                </v-card>
            </v-row>
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-col cols="12" sm="12">
                        <v-textarea label="Message" filled auto-grow outlined rows="2" row-height="15"
                            v-model="messageEdit.message"></v-textarea>
                    </v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="primary" text @click="editMessage(messageEdit.id), (dialog = false)">Publier
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>

</template>

<script>

import PostServices from '@/services/PostServices'
import NewPost from '@/components/NewPost.vue'


let user = JSON.parse(localStorage.getItem('user'))

export default {
    name: 'PostVue',

    data() {
        return {
            messages: [],
            dialog: false,
            comment: false,
            show: [],
            message: null,
            file: '',
            fileName: '',
            UserId: user.id,
            userAdmin: user.isAdmin,
            first_name: user.first_name,
            last_name: user.last_name,
            messageEdit: new Object(),
            text: null,
            currentPostId: null,
            currentPost: [],
            error: null,
            sheet: false
        }
    },
    computed: {
        posts() {
            return this.$store.state.posts
        },
    },
    mounted() {
        this.$store.dispatch('getPosts')
    },
    components: {
        NewPost,

    },
    methods: {
        toggleActive(index) {
            if (this.show.includes(index)) {
                this.show = this.show.filter(entry => entry !== index);

                return;
            }
            this.show.push(index);
        },
        commentPost(postId) {
            this.comment = true
            this.currentPostId = postId
        },
        commentShow(post, postId) {
            this.currentPostId = postId
            this.currentPost = post
        },
        uploadImage() {
            this.file = this.$refs.file.files[0]
            this.fileName = this.file.name
        },
        async publishPost() {
            try {
                const fd = new FormData()
                fd.append('message', this.message)
                fd.append('UserId', this.UserId)
                if (this.file !== null) {
                    fd.append('image', this.file)
                }
                await PostServices.createPost(fd)
                location.reload(true)
            } catch (error) {
                this.error = error.response.data.error
            }
        },
        messageToEdit(post) {
            this.dialog = true
            this.messageEdit = post
        },
        async editMessage(messageId) {
            try {
                let data = {
                    message: this.messageEdit.message,
                }
                const res = await PostServices.modifyPost(`${messageId}`, data)
                console.log(res)
            } catch (error) {
                this.error = error.response.data.error
            }
        },
        async deleteMessage(messageId) {
            await PostServices.deletePost(`${messageId}`)
            location.reload(true)
        },
        async publishComment(id) {
            try {
                let data = {
                    text: this.text,
                    UserId: this.UserId,
                    PostId: id,
                    first_name: this.first_name,
                    last_name: this.last_name,
                }
                const response = await PostServices.createComment(data)
                console.log(response)
                this.comment = false
                this.currentPostId = null
                location.reload(true)
            } catch (error) {
                this.error = error.response.data.error
            }
        },
        async deleteComment(commentId) {
            await PostServices.deleteComment(`${commentId}`)
            location.reload(true)
        },
        dateParser(num) {

            let options = {
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }
            let timestamp = Date.parse(num)
            let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

            return date.toString()
        },
        profil(userId) {
            const router = this.$router
            // Get router for profil ID
            setTimeout(function () {
                router.push(`/profil/${userId}`).catch(() => { })
            }, 10)
        },
    },
}
</script>

<style lang="scss" scoped>
.cross,
.ml-3,
.customcursor {
    cursor: pointer;
}
</style>