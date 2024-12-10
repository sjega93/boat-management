<template lang="">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Edit Boat</h1>
            <form @submit.prevent="handleUpdateForm">
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
                    <label for="description">Year</label>
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
                    <label for="location">Location</label>
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
                    <label for="value">Value [CHF]</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="Boat.value"
                        @blur="validateField('value')"
                        :class="{'is-invalid': errors.value}"
                    >
                    <div v-if="errors.value" class="invalid-feedback">{{ errors.value }}</div>
                </div>
                <div class="form-group mb-3">
                    <label for="description">Additional Information</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="Boat.description"
                    >
                </div>
                <div class="form-group">
                    <button
                        class="btn btn-primary btn-block"
                        :disabled="!isFormValid"
                    >
                        Update
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
            // Ensure there are no validation errors
            return !Object.values(this.errors).some(error => error !== null);
        }
    },
    created() {
        let apiURL = `https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.Boat = res.data;
        });
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
        async handleUpdateForm() {
            // Validate all fields before submission
            for (const field in this.errors) {
                this.validateField(field);
            }

            if (this.isFormValid) {
                let apiURL = `https://wxevu5rertmsowcflgfnchf3ua0flgdh.lambda-url.eu-central-1.on.aws/api/${this.$route.params.id}`;
                try {
                    await axios.put(apiURL, this.Boat);
                    this.$router.push('/view');
                } catch (error) {
                    console.error('Error updating boat:', error);
                }
            } else {
                console.log('Form has validation errors!');
            }
        }
    }
};
</script>
