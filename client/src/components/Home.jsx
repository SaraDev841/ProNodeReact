import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
// import { PrimeIcons } from 'primereact/api';
import "./NavStyle.css"

const Home = () => {
  const navigate = useNavigate()
  return (<>


    {/* <ReactPlayer url="http://localhost:10241024/innovative.mp4" playing muted loop/> */}
    {/* <div>Home</div> */}
    <video width="100%" autoPlay muted loop>
      <source src="http://localhost:1024/innovative!.mp4" type="video/mp4" />
    </video>
    <button className="transparent-button" onClick={() => navigate('/product')}>
    <i className="pi pi-arrow-left" style={{marginRight:"2px",marginTop:"4px"}} ></i> לרכישת מוצרים   

    </button>

  </>)
}

export default Home