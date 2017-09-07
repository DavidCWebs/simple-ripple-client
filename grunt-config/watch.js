module.exports = {
  options: {
    livereload: 35729
  },
  html: {
    files: [
      'src/**',
    ],
    tasks: [
      'copy:js',
      'copy:html',
      'browserify:main'
    ]
  }
};
