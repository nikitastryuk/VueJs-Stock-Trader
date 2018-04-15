<template>
    <div class="row mt-5">
        <div class="col-md-6 mx-auto">
            <div class="card rounded-0">
                <div class="card-header text-white bg-dark">
                    <h3 class="mb-0">Log In</h3>
                </div>
                <div class="card-body">
                    <div class="form">
                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="email" type="text" class="form-control form-control-lg rounded-0">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="password" type="password" class="form-control form-control-lg rounded-0">
                        </div>
                        <button @click="logIn" class="btn btn-success px-5 btn-lg float-right" id="btnLogin">Enter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: ""
            };
        },
        methods: {
            logIn() {
                const currenUser = {
                    email: this.email,
                    password: this.password
                };
                this.$store
                    .dispatch("login", currenUser)
                    .then(() => {
                        this.$router.push({
                            path: "/"
                        });
                    })
                    .catch(err => console.log(err));
            }
        }
    };
</script>