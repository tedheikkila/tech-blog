const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    await Blog.findAll({
      order: [['date_created', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },

        {
          model: Comment,
          attributes: ['name'],
        }
      ],
    }).then(blogData => res.json(blogData))
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await Blog.findByPk(req.params.id, {
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
          attributes: ['name'],
        }
      ],
    }).then(blogData => {
      if(!blogData) {
        res.status(404).json({message: "No blog found with that id"})
        return
      }
      res.json(blogData)
  
    })
    
  } catch (err) {
    res.status(500).json(err);
  }

    
});

router.post('/', withAuth, async (req, res) => {
  try {
    await Blog.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id
    })
    
    .then(newBlog => res.json(newBlog))

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await Blog.update({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id
    })
    
    .then(newBlog => res.json(newBlog))

  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one blog by its `id`
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with that id' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
