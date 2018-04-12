<template>
  <div class="jumbotron container">
    <h1 class="display-4">Login <img id="logo" src="../assets/logo.png" alt=""></h1>
    <hr>
    <form>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="email" class="form-control" v-model="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" v-model="inputPassword" placeholder="Password">
      </div>
    </form>
    <p class="lead">
      <a class="btn btn-primary btn-lg text-light" @click="login" role="button">Login</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  data () {
    return {
      inputEmail: '',
      inputPassword: ''
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:3000/users/login', {
        email: this.inputEmail,
        password: this.inputPassword
      }).then(response => {
        localStorage.setItem('token', response.data.token)
        swal(
          'Your Token',
          localStorage.getItem('token'),
          'info'
        )
      }).catch(error => {
        console.log(error)
        swal(
          'Login failed!',
          'Wrong email or password',
          'error'
        )
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
