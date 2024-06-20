import React from 'react'

export default function Loading() {

   const rumi = [
      "The Inspiration You Seek Is Already Within You. Be Silent And Listen.",
      "It's your road and yours alone. Others may walk it with you, but no one can walk it for you.",
      "Trust means you're ready to risk what you currently have.",
      "As you start to walk on the way, the way appears.",
      "You are not just the drop in the ocean. You are the mighty ocean in the drop.",
      "The quieter we become, the more we can hear.",
      "Listen with ears of tolerance! See through the eyes of compassion! Speak with the language of love",
      "Find the sweetness in your own heart, then you may find the sweetness in every heart.",
      "If words come out of the heart, they will enter the heart.",
      "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."
   ]

   const random = Math.floor(Math.random() * 10)

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col'>
      <div className="flex flex-col gap-3 border border-gray-400 rounded-sm p-4 m-4 max-w-[400px]">
         <p>"{rumi[random]}"</p>
         <span className='italic'>Rumi</span>
         <span class="loader"></span>
      </div>
      </div>
    </div>
  )
}
