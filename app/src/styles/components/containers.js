import React from 'react'

import '../css/containers.css'

const PageContainer = (props) => (
  <div
    className='page_container'
    {...props}
  />
)

const Container = (props) => (
  <div
    {...props}
  />
)

export {
  PageContainer,
  Container
}
