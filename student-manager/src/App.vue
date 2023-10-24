<template>
  <div>
    <nav class="navbar navbar-expand bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/student/create" class="nav-link">Create</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view class="container py-2"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
</style>
