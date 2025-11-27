import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || "",
    isUserLoggedIn: localStorage.getItem("token") ? true : false,
    isUserAdmin: localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")).role==='Admin' : false,
    obj: localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")):{}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.token
            state.token = token
            state.isUserLoggedIn = true
            state.isUserAdmin = action.payload.isAdmin
            const object = action.payload.obj
            state.obj = object
            localStorage.setItem("token", token)
            localStorage.setItem("object", JSON.stringify(object))

        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            state.isUserAdmin = false
            state.obj = {}
            localStorage.clear()
        }
    }
})

export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions