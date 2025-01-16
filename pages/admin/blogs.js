import { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function AdminPage() {
  const [posts, setPosts] = useState([
    // Example initial data
    { id: 1, title: 'Post 1', description: 'This is post 1 description', image: '/path/to/image1.jpg' },
    { id: 2, title: 'Post 2', description: 'This is post 2 description', image: '/path/to/image2.jpg' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: '' });
  const [imageError, setImageError] = useState('');

  const quillRef = useRef(null);
  const quillEditor = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      // Initialize Quill editor when the modal opens
      quillEditor.current = new Quill(quillRef.current, {
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
        const postToEdit = posts.find(post => post.id === currentPostId);
        quillEditor.current.root.innerHTML = postToEdit.description;
        setNewPost({ ...postToEdit });
      } else {
        quillEditor.current.root.innerHTML = '';
      }
    }
  }, [isModalOpen, currentPostId, isEditMode]);

  const handleSavePost = () => {
    const editorContent = quillEditor.current.root.innerHTML;
    const newPostData = {
      id: isEditMode ? currentPostId : posts.length + 1,
      title: newPost.title,
      description: editorContent,
      image: newPost.image,
    };

    if (isEditMode) {
      const updatedPosts = posts.map((post) =>
        post.id === currentPostId ? { ...post, ...newPostData } : post
      );
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, newPostData]);
    }
    setIsModalOpen(false);
    setNewPost({ title: '', description: '', image: '' });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setNewPost({ ...newPost, image: URL.createObjectURL(file) });
      setImageError('');
    } else {
      setImageError('Only image files are allowed.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleEditClick = (postId) => {
    setIsEditMode(true);
    setCurrentPostId(postId);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (postId) => {
    setDeleteConfirm(postId);
  };

  const handleConfirmDelete = () => {
    const updatedPosts = posts.filter(post => post.id !== deleteConfirm);
    setPosts(updatedPosts);
    setDeleteConfirm(null);
  };

  return (
    <>
      {/* Search input and "Add New Post" button */}
      <input
        type="text"
        placeholder="Search Posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 border rounded"
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 mb-8 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add New Post
      </button>

      {/* Modal for adding/editing post */}
      {isModalOpen && (
        <div className="fixed inset-0 text-blue-500 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Edit Post' : 'Add New Post'}
            </h3>
            {/* Form for Title */}
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            {/* Quill Editor for Description */}
            <div
              ref={quillRef}
              className="mb-4"
              style={{ height: '200px' }}
            />
            {/* Image Drag-and-Drop */}
            <div
              {...getRootProps()}
              className={`w-full p-6 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer ${imageError ? 'border-red-500' : 'border-gray-300'}`}
            >
              <input {...getInputProps()} />
              {!newPost.image ? (
                <span className="text-gray-500 text-xl">Drag & drop an image here, or click to select one</span>
              ) : (
                <div className="text-center">
                  <img
                    src={newPost.image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg mb-3"
                  />
                  <p className="text-sm text-gray-500">Image uploaded successfully</p>
                </div>
              )}
            </div>
            {imageError && <p className="text-red-500 text-sm mt-2">{imageError}</p>}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-2 text-gray-900">{post.title}</h3>
              <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: post.description }}></p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditClick(post.id)}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <PencilIcon className="h-5 w-5 mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(post.id)}
                  className="text-red-600 hover:underline flex items-center"
                >
                  <TrashIcon className="h-5 w-5 mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex text-gray-800 items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this post?</h3>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"><span className="text-white">Deleting...</span></div>}
    </>
  );
}
