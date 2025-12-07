import React from 'react'

type Props = {
    text:string
}

const Button = (props: Props) => {
  return (
    <button className="w-full relative group border p-3 border-white/50  transition-all duration-300 hover:border-white/80  rounded-full mt-2 cursor-pointer">
            <div className="absolute inset-0  bg-linear-to-r bg-white/1 rounded-full   group-hover:opacity-90" />
              <span className='text-white/70 group-hover:text-white/90 duration-300'>{props.text}</span>
    </button>
  )
}
export default Button 