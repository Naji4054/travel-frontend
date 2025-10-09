import React from 'react'

type Props = {
    userData: { name: String; age: Number; address: String},
    url?: String,
    userId?: String
}

const Banner = (props: Props) => {

    const { userData, url, userId } = props

    const res = url?.split(' ')
  return (
    <div>
      
    </div>
  )
}

export default Banner
