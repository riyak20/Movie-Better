//import './widget.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import MovieInfoCard from '../Components/InfoCards/MovieInfoCard'


export default function GenreSelect() {


    // const [userInput, setUserInput] = useState("");
    const [error, setError] = useState("");
    const [titleData, setTitleData] = useState("");
    const [movieForm, setMovieForm] = useState("");
    // const [name, setName] = useState("");


    const handleClick = async(e) => {
        const body = {"genre":e.target.id};
        const request = await axios.post(`http://localhost:5001/mygenre`, body);
        const data = request.data;
        if (data.length === 0){
            setError("TITLE NOT FOUND");
            setTitleData("");
            setMovieForm("");
        }
        else{
            setError("");
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



    return (
        <div className = "body">
            <h1 style = {{"marginTop":"40px"}}>Genre Select</h1>
            <div className = "button">
                <button id= {"Action"}
                 style = {{"width":"30.5vw", "maxHeight":"150px","minHeight":"30px","lineHeight":"1", "minWidth":"30vw", "maxWidth":"30vw"}}
                 className = "btn-large waves-effect amber black-text" onClick={(e) => handleClick(e)}>
                    Action</button>

                <button id = {"Horror"} 
                 className = "btn-large amber waves-effect black-text"
                style = {{"width":"30.5vw", "maxHeight":"150px","minHeight":"30px","lineHeight":"1", "minWidth":"30vw", "maxWidth":"30vw"}} onClick={(e) => handleClick(e)}>
                    Horror</button>

                <button id = {"Romance"} 
                className = "btn-large waves-effect amber black-text"
                style = {{"width":"30.5vw", "maxHeight":"150px","minHeight":"30px","lineHeight":"1", "minWidth":"30vw", "maxWidth":"30vw"}}  onClick={(e) => handleClick(e)}>
                    Romance</button>
            </div>
            {movieForm}
            {error}
            
        </div>
    )

}