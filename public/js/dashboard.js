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
      credentials: 'include',
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

// get page to edit/update/put blog function
async function getEditBlog(event) {
  event.preventDefault();

  document.location.replace('/edit');
}

$('#blog-container').on('click', '#update-blog-btn', getEditBlog)



// edit/update/put blog function
// async function editBlog(event) {
//   event.preventDefault();

//   let inputName = document.querySelector('#blog-name')
//   let inputDesc = document.querySelector('#blog-description')

//   const id = event.target.attributes[2].value;;
//   const name = inputName.value;
//   const description = inputDesc.value;

//   const response = await fetch(`/api/blogs/${id}`, {
//     method: 'PUT',
//     credentials: 'include',
//     body: JSON.stringify({
//       name,
//       description
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (response.ok) {
//     document.location.replace('/edit-blog');
//   } else {
//     alert(response.statusText);
//   }
// }

// $('#blog-container').on('click', '#update-blog-btn', editBlog)


// delete/destroy blog function
const deleteBlog = async (event) => {
  try {
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

$('#blog-container').on('click', '#delete-blog-btn', deleteBlog)