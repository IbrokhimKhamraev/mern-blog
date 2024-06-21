import {Navbar, TextInput, Button, Dropdown, Avatar} from 'flowbite-react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice.js'
import {signoutSuccess} from '../redux/user/userSlice.js'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Header() {
  
   const path = useLocation().pathname
   const location = useLocation()
   const dispatch = useDispatch()
   const {currentUser} = useSelector(state => state.user)
   const {theme} = useSelector(state => state.theme)

   const navigate = useNavigate()

   const [searchTerm, setSearchTerm] = useState('')

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const searchTermFromUrl = urlParams.get('searchTerm')
      if(searchTermFromUrl) {
         setSearchTerm(searchTermFromUrl)
      }
   }, [location.search])
   
   const handleSignout = async () => {
      try {
         const res = await fetch('/api/user/signout', {
            method: "POST"
         })
         const data = res.json()
         if(!res.ok) {
            console.log(data.message);
         } else{
            dispatch(signoutSuccess())
         }
      } catch (error) {
         console.log(error);
      }
   }
   
   const handleSubmit = async (e) => {
      e.preventDefault()
      const urlParams = new URLSearchParams(location.search)
      urlParams.set('searchTerm', searchTerm)
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
   }

   return (
    <Navbar className='border-b-2'>
      <Link to={'/'} className="self-center whitespace-nowrap text-xs sm:text-xl font-semibold dark:text-white">
         <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Ibrokhim's</span>
         Blog
      </Link>
      <form onSubmit={handleSubmit} className='w-[150px] sm:w-[210px]'>
         <TextInput 
            type={'text'} 
            placeholder="Search..." 
            rightIcon={AiOutlineSearch} 
            className="inline"
            value={searchTerm}   
            onChange={e => setSearchTerm(e.target.value)}
         />
      </form>
      <div className="flex gap-2 md:order-2">
         <Button 
            className='w-12 h-10 hidden md:inline' 
            color={'gray'} pill
            onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun/> : <FaMoon/>}
         </Button>
         {currentUser ? (
            <Dropdown 
               arrowIcon={false}
               inline
               label={<Avatar alt='user'
               img={currentUser?.profilePicture}
               rounded   
               className='hidden sm:block'
            />}>
               <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
               </Dropdown.Header>
               <Link to={"/dashboard?tab=profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
               </Link>
               <Dropdown.Divider/>
               <Dropdown.Item onClick={handleSignout} >Sign out</Dropdown.Item>
            </Dropdown>
         ) : (
            <Link to={'/sign-in'}>
               <Button gradientDuoTone={'purpleToBlue'}>Sign In</Button>
            </Link>
         )}
         <Navbar.Toggle/>
      </div>
         <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
               <Link to={'/'}>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
               <Link to={'/about'}>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/projects'} as={'div'}>
               <Link to={'/projects'}>Projects</Link>
            </Navbar.Link>
            <div className="pt-5 mt-2 border-t-2 sm:hidden">
               <div className="flex justify-between px-2 mb-2">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={currentUser?.profilePicture} alt="" />
                     </div>
                     <div className="text-xs">
                        <span className="block ">@{currentUser?.username}</span>
                        <span className="block font-medium truncate">{currentUser?.email}</span>
                     </div>
                  </div>

                  <Button 
                     className='w-12 h-10 inline' 
                     color={'gray'} pill
                     onClick={() => dispatch(toggleTheme())}>
                     {theme === 'light' ? <FaSun/> : <FaMoon/>}
                  </Button>
               </div>
               <Navbar.Link active={path === '/dashboard'} as={'div'}>
                  <Link to={"/dashboard?tab=profile"}>Profile</Link>
               </Navbar.Link>
               <Navbar.Link as={'div'}>
                  <button type='button' onClick={handleSignout} >Sign out</button>
               </Navbar.Link>
            </div>
         </Navbar.Collapse>
    </Navbar>
  )
}
