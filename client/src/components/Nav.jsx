import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from "../features/auth/authSlice"
import { useGetCountQuery } from '../features/basket/BasketApiSlice';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { deepOrange } from '@mui/material/colors';
import "./NavStyle.css"
export default function TemplateDemo() {

  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.auth)
  const { isUserAdmin } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [initialName, setInitialName] = useState("")
  const { obj } = useSelector((state) => state.auth)
  const { data: basketCount } = useGetCountQuery(obj)

  // { console.log("obj", obj.fullName) }

  const handleLogOut = () => {
    dispatch(removeToken())
    navigate("/login")
  }

  useEffect(() => {
    getInitialName()
  })

  // const getInitialName =()=>{
  //   if(obj!=null){
  //   const name = obj.fullName.split(" ")
  //   const s = name[0].charAt(0)+name[1].charAt(0) 
  //   console.log(s,"s");
  //   setInitialName(s.toUpperCase())
  // }
  // }

  const getInitialName = () => {
    if (obj && typeof obj.fullName === "string") {
      const nameParts = obj.fullName.trim().split(" ");

      let initials = "";

      if (nameParts.length === 1) {
        // שם יחיד – ניקח את שתי האותיות הראשונות
        initials = nameParts[0].substring(0, 2);
      } else {
        // ניקח אות ראשונה מכל אחת משתי המילים הראשונות
        initials = nameParts[0][0] + nameParts[1][0];
      }

      setInitialName(initials.toUpperCase());
    } else {
      setInitialName(""); // ברירת מחדל במקרה שאין שם מלא
    }
  };

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link ">
      <NavLink to={`/${item.link}`} className="p-menuitem-link">

        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
      </NavLink>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1 ">{item.shortcut}</span>}
    </a>
  );
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      link: 'home',
      template: itemRenderer
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Register',
          icon: 'pi pi-user-plus',
          link: 'register',
          template: itemRenderer
        },
        !isUserLoggedIn && {
          label: 'Login',
          icon: 'pi pi-sign-in',
          link: 'login',
          template: itemRenderer
        },
        isUserLoggedIn && {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: handleLogOut
        }
      ]
    },
    !isUserAdmin && {
      label: 'Products',
      icon: 'pi pi-heart',
      link: 'product',
      template: itemRenderer
    },
    isUserAdmin && {
      label: 'EditProducts',
      icon: 'pi pi-pencil',
      link: 'productManaget',
      template: itemRenderer
    },
    isUserLoggedIn && {
      label: 'Contact',
      icon: 'pi pi-envelope',
      badge: 2,
      template: itemRenderer
    },
    isUserLoggedIn && !isUserAdmin && {
      label: 'Basket',
      icon: 'pi pi-shopping-bag',
      badge: basketCount && basketCount.count ? basketCount.count : null,
      link: 'basket',
      template: itemRenderer
    }
  ];

  const start = <img alt="logo" src="http://localhost:1024/logo3.png" height="80" width="75" className="mr-2"></img>;
  const end = (<>
    {/* {  console.log('basketCount:', basketCount)} */}
    {/* <ShoppingCart style={{ fontSize: 32 }}></ShoppingCart> */}
    <div className="flex align-items-center gap-2">
      {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText placeholder="Search" />
      </IconField>
      {/* <AccountCircleIcon  style={{ fontSize: 32 }} /> */}
      <Avatar sx={{ bgcolor: deepOrange[300] }}>{initialName}</Avatar>
    </div>
  </>
  );

  return (
    <div className="card">
      <div className="sticky-header">

        <Menubar model={items.filter(Boolean)} start={start} end={end} />
      </div>
    </div>
  )
}

