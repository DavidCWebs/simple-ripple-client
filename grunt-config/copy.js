module.exports = {
  js: {
    expand: true,
    cwd: 'src/js',
    src: '**',
    dest: 'dist/js'
  },
  html: {
    expand: true,
    cwd: 'src',
    src: '**',
    dest: 'dist',
    exclude: ['/js', 'ripple-js']
  }
}
