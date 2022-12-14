import React, {useEffect, useState} from "react";
import axios from "axios";
import MovieInfoCard from '../Components/InfoCards/MovieInfoCard';

export default function RatingSearch(){
 
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState("");
    const [titleData, setTitleData] = useState("");
    const [movieForm, setMovieForm] = useState("");
 
    const handleChange = (e) =>{
        setUserInput(e.target.value);
    }
 
    const handleSubmit = async(e) => {
        const body = {"rating":userInput};
        const request = await axios.post(`http://localhost:5001/rating`, body);
        const data = request.data;
        if (data.length === 0){
            setError("TITLES NOT FOUND");
            setTitleData("");
            setUserInput("");
            setMovieForm("");
        }
        else{
            setError("");
            setUserInput("");
            setTitleData(data);
        }
    }
 
    useEffect(() =>{
        if (titleData !== ""){
            const list = []
            titleData.forEach((data) => {
                console.log(data);
                const title = data.title;
                const year = data.year;
                const length = data.length;
                const rating = data.rating;
                const votes = data.votes;
                const tid = data.tid;
                list.push(
                    <MovieInfoCard key = {tid} title =
                    {title} year = {year} length = {length}
                    rating = {rating} votes = {votes}/>
                )
            })
            setMovieForm(list);
        }
    },[titleData])
 
    return(
        <div className = "body">
            <h1 style = {{"marginTop":"40px"}}>Rating Search</h1>
            <p>Find the movies with a specific rating. Enter rating here:</p>
            <div className = "hi">
                <form>
                    <input
                        onChange = {handleChange}
                        type= "number"
                        min="0.1" 
                        max="10"
                        step = ".1"
                        placeholder = {"enter rating"}
                        style = {{"maxHeight":"150px","minHeight":"30px","lineHeight":"1", "minWidth":"30vw", "maxWidth":"30vw"}}
                        value = {userInput}/>
                </form>
                <button className = "custom-btn btn amber black-text "style = {{"width":"30.5vw"}} onClick = {handleSubmit}>
                    Submit</button>
            </div>
            <br></br>
            {movieForm}
            <p style = {{marginTop:"30px", color:"red"}}>{error}</p>
        </div>
    )
}