import "../css/navbar.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const NavBar = () => {
    const [navItems, setNavItems] = useState<Array<{name: string, path: string}>>(
        [{name: "Home", path: "/"},
            {name: "Documentation", path: "/docs"},
            {name: "Account", path: "/account"}
            ]
    );
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
        if(navItems.filter(e => e.path === location.pathname).length > 0){
            const result = navItems.filter(e => e.path !== location.pathname);
            setNavItems(result);
        }
    }, [location, navItems])



    return(
        <div id="navbar-main">
            <div id="navbar-link-container">
                {navItems.map((item, index) => (
                    <div key={index} className="navbar-item">
                        <a className="navbar-link" href={item.path}>{item.name}</a>
                        <hr className="horizontal-nav-line"/>
                    </div>
                ))}
            </div>
        </div>
    )
}
