<template lang="">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h1>Boat Overview</h1>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>BoatName</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="boat in Boats" :key="boat._id">
                                <td>
                                    <router-link :to="{ name: 'boatDetail', params: { id: boat._id } }">
                                        {{ boat.name }}
                                    </router-link>
                                </td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <router-link :to="{ name: 'edit', params: { id: boat._id } }" class="btn btn-success">
                                            Edit
                                        </router-link>
                                        <button @click.prevent="deleteBoat(boat._id)" class="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            Boats: []
        }
    },
    created() {
        let apiURL = 'https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api';
        axios.get(apiURL).then(res => {
            this.Boats = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteBoat(id) {
            let apiURL = `https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api/${id}`;
            let indexOfArrayItem = this.Boats.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Boats.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>
<style lang="">
    
</style>