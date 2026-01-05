import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post("/api/auth/register", userData),
  login: (credentials) => api.post("/api/auth/login", credentials),
};

// User APIs
export const userAPI = {
  getUsers: () => api.get("/api/users"),
  getProfile: () => api.get("/api/users/profile"),
  updateProfile: (userData) => api.put("/api/users/profile", userData),
  getSingleUser: (id) => api.get(`/api/users/${id}`),
  editUser: (id, userData) => api.put(`/api/users/${id}`, userData),
  updatePassword: (id, passwordData) =>
    api.put(`/api/users/${id}/password`, passwordData),
  removeUser: (id) => api.delete(`/api/users/${id}`),
};

// Project APIs
export const projectAPI = {
  addProject: (projectData) => api.post("/api/projects", projectData),
  getProjects: () => api.get("/api/projects"),
  getSingleProject: (id) => api.get(`/api/projects/${id}`),
  editProject: (id, projectData) => api.put(`/api/projects/${id}`, projectData),
  removeProject: (id) => api.delete(`/api/projects/${id}`),
};

// Service APIs
export const serviceAPI = {
  addService: (serviceData) =>
    api.post("/api/services", serviceData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getServices: (page = 1, limit = 10) => api.get(`/api/services?page=${page}&limit=${limit}`),
  getSingleService: (id) => api.get(`/api/services/${id}`),
  editService: (id, serviceData) =>
    api.put(`/api/services/${id}`, serviceData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  removeService: (id) => api.delete(`/api/services/${id}`),
};

// Testimonial APIs
export const testimonialAPI = {
  addTestimonial: (testimonialData) =>
    api.post("/api/testimonials", testimonialData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getTestimonials: () => api.get("/api/testimonials"),
  getAllTestimonialsAdmin: () => api.get("/api/testimonials/admin/all"),
  getSingleTestimonial: (id) => api.get(`/api/testimonials/${id}`),
  editTestimonial: (id, testimonialData) =>
    api.put(`/api/testimonials/${id}`, testimonialData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  removeTestimonial: (id) => api.delete(`/api/testimonials/${id}`),
};

// Contact APIs
export const contactAPI = {
  createContact: (contactData) => api.post("/api/contacts", contactData),
  subscribeNewsletter: (email) =>
    api.post("/api/contacts/newsletter", { email }),
  getContacts: () => api.get("/api/contacts"),
  getSingleContact: (id) => api.get(`/api/contacts/${id}`),
};

// Case Study APIs
export const caseStudyAPI = {
  addCaseStudy: (caseStudyData) => api.post("/api/case-studies", caseStudyData),
  getCaseStudies: () => api.get("/api/case-studies"),
  getSingleCaseStudy: (id) => api.get(`/api/case-studies/${id}`),
  editCaseStudy: (id, caseStudyData) =>
    api.put(`/api/case-studies/${id}`, caseStudyData),
  removeCaseStudy: (id) => api.delete(`/api/case-studies/${id}`),
};

// Team APIs
export const teamAPI = {
  addTeamMember: (teamData) =>
    api.post("/api/team", teamData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getTeamMembers: () => api.get("/api/team"),
  getTeamMember: (id) => api.get(`/api/team/${id}`),
  editTeamMember: (id, teamData) =>
    api.put(`/api/team/${id}`, teamData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  removeTeamMember: (id) => api.delete(`/api/team/${id}`),
};

// Blog APIs
export const blogAPI = {
  addBlog: (blogData) =>
    api.post("/api/blogs", blogData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getBlogs: (page = 1, limit = 6) => api.get(`/api/blogs?page=${page}&limit=${limit}`),
  getSingleBlog: (id) => api.get(`/api/blogs/${id}`),
  editBlog: (id, blogData) =>
    api.put(`/api/blogs/${id}`, blogData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  removeBlog: (id) => api.delete(`/api/blogs/${id}`),
  addComment: (blogId, commentData) =>
    api.post(`/api/blogs/${blogId}/comments`, commentData),
  getBlogComments: (blogId) => api.get(`/api/blogs/${blogId}/comments`),
  removeComment: (commentId) => api.delete(`/api/blogs/comments/${commentId}`),
  addReply: (commentId, replyData) =>
    api.post(`/api/blogs/comments/${commentId}/replies`, replyData),
  removeReply: (replyId) => api.delete(`/api/blogs/replies/${replyId}`),
};

// FAQ APIs
export const faqAPI = {
  getFaqs: (category) =>
    api.get(`/api/faqs${category ? `?category=${category}` : ""}`),
  addFaq: (faqData) => api.post("/api/faqs", faqData),
  getSingleFaq: (id) => api.get(`/api/faqs/${id}`),
  editFaq: (id, faqData) => api.put(`/api/faqs/${id}`, faqData),
  removeFaq: (id) => api.delete(`/api/faqs/${id}`),
};

export default api;
