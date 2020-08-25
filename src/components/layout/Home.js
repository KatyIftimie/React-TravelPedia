import React from 'react'

import africa from '../../img/africa.png';
import europe from '../../img/europe.jpg';
import americas from '../../img/americas.png';
import oceania from '../../img/oceania.png';
import asia from '../../img/asia.png';


export default function Home() {
    return (
        <div className="container">
            <div className="row">
          <div className="col">
          <div style={cardStyle} className="card">
                    <div className="img-container">
                            <a href="/europe">
                                <img className="img-fluid" src={europe} alt="europe"/>
                            </a>
                        </div>
                        <div className="card-body">
                            <h4>
                                Europe
                            </h4>
                        </div>
                    </div>
          </div>
          <div className="col">
          <div style={cardStyle} className="card">
                    <div className="img-container">
                            <a href="/asia">
                                <img className="img-fluid" src={asia} alt="asia"/>
                            </a>
                        </div>
                        <div className="card-body">
                            <h4>
                                Asia
                            </h4>
                        </div>
                    </div>
          </div>
          <div className="col">
          <div style={cardStyle} className="card">
                    <div className="img-container">
                            <a href="/africa">
                                <img className="img-fluid" src={africa} alt="africa"/>
                            </a>
                        </div>
                        <div className="card-body">
                            <h4>
                                Africa
                            </h4>
                        </div>
                    </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <div style={cardStyle} className="card">
                    <div className="img-container">
                            <a href="/americas">
                                <img className="img-fluid" src={americas} alt="americas"/>
                            </a>
                        </div>
                        <div className="card-body">
                            <h4>
                                Americas
                            </h4>
                        </div>
                    </div>
          </div>
          <div className="col">
          <div style={cardStyle} className="card">
                    <div className="img-container">
                            <a href="/oceania">
                                <img className="img-fluid" src={oceania} alt="oceania"/>
                            </a>
                        </div>
                        <div className="card-body">
                            <h4>
                                Oceania
                            </h4>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    )
}


const cardStyle={
    width:"18rem",
    height:"22rem",
    textAlign:"center"
}
