
//import PrimarySearchAppBar from './Nav'
// import Nav from './Nav'
import {Outlet} from 'react-router-dom'
import TemplateDemo from './Nav'
const Layout = () => {
  return (<>
    
    {/* <Nav/> */}
    <TemplateDemo/>
    {/* <PrimarySearchAppBar></PrimarySearchAppBar>  */}
    <main style={{marginTop:"6rem"}}>
        <Outlet></Outlet>
    </main>
    
    </>
    
  )
}
export default Layout

