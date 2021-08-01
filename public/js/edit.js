const editBlog = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-content').value.trim();

    if (title && content) {
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/dashboard/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to update post');
            }
        }
    }
};

document.querySelector('.edit-blog-form').addEventListener('submit', editBlog);