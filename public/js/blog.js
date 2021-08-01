async function commentSubmit(event) {
    event.preventDefault();
  
    const description = document.querySelector("#comment-text").value.trim();

    console.log(description)
  
    if (description) {
        const response = await fetch('/api/blog', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            description,
            blog_id,
            user_id,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('#comment-form').addEventListener('submit', commentSubmit);
