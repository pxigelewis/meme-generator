import React from "react"
import sillyKitty from "../silly-cat.png"

export default function Header() {
    return(
        <div>
            <nav className="header">
                <img src={sillyKitty} className="header--image" alt="header"></img>
                <h1 className="header--title">Meme Generator</h1>
                <h2 className="header--project">React Course - Section 2</h2>
            </nav>
        </div>
    )

}