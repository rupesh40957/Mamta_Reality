// contexts/AdminContext.js
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  blogs: [],
  listings: [],
  totalBlogs: 0,
  totalListings: 0,
  loading: false,
  error: null,
};

const AdminContext = createContext(initialState);

const adminReducer = (state, action) => {
  switch (action.type) {
    // Global actions
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    // Blog actions
    case 'FETCH_BLOGS_SUCCESS':
      return { 
        ...state, 
        blogs: action.payload.blogs, 
        totalBlogs: action.payload.total, 
        loading: false 
      };
    case 'ADD_BLOG':
      return { ...state, blogs: [...state.blogs, action.payload], loading: false };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog.id === action.payload.id ? action.payload : blog
        ),
        loading: false,
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.id !== action.payload),
        loading: false,
      };

    // Listing actions
    case 'FETCH_LISTINGS_SUCCESS':
      return { 
        ...state, 
        listings: action.payload.properties, 
        totalListings: action.payload.total, 
        loading: false 
      };
    case 'ADD_LISTING':
      return { ...state, listings: [...state.listings, action.payload], loading: false };
    case 'UPDATE_LISTING':
      return {
        ...state,
        listings: state.listings.map(listing =>
          listing.id === action.payload.id ? action.payload : listing
        ),
        loading: false,
      };
    case 'DELETE_LISTING':
      return {
        ...state,
        listings: state.listings.filter(listing => listing.id !== action.payload),
        loading: false,
      };

    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Utility function to check response and throw error if needed
  const checkResponse = async (res, errorMessage) => {
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || errorMessage);
    }
    return res.json();
  };

  // --- BLOG CRUD FUNCTIONS ---

  // 1. Fetch Blogs with pagination
  const fetchBlogs = async (page = 1, limit = 10) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await fetch(`/api/auth/admin/blogs-listing`);
      const data = await checkResponse(res, "Failed to fetch blogs");
      dispatch({ type: 'FETCH_BLOGS_SUCCESS', payload: data });
      return data;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    }
  };

  // 2. Add Blog
  const addBlog = async (blog) => {
    console.log("Adding blog:", blog);
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await fetch('/api/auth/admin/blogs-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });
      const newBlog = await checkResponse(res, "Failed to add blog");
      dispatch({ type: 'ADD_BLOG', payload: newBlog });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };


 // 3. Update Blog (Corrected)
const updateBlog = async (id, blog) => {
  dispatch({ type: 'SET_LOADING' });
  try {
    const res = await fetch(`/api/auth/admin/blogs-listing?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    const updatedBlog = await checkResponse(res, "Failed to update blog");
    dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message });
  }
};

  // 4. Delete Blog
  const deleteBlog = async (id) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await fetch(`/api/auth/admin/blogs-listing?id=${id}`, {
        method: 'DELETE',
      });
      await checkResponse(res, "Failed to delete blog");
      dispatch({ type: 'DELETE_BLOG', payload: id });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  // --- LISTING CRUD FUNCTIONS ---
// --- LISTING CRUD FUNCTIONS ---

// 1. Fetch Listings with pagination
const fetchListings = async (page = 1, limit = 10) => {
  dispatch({ type: 'SET_LOADING' });
  try {
    const res = await fetch(`/api/auth/admin/property-listing?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch listings");
    const data = await res.json();
    // Expected response format: { total, properties }
    dispatch({ type: 'FETCH_LISTINGS_SUCCESS', payload: data });
    return data;
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message });
    throw err;
  }
};

// 2. Add Listing
const addListing = async (formData) => {
  dispatch({ type: 'SET_LOADING' });
  try {
    const res = await fetch('/api/auth/admin/property-listing', {
      method: 'POST',
      // FormData bhejte waqt Content-Type header set na karo;
      // browser khud boundary set kar deta hai.
      body: formData,
    });
    const data = await res.json();
    // Assuming API returns the new property as data.property
    dispatch({ type: 'ADD_LISTING', payload: data.property });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message });
  }
};

// 3. Update Listing
const updateListing = async (id, formData) => {
  dispatch({ type: 'SET_LOADING' });
  try {
    const res = await fetch(`/api/auth/admin/property-listing?id=${id}`, {
      method: 'PUT',
      // FormData bhejte waqt Content-Type header set na karo.
      body: formData,
    });
    const data = await res.json();
    // Assuming API returns the updated property as data.property
    dispatch({ type: 'UPDATE_LISTING', payload: data.property });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message });
  }
};

// 4. Delete Listing
const deleteListing = async (id) => {
  dispatch({ type: 'SET_LOADING' });
  try {
    await fetch(`/api/auth/admin/property-listing?id=${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: 'DELETE_LISTING', payload: id });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message });
  }
};


  return (
    <AdminContext.Provider
      value={{
        blogs: state.blogs,
        listings: state.listings,
        totalBlogs: state.totalBlogs,
        totalListings: state.totalListings,
        loading: state.loading,
        error: state.error,
        // Blog functions
        fetchBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
        // Listing functions
        fetchListings,
        addListing,
        updateListing,
        deleteListing,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
