import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/forum')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    fetch('/api/forum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPosts([data.post, ...posts]);
          setNewPost('');
        } else {
          console.error('Error adding post:', data.error);
        }
      })
      .catch((error) => console.error('Error adding post:', error));
  };

  if (loading) return <div className="container mt-3"><p>Loading...</p></div>;
  if (error) return <div className="container mt-3"><p>Error loading posts: {error.message}</p></div>;

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Student Forum</h2>

        {/* Form to create new posts */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h4 className="card-title mb-3">Create a New Post</h4>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  value={newPost}
                  onChange={handlePostChange}
                  placeholder="Write your post here..."
                  required
                ></textarea>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Display posts */}
        <div className="list-group">
          {posts.map((post) => (
            <div key={post._id} className="list-group-item mb-4 shadow-sm">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">{post.user.fullname}</h5>
                  <p className="mb-1">{post.content}</p>
                </div>
                <div className="text-muted text-end">
                  <small>{formatDate(post.createdAt)}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Forum;
