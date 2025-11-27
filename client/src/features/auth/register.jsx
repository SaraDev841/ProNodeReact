import { useEffect, useState, useRef } from "react"
import { useRegisterMutation } from "./authApiSlice"
import { useNavigate } from 'react-router-dom'
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import "primeflex/primeflex.css";
import { InputMask } from "primereact/inputmask";
import { Toast } from 'primereact/toast';
import "./auth.css"
const Register = () => {
  const [register, { isError, error, isSuccess }] = useRegisterMutation()
  const navigate = useNavigate()
  // if (isLoading) return <h1>Loading...</h1>, isLoading, error, isError
  // if (isError) return <h1>Failed To Fetch: {error}</h1>
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    fullName: '',
    password: '',
    phone: ''
  })

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: 'error', summary: 'Error',
        detail: error.data.message, life: 3000
      })
    }
    if (isSuccess) {
      toast.current.show({
        severity: 'success', summary: 'Success',
        detail: 'הרשמתך נקלטה בהצלחה.\n שמחים שהצטרפת אלינו:).', life: 3000
      })
      setTimeout(() => {
        navigate("/login");
      }, 1800);

    }
  }, [isSuccess, isError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    register(formData)
    // setFormData({
    //   userName: '',
    //   email: '',
    //   fullName: '',
    //   password: '',
    //   phone: ''
    // })
    // navigate("/login")
  }

  return (<>
    <Toast ref={toast} />
    <form onSubmit={handleSubmit}>
      <div className="card p-4 w-full sm:w-30rem mx-auto formlr-holo">
        <div className="flex flex-column gap-4 formlr">
          <div className="text">Register</div>
          <FloatLabel>
            <InputText id="userName" name="userName" onChange={handleChange} required />
            <label htmlFor="userName">userName*</label>
          </FloatLabel>

          <FloatLabel>
            {/*הצעת סיסמא חזקה?? <Password id="password" name="new-password" type="password" autoComplete="new-password"
              onChange={handleChange} feedback={false} required /> */}
            <Password id="password" type="password" name="password" onChange={handleChange} feedback={false} required toggleMask />
            <label htmlFor="password*">Password*</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="fullName" name="fullName" onChange={handleChange} required />
            <label htmlFor="fullName">fullName*</label>
          </FloatLabel>

          <FloatLabel>
            <InputMask id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>
            <label htmlFor="phone">phone</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="email" type="email" name="email" onChange={handleChange} required />
            <label htmlFor="email*">email*</label>
          </FloatLabel>

          <Button label="Sign Up" type="submit" icon="pi pi-user-plus" severity="success" className="w-10rem mx-auto"></Button>
        </div>

      </div>

    </form>
  </>
  )
}

export default Register