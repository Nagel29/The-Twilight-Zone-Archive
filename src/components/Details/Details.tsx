import './Details.css';


export const Details = () => {

    return(
        <div className="container-details">
            <div className="container-img-title">
                <img src="https://i.postimg.cc/DycfzqTJ/where-is-everybody.png" className="image"/>
                <p className="title">Title</p>
            </div>
            <div className="container-info">
                <div className="season-episode-date">
                    <p>Season:</p>
                    <p>Episode:</p>
                    <p>Original Air Date:</p>
                </div>
                <div className="written-cast">
                    <p>Written By:</p>
                    <p>Cast:</p>
                </div>
                <p>Storyline:</p>
                <p>Opening Narration:</p>
                <p>Closing Narration:</p>
                <p>Wikipedia Link:</p>
                <p>REFLECTION COMPONENT WILL GO HERE</p>
            </div>
        </div>
    )
}