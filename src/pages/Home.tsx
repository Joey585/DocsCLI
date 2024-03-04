import {NavBar} from "../components/NavBar";
import "../css/homepage.css";

export const Home = () => {
    return(
        <div id="home-page">
            <NavBar/>
            <h1 id="home-page-header">DocsCLI</h1>
            <div id="block-container">
                <div className="block-homepage">
                    <img src="/assets/google_docs_logo.png" alt="google docs logo"/>
                    <p>DocsCLI is a program that allows you to use command line interface type commands in any google document</p>
                </div>
                <div className="block-homepage">
                    <img src="/assets/command-line-icon-1.png" alt="console command logo"/>
                    <p>There are many prebuilt commands and setup is extremely easy. Create your own commands on the account page.
                        The CLI Interpreter is fast and consistent.
                    </p>
                </div>
            </div>
            <a href="/signin" id="start-home-button">Start Now</a>

        </div>
    )
}