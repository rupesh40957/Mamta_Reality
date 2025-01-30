import { useState, useEffect, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/solid';
import axios from 'axios';
import 'quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: '' });
  const [imageError, setImageError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const quillRef = useRef(null);
  const quillEditor = useRef(null);

  // Fetch posts from the backend API with pagination
  const fetchPosts = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/auth/admin/blogs-listing?page=${page}&limit=${limit}`);
      setPosts(response.data.blogs);
      setTotalPosts(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error fetching posts. Please try again.');
      console.error('Error fetching posts:', error);
    }
  }, []);

  // // Handle adding or editing a post
  // const handleSavePost = async () => {
  //   const editorContent = quillEditor.current.root.innerHTML;
  //   if (!newPost.title.trim() || !editorContent.trim()) {
  //     toast.error('Title and description are required.');
  //     return;
  //   }
  //   const postData = {
  //     title: newPost.title,
  //     description: editorContent,
  //     image: newPost.image,
  //   };

  //   try {
  //     setLoading(true);
  //     if (isEditMode && currentPostId) {
  //       // Edit existing post
  //       await axios.put(`/api/admin/blogs-listing?id=${currentPostId}`, postData);
  //       toast.success('Post updated successfully!');
  //     } else {
  //       // Create new post
  //       await axios.post('/api/admin/blogs-listing', postData);
  //       toast.success('Post created successfully!');
  //     }

  //     // Reset state and fetch updated posts
  //     setIsModalOpen(false);
  //     fetchPosts(page);
  //     resetNewPost();
  //     setCurrentPostId(null); // Clear the ID after save
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error saving post:', error);
  //     toast.error('Something went wrong while saving the post.');
  //   }
  // };


  const handleSavePost = async () => {
    const editorContent = quillEditor.current.root.innerHTML;
    if (!newPost.title.trim() || !editorContent.trim()) {
      toast.error('Title and description are required.');
      return;
    }
  if(newPost.image === ''){
    toast.error('Image is required.');
    return;
  }
    const postData = {
      title: newPost.title,
      description: editorContent,
      image: newPost.image,
    };
  
    try {
      setLoading(true);
      if (isEditMode && currentPostId) {
        console.log("edit mode");
        console.log(postData);
        // Edit existing post
        await axios.put(`/api/auth/admin/blogs-listing?id=${currentPostId}`, postData);
        toast.success('Post updated successfully!');
      } else {
        // Create new post
        await axios.post('/api/auth/admin/blogs-listing', postData);
        toast.success('Post created successfully!');
      }
  
      // Reset state and fetch updated posts
      setIsModalOpen(false);
      fetchPosts(page); // ensure posts list is refreshed
      resetNewPost();
      setCurrentPostId(null); // Clear the ID after save
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error saving post:', error);
      toast.error('Something went wrong while saving the post.');
    }
  };
  

  // Handle file upload (image)
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setNewPost({ ...newPost, image: URL.createObjectURL(file) });
      setImageError('');
    } else {
      setImageError('Only image files are allowed.');
      toast.error('Only image files are allowed.');
    }
  }, [newPost]);

  // Initialize Quill editor when modal opens
  useEffect(() => {
    if (isModalOpen && typeof window !== 'undefined') {
      import('quill').then((Quill) => {
        quillEditor.current = new Quill.default(quillRef.current, {
          theme: 'snow',
          placeholder: 'Write your post content here...',
          modules: {
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['bold', 'italic', 'underline'],
              ['link'],
              ['blockquote'],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              [{ script: 'sub' }, { script: 'super' }],
              ['image', 'video'],
              ['clean'],
            ],
          },
        });

        if (isEditMode && currentPostId !== null) {
          const postToEdit = posts.find((post) => post.id === currentPostId);
          if (postToEdit) {
            quillEditor.current.root.innerHTML = postToEdit.description || '';
            setNewPost({ ...postToEdit });
          }
        } else {
          quillEditor.current.root.innerHTML = '';
        }
      });
    }
  }, [isModalOpen, currentPostId, isEditMode, posts]);

  // Reset new post state
  const resetNewPost = () => {
    setNewPost({ title: '', description: '', image: '' });
    if (quillEditor.current) quillEditor.current.root.innerHTML = '';
  };

  // Handle search filter
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchPosts(newPage);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleEditClick = (postId) => {
    setIsEditMode(true);

    console.log("Change post id", postId);
    setCurrentPostId(postId); // Set the current post ID for editing

    const postToEdit = posts.find((post) => post._id === postId);
    console.log("post to edit", postToEdit.description);
    if (postToEdit) {
      setNewPost({
        title: postToEdit.title,
        description: postToEdit.description,
        image: postToEdit.image,
      });

      if (quillEditor.current) {
      quillEditor.current.root.innerHTML = postToEdit.description || '';
      }

      setIsModalOpen(true); // Open the modal for editing
    } else {
      toast.error('Post not found for editing.');
    }
  };





  const handleViewClick = (post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPost(null);
  };

  const handleDeleteClick = async (postId) => {
    const confirmation = window.confirm('Are you sure you want to delete this post?');
    if (!confirmation) return;

    try {
      await axios.delete(`/api/auth/admin/blogs-listing?id=${postId}`);
      fetchPosts(page); // Refresh the posts list after deletion
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete the post.');
    }
  };

  // Initial data fetch when component mounts
  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  return (
    <div  className='text-gray-900'>
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <button
          onClick={() => { setIsEditMode(false); setIsModalOpen(true); resetNewPost(); }}
          className="w-full md:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Post</span>
        </button>
      </div>
    </div>

      {/* Modal for Add/Edit Post */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
            <h3 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Post' : 'Add New Post'}</h3>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <div ref={quillRef} className="mb-4" style={{ height: '200px' }} />

            <div
              {...getRootProps()}
              className={`w-full p-6 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer ${imageError ? 'border-red-500' : 'border-gray-300'}`}
            >
              <input {...getInputProps()} />
              {!newPost.image ? (
                <span className="text-gray-500 text-xl">Drag & drop an image here, or click to select one</span>
              ) : (
                <div className="text-center">
                  <img src={newPost.image} alt="Preview" className="w-40 h-40 object-cover rounded-lg mb-3" />
                  <p className="text-sm text-gray-500">Image uploaded successfully</p>
                </div>
              )}
            </div>
            {imageError && <p className="text-red-500 text-sm mt-2">{imageError}</p>}
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={handleSavePost} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save Post</button>
            </div>
          </div>
        </div>
      )}


      {/* Modal for Viewing Post */}
      {isViewModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-3/4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white pb-4 border-b mb-4">
              <h3 className="text-2xl font-semibold">{selectedPost.title}</h3>
              <p className="text-gray-500 text-sm">
                {selectedPost.updatedAt ? new Date(selectedPost.updatedAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long', 
                  year: 'numeric'
                }) : 'Date not available'}
              </p>
            </div>
            
            <div className="mb-6">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div className="prose max-w-none">
              <div 
                className="post-description"
                dangerouslySetInnerHTML={{ __html: selectedPost.description }} 
              />
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
              <button 
                onClick={handleCloseViewModal}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
     

      {/* Post List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <div className="w-full text-center">Loading...</div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: post.description.substring(0, 200) + '...' }} />
                <div className="flex justify-between">
                  <button onClick={() => handleEditClick(post._id)} className="text-blue-600 hover:underline flex items-center">
                    <PencilIcon className="h-5 w-5 mr-2" /> Edit
                  </button>
                  <button onClick={() => handleViewClick(post)} className="text-blue-600 hover:underline flex items-center">
                    <EyeIcon className="h-5 w-5 mr-2" /> View
                  </button>
                  <button onClick={() => handleDeleteClick(post._id)} className="text-red-600 hover:underline flex items-center">
                    <TrashIcon className="h-5 w-5 mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg mr-2 disabled:bg-gray-400"
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: Math.ceil(totalPosts / 10) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${page === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * 10 >= totalPosts}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg ml-2 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
