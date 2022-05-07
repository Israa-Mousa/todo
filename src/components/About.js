import React from 'react'

import {Link} from 'react-router-dom'
const About = () => {
  return (
    <div>About the code
    {/* <Link to="https://github.com/Israa-Mousa/todo"> click </Link> */}
    
    <a href='https://github.com/Israa-Mousa/todo'> click here</a>
  
    <div>
    <Link to='/'>Go Back</Link>
    </div>
    </div>
        

  )
}

export default About