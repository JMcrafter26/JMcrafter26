const fs = require('fs');

const thisYear = new Date().getFullYear();
const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime();
const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime();
const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear);

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generateProgressBar() {
    const capacity = 30;
    const passed = parseInt(progressOfThisYear * capacity);
    const bar = Array(capacity)
        .fill('▁')
        .map((v, i) => i < passed ? '█' : v)
        .join('');
    return `{ ${bar} }`;
}

const progressBar = generateProgressBar();
const dateStr = `${new Date().getDate()}-${monthNames[new Date().getMonth()]}-${new Date().getFullYear()}`;
const percentage = (progressOfThisYear * 100).toFixed(2);

const replacement = `⏳ **Year Progress:** ${progressBar} ${percentage}% as on ⏰ ${dateStr}`;

// Read the current README and replace the year progress line
let readme = fs.readFileSync('README.md', 'utf8');
readme = readme.replace(
    /⏳ \*\*Year Progress:\*\*.*/,
    replacement
);
fs.writeFileSync('README.md', readme);

console.log(`Updated year progress: ${percentage}%`);
