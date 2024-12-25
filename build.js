const fs = require('fs')
const path = require('path')
const { minify } = require('html-minifier')
const archiver = require('archiver')

// Setup src and dist directory path
const srcDir = path.join(__dirname, 'src')
const distDir = path.join(__dirname, 'dist')

if (fs.existsSync(distDir)) {
    fs.readdirSync(distDir).forEach(file => {
        fs.unlinkSync(path.join(distDir, file));
      });
} else {
    fs.mkdirSync(distDir)
}

// Define the files to combine and zip in groups
// IMPORTANT: DO NOT USE "-" OR REMOVE "-black" AT THE END
// This is needed to selected the corresponding base theme (black, white, gray, azure)
const fileGroups = {
    'Neonglass-black': ['style.css'],
    'Neonglass_jsmods-black': ['style.css', 'fan_mod.js', 'gpu_mod.js']
}

// Iterate through all file groups
Object.entries(fileGroups).forEach(([groupName, files]) => {
    let combinedCSS = ''

    // Minify and combine content of each file in this group
    files.forEach(file => {
        const filePath = path.join(srcDir, file)
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const [name, ext] = filePath.split('.');
            var content = fs.readFileSync(filePath, 'utf8')

            // Convert javascript to html so minify can handle it
            if (ext == 'js')
                content = '<script type="text/javascript">' + content + '</script>'

            // Minify html/css
            const minified = minify(content, {
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeEmptyElements: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
            })

            // Add to combined css content
            if (ext == 'css')
                combinedCSS += minified
            else if (ext == 'html' || ext == 'js')
                combinedCSS += '</style>' + minified + '<style>'
            else
                console.log(`Error: Unknown file extension, ignoring file ${filePath}`)
        }
    })

    // Write combined minified content to dist
    const combinedFileName = `${groupName}.css`
    const combinedFilePath = path.join(distDir, combinedFileName)
    fs.writeFileSync(combinedFilePath, combinedCSS)
    // Copy theme config to dist
    const themeCfgFileName = `${groupName}.cfg`
    const themeCfgFilePath = path.join(distDir, themeCfgFileName)
    fs.copyFileSync('theme.cfg', themeCfgFilePath);

    // Create a ZIP for this group's combined file
    const zipFileName = `${groupName}.zip`
    const zipFilePath = path.join(distDir, zipFileName)
    const output = fs.createWriteStream(zipFilePath)
    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(output)
    archive.file(combinedFilePath, { name: combinedFileName })
    archive.file(themeCfgFilePath, { name: themeCfgFileName })
    archive.finalize()
    console.log(`Created ${zipFileName} including: ${files.join(', ')}`)
})
