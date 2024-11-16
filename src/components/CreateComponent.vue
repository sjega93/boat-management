<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Create Boat</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="Boat.name" required>
                </div>
                <div class="form-group">
                    <label for="description">Desciption</label>
                    <input type="text" class="form-control" v-model="Boat.description" required>
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
            }
            
        }
    },
    methods: {  
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/';

            axios.post(apiURL, this.Boat).then(() => {
                this.$router.push('/view');
                this.Boat = {
                    name: '',
                    description: ''
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
