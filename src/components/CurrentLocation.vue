<template>
    <div id="currentloctaion">
        <div v-if="geo == true">
            <v-card 
            min-height="80px" 
            elevation="3"
            >
                <v-container>
                    <div id="skycon">
                        <div v-if="current.icon == 'clear-day'"><skycon class="skycon" condition="clear-day"></skycon></div>
                        <div v-else-if="current.icon == 'clear-night'"><skycon class="skycon" condition="clear-night"></skycon></div>
                        <div v-else-if="current.icon == 'partly-cloudy-day'"><skycon class="skycon" condition="partly-cloudy-day"></skycon></div>
                        <div v-else-if="current.icon == 'partly-cloudy-night'"><skycon class="skycon" condition="partly-cloudy-night"></skycon></div>
                        <div v-else-if="current.icon == 'cloudy'"><skycon class="skycon" condition="cloudy" ></skycon></div>
                        <div v-else-if="current.icon == 'rain'"><skycon class="skycon" condition="rain" ></skycon></div>
                        <div v-else-if="current.icon == 'sleet'"><skycon class="skycon" condition="sleet" ></skycon></div>
                        <div v-else-if="current.icon == 'snow'"><skycon class="skycon" condition="snow" ></skycon></div>
                        <div v-else-if="current.icon == 'wind'"><skycon class="skycon" condition="wind" ></skycon></div>
                        <div v-else-if="current.icon == 'fog'"><skycon class="skycon" condition="fog" ></skycon></div>
                    </div>
                    <div id="location">
                        <h2>{{ current.city }}</h2>
                        <h3>{{ current.state + ', ' + current.country}}</h3>
                    </div>
                    <div id="temp">
                        <h1>{{ current.temp + 'ºF'}}</h1>
                    </div>
                </v-container>
            </v-card>
        </div>
        <div v-else-if="geo == false">
            <div id="message">
                <span>{{ messege }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => {
        return {
            geo: true,
            messege: '',
            current: {
                lat: null,
                lng: null,
                city: 'Mesa',
                state: 'Arizona',
                country: 'United States',
                temp: '45',
                icon: 'clear-day'
            },
        }
    }, 
    components: {
    },

    created() {

        if(process.browser) {

            navigator.geolocation.getCurrentPosition(position => {
                
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

            })

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const darkSkyKey = process.env.VUE_APP_DARKSKY
                const darkSkyApi = `${proxy}https://api.darksky.net/forecast/${darkSkyKey}/${this.lat},${this.lng}`;

                //const googleKey = process.env.VUE_APP_GOOGLE
                //const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?key=${googleKey}&latlng=${this.lat},${this.lng}`;

                
                axios({ method: "GET", "url": darkSkyApi}).then(doc => {

                    this.current.temp = Math.round(doc.data.currently.temperature)
                    this.current.icon = doc.data.currently.icon
                })

                /*axios.get(googleApi).then(doc=>{
                    this.current.city = doc.data.results[0].address_components[2].long_name
                    this.current.state = doc.data.results[0].address_components[4].long_name
                    this.current.country = doc.data.results[0].address_components[5].long_name
                })*/

            
        } 

    }, 

    methods: {
 
    }
}
</script>

<style lang="scss">

    #messege {
        color: rgb(129, 129, 129);
    }

    .skycon {
        position: absolute;
        height: 45px;
        top: 17px;
        left: 15px;
    }

    #location {
        position: absolute;
        top: 13px;
        left: 80px;
        color: rgb(68, 68, 68);

        h2 {
            font-size: 20px;
        }
        h3 {
            font-size: 15px;
            margin-left: 2px;
        }
    }

    #temp{
        position: absolute;
        top: 18px;
        right: 20px;
        font-size: 15px;
        color: rgb(85, 84, 84);
    }
</style>