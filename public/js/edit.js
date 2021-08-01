
// does put method to update selected blog
const editThisBlog = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-description').value.trim();

    if (name && description) {
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/dashboard/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, description }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to update blog');
            }
        }
    }
};

document.querySelector('.edit-blog-form').addEventListener('submit', editThisBlog);