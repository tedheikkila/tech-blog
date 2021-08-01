// create/add/post blog function
async function createBlog(event) {
  event.preventDefault();

  let inputName = document.querySelector('#blog-name')
  let inputDesc = document.querySelector('#blog-description')

  const name = inputName.value.trim();
  const description = inputDesc.value.trim();

  if (name && description) {
    const response = await fetch(`/api/dashboard`, {
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

// listens for update btn event and changes doc location to edit blog
const editBlog = (event) => {
  if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      document.location.replace(`/edit/${id}`);
  }
};

if(document.querySelector('#update-blog-btn')) {
document.querySelector('#update-blog-btn').addEventListener('click', editBlog);
}

// delete/destroy blog function
const deleteBlog = async (event) => {
  try {
    // finds attribute value via DOM manipulation (practicing new manip methods for data)
    const id = event.target.attributes[2].value;;

    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }

  } catch (error) {
    console.log(error)
  }
}

// use jQuery for change of pace/practice
$('#blog-container').on('click', '#delete-blog-btn', deleteBlog)