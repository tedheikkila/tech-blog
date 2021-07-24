async function commentFormHandler(event) {
    event.preventDefault();
  
    const commentDescription = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (commentDescription) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            blog_id,
            commentDescription
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
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);