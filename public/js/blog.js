
// posts a new comment on blog
const newComment = async (event) => {
  event.preventDefault();
  const description = document.querySelector('.comment-text').value.trim();

  if (description) {
      if (event.target.hasAttribute('data-id')) {
          const blog_id = event.target.getAttribute('data-id');
          const response = await fetch(`/api/blog`, {
              method: 'POST',
              body: JSON.stringify({ description, blog_id }),
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              document.location.reload();
          } else {
              alert('Failed to create comment');
          }
      }
  }
};

if (document.querySelector("#submit-comment")) {
  document.querySelector('#submit-comment').addEventListener('click', newComment);
}
