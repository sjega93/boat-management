<template>
    <div class="container">
        <h1>Boat Details</h1>
        <div v-if="boat">
            <p><strong>Name:</strong> {{ boat.name }}</p>
            <p><strong>Year:</strong> {{ boat.year }}</p>
            <p><strong>Location:</strong> {{ boat.location }}</p>
            <p><strong>Value:</strong> {{ boat.value }}</p>
            <p><strong>Further Description</strong> {{ boat.description }}</p>

        </div>
        <div v-else>
            <p>Loading boat details...</p>
        </div>
    </div>
    </template>
    <script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                boat: null
            };
        },
        created() {
            let id = this.$route.params.id;
            let apiURL = `https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api/${id}`;
            axios.get(apiURL).then(res => {
                this.boat = res.data;
            }).catch(error => {
                console.log(error);
            });
        }
    };
    </script>
    <style lang="">
    </style>
    