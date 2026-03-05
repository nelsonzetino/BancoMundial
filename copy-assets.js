const fs = require('fs-extra');
const path = require('path');

const assets = [
    'index.html',
    'img',
    'fonts',
    'css/styles.css'
];

const dist = path.join(__dirname, 'dist');

async function copyAssets() {
    try {
        // Ensure dist exists
        await fs.ensureDir(dist);

        for (const asset of assets) {
            const src = path.join(__dirname, asset);
            const dest = path.join(dist, asset);

            if (await fs.pathExists(src)) {
                await fs.copy(src, dest);
                console.log(`Copied ${asset} to dist/`);
            } else {
                console.warn(`Warning: ${asset} not found, skipping.`);
            }
        }
        console.log('Successfully copied all assets to dist/');
    } catch (err) {
        console.error('Error copying assets:', err);
        process.exit(1);
    }
}

copyAssets();
