"use client";

import { CategoryType } from '@/data/categories';
import { FC } from 'react'

interface ListingCategoryProps {
  category : CategoryType
}

const ListingCategory: FC<ListingCategoryProps> = ({category}) => {
  const {icon : Icon, label} = category

  return <div className='flex flex-col gap-6'>
    <div className='flex items-center gap-4'>
      <Icon size={40} className='text-neutral-600 self-start'/>
      <div className='flex flex-col'>
        <p className='text-clampMd font-semibold'>{label}</p>
        <p className='font-light text-neutral-500'>A description for this category</p>
      </div>
    </div>
  </div>
}

export default ListingCategory