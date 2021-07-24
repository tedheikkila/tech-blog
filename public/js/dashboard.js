// create/add/post blog function

async function createBlog(event) {
  event.preventDefault();

  let inputName = document.querySelector('#blog-name')
  let inputDesc = document.querySelector('#blog-description')

  const name = inputName.value.trim();
  const description = inputDesc.value.trim();

  if (name && description) {

    const response = await fetch(`/api/blog`, {
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
}

document.querySelector('.new-blog-form').addEventListener('submit', createBlog);


// edit/update/put blog function

async function editBlog(event) {
  event.preventDefault();

  let inputName = document.querySelector('#blog-name')
  let inputDesc = document.querySelector('#blog-description')

  const name = inputName.value;
  const description = inputDesc.value;
  // const id = window.location.toString().split('/')[
  //     window.location.toString().split('/').length - 1
  //   ];

  const response = await fetch(`/api/blog/${id}`, {
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

document.querySelector('#update-blog-btn').addEventListener('click', editBlog);


// delete/destroy blog function

async function deleteBlog(event) {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }



}

document.querySelector('#delete-blog-btn').addEventListener('click', deleteBlog);
