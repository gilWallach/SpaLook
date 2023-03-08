import { Icon } from "./Icon";

export function AppFooter() {
    return (
        <section className="main-footer main-layout">
            <div className="logo img-container">
                <img src={require('../assets/imgs/logo.png')} alt="" />
            </div>
            <div className="main-content">

            <div className="careers">
                <div className="header-container flex space-between align-center">
                    <p>Let's do this together</p>
                    <Icon name="ArrowDown"/>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div className="about-company">
                <div className="header-container flex space-between align-center">
                    <p>Company</p>
                    <Icon name="ArrowDown"/>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div className="useful-links">
                <div className="header-container flex space-between align-center">
                    <p>Useful Links</p>
                    <Icon name="ArrowDown"/>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div className="social">
                <div className="header-container flex space-between align-center">
                    <p>Follow Us</p>
                    <Icon name="ArrowDown"/>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
            </div>

            <div className="flex support">
                <div className="lang flex">
                <Icon name="World"/>
                <button>English</button>
                </div>
                <button>Accessibility</button>
            </div>

            <div className="statements flex">
                <button>Accessibility Statement</button>
                <button>Terms and Conditions</button>
                <button>Privacy Policy</button>
            </div>
            <div className="copyrights flex">
                <small>SpaLook 2023</small>
            </div>
        </section>
    )
}