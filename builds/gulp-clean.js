// Module Imports
const gulpCore      = require('./gulp-core');
const del           = require('del');

// Assign Modules From Gulp-Core
const gulp          = gulpCore.gulp;


/** Cleans 'dist' directory */
gulp.task('clean:dist', () => { 
    return del(['dist/*']);
});

/** Cleans 'out' directory */
gulp.task('clean:out', () => {
    return del(['out/*']);
});

/** 
 * Runs ALL Clean Tasks 
 *  'out' directory cleanup     -> clean:out
 *  'dist' directory cleanup    -> clean:dist
 */
gulp.task('clean:all', ['clean:dist', 'clean:out']);
