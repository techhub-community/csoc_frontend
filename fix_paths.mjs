import fs from 'fs';
const content = fs.readFileSync('src/data/Teams.js', 'utf8');
const realPublicFiles = fs.readdirSync('public');
const realPublicImageFiles = fs.readdirSync('public/image');

const newContent = content.replace(/\.\/image\/([^"']+)/g, (match, filename) => {
    const lowerFilename = filename.toLowerCase();
    
    let trueName = realPublicImageFiles.find(x => x.toLowerCase() === lowerFilename);
    if (trueName) {
        return '/image/' + trueName;
    }
    
    trueName = realPublicFiles.find(x => x.toLowerCase() === lowerFilename);
    if (trueName) {
        return '/' + trueName;
    }
    
    return '/' + filename;
});

fs.writeFileSync('src/data/Teams.js', newContent);
console.log('Fixed Teams.js paths!');
