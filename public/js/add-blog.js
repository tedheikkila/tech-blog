async function newFormHandler(event) {
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
  
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);