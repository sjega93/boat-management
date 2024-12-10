<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Create Boat</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="Boat.name"
                        @blur="validateField('name')"
                        :class="{'is-invalid': errors.name}"
                    >
                    <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="Year">Year</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="Boat.year"
                        @blur="validateField('year')"
                        :class="{'is-invalid': errors.year}"
                    >
                    <div v-if="errors.year" class="invalid-feedback">{{ errors.year }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="Location">Location</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="Boat.location"
                        @blur="validateField('location')"
                        :class="{'is-invalid': errors.location}"
                    >
                    <div v-if="errors.location" class="invalid-feedback">{{ errors.location }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="Value">Value [CHF]</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model="Boat.value"
                        @blur="validateField('value')"
                        :class="{'is-invalid': errors.value}"
                    >
                    <div v-if="errors.value" class="invalid-feedback">{{ errors.value }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="description">Further Description</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="Boat.description"
                    >
                </div>
                <div class="form-group">
                    <button
                        class="btn btn-success btn-block"
                        :disabled="!isFormValid"
                    >
                        Create
                    </button>
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
            },
            errors: {
                name: null,
                year: null,
                location: null,
                value: null
            }
        };
    },
    computed: {
        isFormValid() {
            return !Object.values(this.errors).some(error => error !== null);
        }
    },
    methods: {
        validateField(field) {
            switch (field) {
                case 'name':
                    this.errors.name = this.Boat.name.trim() === '' ? 'Name is required' : null;
                    break;
                case 'year':
                    this.errors.year = /^\d{4}$/.test(this.Boat.year)
                        ? null
                        : 'Year must be a 4-digit number';
                    break;
                case 'location':
                    this.errors.location = this.Boat.location.trim() === '' ? 'Location is required' : null;
                    break;
                case 'value':
                    this.errors.value = this.Boat.value > 0
                        ? null
                        : 'Value must be a positive number';
                    break;
            }
        },
        async handleSubmitForm() {
            for (const field in this.errors) {
                this.validateField(field);
            }

            if (this.isFormValid) {
                let apiURL = 'https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api/';
                try {
                    await axios.post(apiURL, this.Boat);
                    this.$router.push('/view');
                    this.Boat = {
                        name: '',
                        description: '',
                        location: '',
                        year: '',
                        value: ''
                    };
                } catch (error) {
                    console.error('Error creating boat:', error);
                }
            } else {
                console.log('Form has validation errors!');
            }
        }
    }
};
</script>
