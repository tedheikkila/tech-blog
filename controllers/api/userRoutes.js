const router = require('express').Router();
const { User, Comment, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// gets /api/users
router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets /api/users/id
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: req.params.id
      },
      include: [
          {
            model: Blog,
          },
          {
            model: Comment,
          }
        ]
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post /api/users
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  .then(userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;
  
      res.json(userData);
    });
  });
});

// post /login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userData => {
    if (!userData) {
      res.status(400).json({ message: 'No user with that email address' });
      return;
    }

    const okPassword = userData.checkPassword(req.body.password);

    if (!okPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in' });
    });
  });
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// put /api/users/id
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
    }
  })
    .then(userData => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete /api/users/id
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
