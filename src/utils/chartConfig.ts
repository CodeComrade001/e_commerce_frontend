// src/utils/chartConfig.ts
import { Chart, registerables } from 'chart.js';

// register all controllers, elements, scales, and plugins
Chart.register(...registerables);

export default Chart;
