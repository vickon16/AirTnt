"use client";

import React from 'react'
import {BiSearch} from "react-icons/bi"

const Search = () => {
  return (
    <section className='hidden xs:block border-[1px] w-full sm:w-auto py-2 rounded-full shadow hover:shadow-md transition cursor-pointer'>
      <div className="flex items-center justify-between">
        <div className="text-clampSm font-semibold px-5">
          Anywhere
        </div>
        <div className='hidden sm:block text-clampSm font-semibold px-4 border-x-[1px] flex-1 text-center'>
          Any week
        </div>
        <div className='flex items-center gap-3 text-clampSm pl-4 pr-2 text-gray-500'>
          <span className="hidden sm:block">
            Add guests
          </span>
          <span className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size="18" />
          </span>
        </div>
      </div>
    </section>
  )
}

export default Search