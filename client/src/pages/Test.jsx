import {Button} from 'flowbite-react'
import { useState } from 'react'

export default function Test() {
   const [loading, setLoading] = useState(false)
  
   const test = {
      // username: 'ibrokhim',
      email: 'i.hamraev0095@gmail.com',
      // password: '123456'
   }

   const handlerTest = async () => {
      try {
         setLoading(true)
         const res = await fetch('/api/user/getusers', {
            method: 'GET',
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(test)
         })
         const data = await res.json()
         console.log(data);
         setLoading(false)
      } catch (error) {
         console.log(error);
         setLoading(false)
      } 
   }
  
   return (
    <form className='p-5'>
      <Button onClick={() => handlerTest()} as={"button"}>{loading ? 'Loading...' : "Test"}</Button>
    </form>
  )
}
