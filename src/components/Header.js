//rafce
import PropTypes from 'prop-types'
import Button from './Button'
import{useLocation} from 'react-router-dom'

const Header = ({title,onAdd,showAdd}) => {
  // console.log(showAdd);
  const location=useLocation()
 const onClick=()=>{
        // alert('test');
        // console.log('nn');
      }
  return (
<header className='header'>
    <h1>{title}</h1>
    {location.pathname==='/'&&(
    <Button color={showAdd ?'red':'green'} text={showAdd  ?'Close':'Add'} onClick={onAdd}></Button>
    )}
    </header>
  )
}
Header.defaultProps={
    title:'Task Tracker'
}

// eslint-disable-next-line react/no-typos
Header.propTypes={
    title:PropTypes.string.isRequired,
}
// const headingStyle={
//     color:'red',backgroundColor:'black'
// }
export default Header