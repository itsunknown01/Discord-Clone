"use client"

import { useEffect, useState } from 'react'
import CreateServerModal from '../modals/create-server-modal'
import SearchModal from '../modals/search-modal'

const ModalProvider = () => {
  const [isMounted,setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  },[])

  if(!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <SearchModal />
    </>
  )
}

export default ModalProvider