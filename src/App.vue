<script setup>
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from 'aws-amplify';
  import outputs from '../backend/amplify_outputs.json'
  Amplify.configure(outputs);
</script>

<template>
  <authenticator>
    <template v-slot="{signOut }">
      <div>
        <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
          <div class="container">
            <router-link :to="{ path: '/' }" class="navbar-brand float-left">BoatApp Management</router-link>
            <ul class="nav navbar-nav flex-row float-right">
              <li class="nav-item">
                <router-link to="/create" class="nav-link pr-3">Create Boat</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/view" class="nav-link pr-3">View Boats</router-link>
              </li>
              <li class="nav-item">
                <button @click="signOut" class="nav-link pr-3 btn btn-link">Sign Out</button>
              </li>
            </ul>
          </div>
        </nav>

        <div class="container mt-5">
          <router-view></router-view>
        </div>
      </div>
    </template>
  </authenticator>
</template>
