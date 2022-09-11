import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import 'jquery';
import 'moment';
import 'sweetalert2';
import Chart from 'chart.js/auto';
import './scripts/components/global-card-container';
import './scripts/components/country-card-container';
import main from './scripts/views/main';

window.Chart = Chart;

main();
