// Module Imports
const gulpCore          = require('./gulp-core');
const sourcemaps        = require('gulp-sourcemaps');
const ts                = require('gulp-typescript');

// Assign Modules From Gulp-Core
const gulp      = gulpCore.gulp;
const gutil     = gulpCore.gutil;

/**
 * Builds Typescript Files from src Directory
 *  Outputs into the 'out' directory
 *  Moves HTML UNTOUCHED
 */
gulp.task('build:typescript', ['move:html'], () => {
    // Create TS Config
    const tsConfig = ts.createProject('tsconfig.json');
    const tsReporter = ts.reporter.emptyCompilationResult();        // Display Error w/o Breaking

    // Run & Return Build
    return gulp.src('src/**/*.?s')      // Import TS Files
        .pipe(sourcemaps.init())        // Initiate Source Mapping
        .pipe(tsConfig(tsReporter))     // Run the TS Config based on JSON File Compile
        .on('error', gutil.log)         // Log only Errors that occur
        .pipe(sourcemaps.write('./'))   // Write out Source Maps
        .pipe(gulp.dest('out'));        // Output Results to 'out' directory
});


/** Moves '.html' files UNTOUCHED from 'src' Directory */
gulp.task('move:html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('out'));
});