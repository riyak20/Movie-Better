import React from "react";
//Displaying a movie genre
export default function GenreInfoCard(prop){
    return(
        <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">{prop.genre}</span>
            </div>
          </div>
        </div>
      </div>

    )
}