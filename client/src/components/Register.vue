<template>
  <div class="jumbotron container">
    <h1 class="display-4">Register <img id="logo" src="../assets/logo.png" alt=""></h1>
    <hr>
    <form>
      <div class="form-group">
        <p :class="{ 'control': true }">
        <label class="label" for="email">Email</label>
            <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email" class="form-control" v-model="inputEmail">
            <span v-show="errors.has('email')" class="form-text text-danger">{{ errors.first('email') }}</span>
        </p>
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" v-model="inputPassword" placeholder="Password">
      </div>
    </form>
    <p class="lead">
      <a class="btn btn-primary btn-lg text-light" @click="register" role="button">Register</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
export default {
  data () {
    return {
      inputEmail: '',
      inputPassword: '',
      errorEmail: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/users/register', {
        email: this.inputEmail,
        password: this.inputPassword
      }).then(response => {
        swal(
          'Register success!',
          'You will go to login page',
          'success'
        )
        this.$router.push({path: 'login'})
      })
    }
  }
}
</script>

<style>
#logo{
  max-width: 50px;
}
</style>
