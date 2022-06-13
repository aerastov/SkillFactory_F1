import * as React from "react";
import "../styles/Header.css";


type Props = {
  text: string,
}

class Header extends React.Component {
    render() {
        return (
            <header>
                <h4>Прогноз погоды</h4>
            </header>
        )
    }
}


export default Header;