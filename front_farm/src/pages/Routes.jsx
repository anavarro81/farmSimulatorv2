import { Routes as RoutesDom } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import HomePage from "./HomePage/HomePage";
import ParcelPage from "./ParcelPage/ParcelPage";
import InvoicePage from "./InvoicePage/InvoicePage";
import UserPage from "./UserPage/UserPage";
import CalendarPage from "./CalendarPage/CalendarPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import AuthToken from "../auth/AuthToken";
import NavBar from "../components/Navbar/Navbar";


export default function Routes() {

  

    return <RoutesDom>

        <Route element={<AuthToken><NavBar /></AuthToken>} >
                <Route path="/home" element={<HomePage />} />
                <Route path="/parcel" element={<AuthToken><ParcelPage /></AuthToken>} />
                <Route path="/invoice" element={<AuthToken><InvoicePage /></AuthToken>} />
                <Route path="/user" element={<AuthToken><UserPage /></AuthToken>} />
                <Route path="/calendar" element={<AuthToken><CalendarPage /></AuthToken>} />
            
        </Route>    
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

    </RoutesDom>

}