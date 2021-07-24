// create/add/post blog function

async function createBlog(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="blog-name"]').value;
  const description = document.querySelector('input[name="blog-description"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// edit/update/put blog function

document.querySelector('.new-blog-form').addEventListener('submit', createBlog);

async function editBlog(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="blog-name"]').value;
  const description = document.querySelector('input[name="blog-content"]').value;
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          name,
          description
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editBlog);


// delete/destroy blog function

async function deleteBlog(event) {
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        blog_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  
}

document.querySelector('.delete-blog-btn').addEventListener('click', deleteBlog);
