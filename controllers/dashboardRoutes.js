const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },

      include: [
        {
          model: User,
        },

        {
          model: Comment,
        }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a blog by its `id` value
router.put('/:id', async (req, res) => {
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(blogData => {
      if (!blogData[0]) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/edit', withAuth, (req, res) => {
  
  try {
    const blogData = await Blog.findOne({
      where: {
        user_id: req.session.user_id
      },

      include: [
        {
          model: User,
        },

        {
          model: Comment,
        }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('edit', {
      blogs,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll(req.params.id, {
      where: {
        user_id: req.session.user_id
      },

      include: [
        {
          model: User,
        },
        {
          model: Comment,
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('create-blog', {
      ...blog,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;