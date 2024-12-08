<template lang="">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Edit Boat</h1>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="Boat.name" required>
                </div>
                <div class="form-group mb-3">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" v-model="Boat.description" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Update</button>
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
            }
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Boat = res.data;
        });
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/${this.$route.params.id}`;
            axios.put(apiURL, this.Boat).then((res) => {
                console.log(res);
                this.$router.push('/view');
            }).catch(error => {
                console.log(error);
            });
        }
    }
};
</script>
