import { useEffect, useState ,useRef} from "react"
import { useDispatch } from "react-redux"
import { setToken } from "./authSlice"
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from './authApiSlice'
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { jwtDecode } from "jwt-decode"
import { Toast } from 'primereact/toast';
import "./auth.css"

const Login = () => {

  const [login, { isSuccess, data: token, isError, error }] = useLoginMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useRef(null);

  useEffect(() => {
    if(isError){
      toast.current.show({ severity: 'error', summary: 'Error', 
        detail: error.data.message, life: 3000 })
    }
    if (isSuccess) {
      // console.log("token", token);
      const decodedToken = jwtDecode(token.token)
      // console.log(decodedToken,"decodedToken");
      dispatch(setToken({ token: token.token, isAdmin: decodedToken.role === 'Admin',obj: decodedToken}))
      navigate("/home")
    }
  }, [isSuccess, token ,isError, dispatch, navigate])

  
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target 
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (<>
    <Toast ref={toast} />
    <form  onSubmit={handleSubmit}>
      <div className="card p-4 w-full sm:w-30rem mx-auto formlr-holo">
        <div className="flex flex-column gap-4 formlr">
          <div className="text">Login</div>
          <FloatLabel>
            <InputText id="userName" name="userName" onChange={handleChange} required />
            <label htmlFor="userName">userName</label>
          </FloatLabel>

          <FloatLabel>
            <Password id="password" type="password" name="password" onChange={handleChange} feedback={false} required toggleMask />
            <label htmlFor="password">Password</label>
          </FloatLabel>
          <Button type="submit" label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
        </div>

      </div>
    </form>


  </>)
}

export default Login