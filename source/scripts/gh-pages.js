require('gh-pages').publish('public', {
  dotfiles: true
}, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Published')
  }
})
