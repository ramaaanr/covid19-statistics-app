import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import 'jquery';
import 'moment';
import 'sweetalert2';
import Chart from 'chart.js/auto';
window.Chart = Chart;

import './scripts/components/global-card-container.js';
import './scripts/components/country-card-container';
import main from './scripts/views/main.js';
main();
