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
    // files: [
    //   {
    //     src: 'src/index.html',
    //     dest: 'dist/index.html'
    //   },
    //   {
    //     src: 'src/offline-signing.html',
    //     dest: 'dist/offline-signing.html'
    //   },
    //   {
    //     src: 'src/app.css',
    //     dest: 'dist/app.css'
    //   }
    // ]
  }
}
