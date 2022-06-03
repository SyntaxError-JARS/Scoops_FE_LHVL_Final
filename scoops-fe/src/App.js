import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/HomePage";
import NavBar from "./Components/navbar";
import Adminpage from "./Components/scoops/admin/admin-homepage";
import Accountpage from "./Components/scoops/customer/customer-accountpage";
import CustomerLogin from "./Components/scoops/customer/customer-login";
import CustomerRegister from "./Components/scoops/customer/customer-register";
import Menu from "./Components/scoops/menu";

export const userContext = createContext();

function App() {
    const [user, setUser] = useState({ username: "Guest" });
    // React-router-dom provideds us the ability to emulate multipage websites while still only being a single page
    return (
        <>
            <BrowserRouter>
                <userContext.Provider value={[user, setUser]}>
                    <NavBar />
                    <Routes>
                        <Route path="login" element={<CustomerLogin />} />
                        <Route path="register" element={<CustomerRegister />} />
                        <Route exact path="" element={<Homepage />} />
                        <Route path="accountpage" element={<Accountpage />} />
                        <Route path="adminpage" element={<Adminpage />} />
                        <Route path="menu" element={<Menu />} />
                        {/* <Route path="update" element={<TrainerUpdate></TrainerUpdate>} /> */}
                    </Routes>
                </userContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;