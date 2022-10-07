import React from 'react'
import Head from 'next/head'
import Footer from '../Footer'
import Navbar from '../Navbar'

interface Props {
  children: React.ReactNode
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <div className='dark:bg-black dark:text-white text-black bg-amber-50 duration-500'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Markdown Blog" />
        <meta name="author" content="Hsing Ying Li" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>hyl-blog</title>
      </Head>
      <Navbar />
      <div className='max-w-screen-2xl w-full mx-auto p-3'>
        {children}
      </div>
      <Footer />
    </div>
  )
}


export default Main
