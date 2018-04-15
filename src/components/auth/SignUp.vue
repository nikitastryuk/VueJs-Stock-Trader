<template>
    <div class="row mt-5">
        <div class="col-md-6 mx-auto">
            <div class="card rounded-0">
                <div class="card-header text-white bg-dark">
                    <h3 class="mb-0">Sign Up</h3>
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
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input v-model="confirm" type="password" class="form-control form-control-lg rounded-0">
                        </div>
                        <button @click="signUp" class="btn btn-success px-5 btn-lg float-right" id="btnLogin">Create account</button>
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
                password: "",
                confirm: ""
            }
        },
        methods: {
            signUp() {
                const newUser = {
                    email: this.email,
                    password: this.password,
                    confirm: this.confirm
                };
                this.$store.dispatch('signup', newUser).then(() => {
                    this.$router.push({
                        'path': '/login'
                    })
                }).catch(err => console.log(err));
            }
        }
    }
</script>