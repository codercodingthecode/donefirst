import { Route, Routes} from "react-router-dom";
import {PageSelection} from "./Selection";
import {Dashboard} from "../Admin";
import {Registration} from "../Customer/index";



export const Router: React.FC = () => {

    console.log('render Router');
    return (
        <Routes>
                <Route path="/" element={<PageSelection />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/customer" element={<Registration /> } />
        </Routes>
    )
}