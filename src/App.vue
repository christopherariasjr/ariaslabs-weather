<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
            md="8"
            lg="6"
            xl="2"
            class="offset-sm-2 offset-md-2 offset-lg-3"
          >
            <CurrentLocation />
          </v-col>
        </v-row>
        
      </v-container>
    </v-app>
  </div>
</template>

<script>
import CurrentLocation from './components/CurrentLocation';

export default {
  name: 'App',

  components: {
    CurrentLocation,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
  #app {
    background: rgb(245,190,190);
    background: linear-gradient(56deg, rgba(245,190,190,1) 2%, rgba(161,232,247,1) 89%); 
  }
</style>
