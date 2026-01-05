
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SingleService from './pages/SingleService'
import TeamSection from './components/TeamSection'
import TeamManagement from './pages/TeamManagement'
import BlogList from './pages/BlogList'
import SingleBlog from './pages/SingleBlog'
import BlogManagement from './pages/BlogManagement'
import Footer from './components/Footer'
import AboutUs from './pages/AboutUs'
import OurTeam from './pages/OurTeam'
import Faqs from './pages/Faqs'
import OurServices from './pages/OurServices'
import PageNotFound from './pages/PageNotFound'
import Testimonials from './pages/Testimonials'
import ContactUs from './pages/ContactUs'
import CaseStudy from './pages/CaseStudy'
import CaseStudySingle from './pages/CaseStudySingle'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>



        <Route path="/" element={<Homepage />} />


        <Route path='/teamsection' element={<TeamSection />} />



        <Route path='/teammanagement' element={<TeamManagement />} />


        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route path='/blog-management' element={<BlogManagement />} />


        <Route path="/aboutus" element={<AboutUs />} />


        <Route path="/ourteam" element={<OurTeam />} />


        <Route path="/faq" element={<Faqs />} />


        <Route path="/ourservices" element={<OurServices />} />

        <Route path="/service/:id" element={<SingleService />} />


        <Route path="/testimonials" element={<Testimonials />} />



        <Route path="/contactus" element={<ContactUs />} />



        <Route path="/casestudy" element={<CaseStudy />} />

        <Route path="/casestudy/:id" element={<CaseStudySingle />} />



        <Route path="/notfound" element={<PageNotFound />} />




      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
