import React, {useState, useEffect} from "react"
import html2canvas from "html2canvas";
        /*
        What I need in this section:
        - handle the state of the meme image and it's top and bottom text
        - use useEffect to handle the update of the image bc we're going to be pulling it from an api
        - form to take in the top and bottom text
        */

export default function Meme() {

    // this is used to set and update the state for a specific meme
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        imageURL: "http://i.imgflip.com/1bij.jpg"
    })

    // this is used to capture the state of all them memes, aka just store all of the memes data
    const [allMemes, setAllMemes] = useState([])


    // used to getch that data from the memes api and set it to allMemes
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    // used to update the meme image url; a random number is generated and that is used to pull a random index from the memes data returned from the
    // useEffect function above
    function getMemeImageURL(event) {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url

        setMeme(prevMeme => ({
            ...prevMeme,
            imageURL: url
        }))
    }

    // this is to handle any changes made to the form and return the new meme
    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    // function to save the created meme using html2canvas
    function saveMeme() {
        const memeElement = document.querySelector(".meme");

        html2canvas(memeElement, { useCORS: true, allowTaint: false }).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "meme.png";
            link.click();
        });
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImageURL}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.imageURL} className="meme--image" alt="Generated Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div className="save-meme-container">
                <button
                    className="save-meme-button"
                    onClick={saveMeme}
                >
                    Save Meme 🖼
                </button>
            </div>
        </main>
    );
}