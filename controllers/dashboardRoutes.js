const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },

      include: [
        {
          model: User,
          attributes: ['name'],

        },

        {
          model: Comment,
        }
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      blogs, 
      logged_in: true 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      where: {
        id: req.params.id
      },
    
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('edit-blog', {
      ...blog,
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
          attributes: ['name'],
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