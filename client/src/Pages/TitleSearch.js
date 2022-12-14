import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieInfoCard from '../Components/InfoCards/MovieInfoCard';

export default function TitleSearch() {

    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState("");
    const [titleData, setTitleData] = useState("");
    const [movieForm, setMovieForm] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = async (e) => {
        const body = { "title": userInput };
        const request = await axios.post(`http://localhost:5001/movie`, body);
        const data = request.data;
        if (data.length === 0) {
            setError("TITLE NOT FOUND");
            setTitleData("");
            setUserInput("");
            setMovieForm("");
        }
        else {
            setError("");
            setUserInput("");
            setTitleData(data);
        }
    }

    useEffect(() => {
        if (titleData !== "") {
            const list = []
            titleData.forEach((data) => {

                const { title, year, length, tid, votes, rating } = data;

                list.push(
                    <MovieInfoCard key={tid} title=
                        {title} year={year} length={length}
                        rating={rating} votes={votes} />
                )
            })
            setMovieForm(list);
        }
    }, [titleData])

    return (
        <div className = "body">
                <h1  style = {{"marginTop":"40px"}} >Title Search</h1>
                <p>Find a movie in our database. Enter name here:</p>
                <div className="hi">
                    <form className = "custom-form">
                        <input
                            onChange={handleChange}
                            type={"text"}
                            placeholder={"enter title"}
                            style={{ "maxHeight": "150px", "minHeight": "30px", "lineHeight": "1", "minWidth": "30vw", "maxWidth": "30vw" }}
                            value={userInput} />
                    </form>
                    <button className = "custom-btn btn amber black-text " style={{ "width": "30.5vw" }} onClick={handleSubmit}>
                        Submit</button>
                </div>
                <br></br>
                {movieForm}
                <p style={{ marginTop: "30px", color: "red" }}>{error}</p>
        </div>
    )
}