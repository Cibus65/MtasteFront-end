
// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


import { createApp } from 'vue';
import App from './App.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(VueSweetalert2);


app.mount('#app');
const express = require('express');
const cors = require('cors');

app.use(cors());
require('dotenv').config();
