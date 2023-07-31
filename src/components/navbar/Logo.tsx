"use client";

import React from 'react';
import { LogoSvg } from '@/data/svgs';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className='flex items-center gap-x-1.5 text-rose-500'>
      <LogoSvg width="26" height="26" />
      <span className='font-extrabold text-clampMd'>airTnT</span>
    </Link>
  )
}

export default Logo