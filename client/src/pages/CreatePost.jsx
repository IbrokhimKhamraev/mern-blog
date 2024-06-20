import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useNavigate} from 'react-router-dom'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function CreatePost() {

   const [file, setFile] = useState(null)
   const [imageUploadProgress, setImageUploadProgress] = useState(null)
   const [imageUploadError, setImageUploadError] = useState(null)
   const [formData, setFormData] = useState({})
   const [publishError, setPublishError] = useState(null)

   const navigate = useNavigate()

   const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value})
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const res = await fetch('/api/post/create', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(formData)            
         })
         const data = await res.json()
         if(!res.ok) {
            setPublishError(data.message)
            return 
         }
         if(res.ok) {
            setPublishError(null)
            navigate(`/post/${data.slug}`)
         }
      } catch (error) {
         setPublishError('Something went wrong')
      }
   } 

   const handleUploadImage = () => {
      try {
         if(!file) {
            setImageUploadError('Please select an image')
            return
         }
         setImageUploadError(null)
         const storage = getStorage(app)
         const fileName = new Date().getTime() + file.name
         const storageRef = ref(storage, fileName)
         const uploadTask = uploadBytesResumable(storageRef, file)
         uploadTask.on(
            'state_changed',
            (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               setImageUploadProgress(progress.toFixed(0))
            },
            (error) => {
               setImageUploadError('Image upload failed')
               setImageUploadProgress(null)
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setImageUploadError(null)
                  setImageUploadProgress(null)
                  setFormData({...formData, image: downloadURL})
               })
            }
         )
      } catch (error) {
         setImageUploadError('Image upload failed')
         setImageUploadProgress(null)
      }
   }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput onChange={handleChange} type={"text"} placeholder="Title" required id='title' className='flex-1'/>
            <Select id='category' onChange={handleChange}>
               <option value="uncategorized">Select a category</option>
               <option value="javascript">JavaScript</option>
               <option value="reactjs">React.js</option>
               <option value="nextjs">Next.js</option>
            </Select>
         </div>
         <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput onChange={(e) => setFile(e.target.files[0])} type="file" accept='image/*'/>
            <Button 
               onClick={handleUploadImage} 
               type="button" 
               gradientDuoTone={"purpleToBlue"} 
               size="sm" 
               outline>
                  {
                     imageUploadProgress ? (
                        <div className="w-16 h-16">
                           <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                        </div>
                     ) : ('Upload Image')
                  }
            </Button>
         </div>
         {imageUploadError && <Alert color={'failure'}>{imageUploadError}</Alert>}
         {formData.image && <img src={formData.image} alt="upload" className='w-full h-72 object-cover'/> }
         <ReactQuill onChange={(e) => setFormData({...formData, content: e})} placeholder='Write something...' className='h-72 mb-12' required/>
         <Button type='submit' gradientDuoTone={"purpleToPink"} >Publish</Button>
      </form>
    </div>
  )
}
