import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";

const DefaultPage = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default DefaultPage;
