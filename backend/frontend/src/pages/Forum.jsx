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
    // Fetch the list of forum posts from the API
    fetch('/api/forum')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    // Post the new forum post to the server
    fetch('/api/forum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPosts([data.post, ...posts]);
          setNewPost('');
        } else {
          console.error('Error adding post:', data.error);
        }
      })
      .catch(error => console.error('Error adding post:', error));
  };

  if (loading) return <div className="container mt-3"><p>Loading...</p></div>;
  if (error) return <div className="container mt-3"><p>Error loading posts: {error.message}</p></div>;

  return (
    <>
        <NavBar/>
        
    <div className="container mt-3">
      <h2 className="mb-4">Forum</h2>

      <form onSubmit={handlePostSubmit} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={newPost}
            onChange={handlePostChange}
            placeholder="Write your post here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
      </form>

      <div className="list-group">
        {posts.map(post => (
          <div key={post._id} className="list-group-item mb-2">
            <p>{post.content}</p>
            <small className="text-muted">
              {formatDate(post.createdAt)}
            </small>
          </div>
        ))}
      </div>
    </div>
    </>

  );
};

export default Forum;
