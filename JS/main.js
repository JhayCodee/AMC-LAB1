import { calculatePerformance } from './calculator.js';
import { updateUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const results = calculatePerformance(data);
        updateUI(results);
    });
});
