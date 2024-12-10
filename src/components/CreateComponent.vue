<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Create Boat</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="Boat.name" required>
                </div>
                <div class="form-group mb-3">
                    <label for="Year">Year</label>
                    <input type="text" class="form-control" v-model="Boat.year" required>
                </div>
                <div class="form-group mb-3">
                    <label for="Location">Location</label>
                    <input type="text" class="form-control" v-model="Boat.location" required>
                </div>
                <div class="form-group mb-3">
                    <label for="Value">Value [CHF]</label>
                    <input type="number" class="form-control" v-model="Boat.value" required>
                </div>
                <div class="form-group mb-3">
                    <label for="description">Further Description</label>
                    <input type="text" class="form-control" v-model="Boat.description">
                </div>
                <div class="form-group">
                    <button class="btn btn-success btn-block">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            Boat: {
                name: '',
                description: '',
                location: '',
                year: '',
                value: ''
            }
        };
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api/';

            axios.post(apiURL, this.Boat).then(() => {
                this.$router.push('/view');
                this.Boat = {
                    name: '',
                    description: ''
                };
            }).catch(error => {
                console.log(error);
            });
        }
    }
};
</script>
