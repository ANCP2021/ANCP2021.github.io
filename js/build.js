#!/usr/bin/env node

/**
 * CSS Build Script
 * Concatenates all modular CSS files into a single production file
 * Usage: node js/build.js
 */

const fs = require('fs');
const path = require('path');

// CSS files in order of import (relative to css/ directory)
const cssFiles = [
    'base.css',
    'navigation.css',
    'components.css',
    'home.css',
    'publications.css',
    'experience.css',
    'contact.css',
    'footer.css',
    'responsive.css'
];

// Output file (will be created in css/ directory)
const outputFile = 'styles.min.css';

function buildCSS() {
    console.log('Building CSS...');
    
    // Get the css directory path (one level up from js/)
    const cssDir = path.join(__dirname, '..', 'css');
    const outputPath = path.join(cssDir, outputFile);
    
    let combinedCSS = '';
    
    cssFiles.forEach(file => {
        const filePath = path.join(cssDir, file);
        
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            combinedCSS += `/* ${file} */\n`;
            combinedCSS += content;
            combinedCSS += '\n\n';
            console.log(`Added ${file}`);
        } else {
            console.error(`File not found: ${file}`);
        }
    });
    
    // Write combined file
    fs.writeFileSync(outputPath, combinedCSS);
    
    console.log(`\nBuild complete! Output: css/${outputFile}`);
    console.log(`Total size: ${(combinedCSS.length / 1024).toFixed(2)}KB`);
    console.log(`\nTo use the optimized version, update your HTML files to reference:`);
    console.log(`<link rel="stylesheet" href="css/${outputFile}">`);
}

// Run build
buildCSS();
