import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './auth/Login'
import { ToastContainer } from 'react-toastify'
import Register from './auth/Register'
import Layout from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Blogs from './pages/Blogs/Blogs'
import BlogsSingle from './pages/Blogs/BlogsSingle'
import EditBlog from './pages/Blogs/EditBlog'
import CreateNewBlog from './pages/Blogs/CreateNewBlog'
import Testimonials from './pages/testimonials/Testimonials'
import Testimonialsingle from './pages/testimonials/Testimonialsingle'
import EditTestimonial from './pages/testimonials/EditTestimonial'
import CreateNewTestimonial from './pages/testimonials/CreateNewTestimonial'
import Services from './pages/services/Services'
import ServicesSingle from './pages/services/ServicesSingle'
import EditService from './pages/services/EditService'
import CreateNewService from './pages/services/CreateNewService'
import CaseStudies from './pages/casestudies/CaseStudies'
import CaseStudySingle from './pages/casestudies/CaseStudySingle'
import EditCaseStudy from './pages/casestudies/EditCaseStudy'
import CreateNewCaseStudy from './pages/casestudies/CreateNewCaseStudy'
import Contacts from './pages/contact/Contacts'
import ContactSingle from './pages/contact/ContactSingle'
import Faqs from './pages/faqs/Faqs'
import FaqSingle from './pages/faqs/FaqSingle'
import EditFaq from './pages/faqs/EditFaq'
import CreateNewFaq from './pages/faqs/CreateNewFaq'
import Team from './pages/team/Team'
import TeamMemberSingle from './pages/team/TeamMemberSingle'
import EditTeamMember from './pages/team/EditTeamMember'
import CreateNewTeamMember from './pages/team/CreateNewTeamMember'
import Users from './pages/users/Users'
import UserSingle from './pages/users/UserSingle'
import EditUser from './pages/users/EditUser'
import Profile from './pages/Profile'

function App() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <BrowserRouter>

      <ToastContainer />

      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogsSingle />} />
            <Route path="/blogs/edit/:id" element={<EditBlog />} />
            <Route path="/newblog" element={<CreateNewBlog />} />

            <Route path='/testimonials' element={<Testimonials />} />
            <Route path="/testimonials/:id" element={<Testimonialsingle />} />
            <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
            <Route path="/newtestimonial" element={<CreateNewTestimonial />} />

            <Route path='/services' element={<Services />} />
            <Route path="/services/:id" element={<ServicesSingle />} />
            <Route path="/services/edit/:id" element={<EditService />} />
            <Route path="/newservice" element={<CreateNewService />} />

            <Route path='/casestudies' element={<CaseStudies />} />
            <Route path="/casestudies/:id" element={<CaseStudySingle />} />
            <Route path="/casestudies/edit/:id" element={<EditCaseStudy />} />
            <Route path="/newcasestudy" element={<CreateNewCaseStudy />} />

            <Route path='/contacts' element={<Contacts />} />
            <Route path="/contacts/:id" element={<ContactSingle />} />

            <Route path='/faqs' element={<Faqs />} />
            <Route path="/faqs/:id" element={<FaqSingle />} />
            <Route path="/faqs/edit/:id" element={<EditFaq />} />
            <Route path="/newfaq" element={<CreateNewFaq />} />

            <Route path='/team' element={<Team />} />
            <Route path="/team/:id" element={<TeamMemberSingle />} />
            <Route path="/team/edit/:id" element={<EditTeamMember />} />
            <Route path="/newteammember" element={<CreateNewTeamMember />} />

            <Route path='/users' element={<Users />} />
            <Route path="/users/:id" element={<UserSingle />} />
            <Route path="/users/edit/:id" element={<EditUser />} />

            <Route path='/profile' element={<Profile />} />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
