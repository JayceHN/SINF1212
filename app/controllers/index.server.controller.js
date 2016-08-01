exports.render = function(req, res){
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  req.session.lastVisit = new Date();

  // use index.ejs to render what's in "% %"
  res.render('index', {
    title: 'Hello, world!',
    userFullName: req.user ? req.user.Pseudo : ''
  });
};
