import { useState } from "react";

export default function Radio() {
    const stations = [
        "https://www.youtube.com/embed/dS1zX9g4R5I?controls=0&autoplay=1",
        "https://www.youtube.com/embed/MCkTebktHVc?controls=0&autoplay=1",

    ];

    const [ station, setStation ] = useState(0);

    const nextStation = () => {
        setStation(prevStation => (prevStation + 1) % stations.length)
    } 

    return (
        <div>
            <iframe width="60" height="60" src={stations[station]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <button onClick={nextStation}>Next</button>
        </div>
    )
}
