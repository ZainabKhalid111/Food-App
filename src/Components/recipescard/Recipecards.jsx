import React, { useContext } from 'react';
import './recipescards.css'
import { themeContext } from '../../App';

const Recipecards = (props) => {
    // console.log(props);

    const { id, image, title, add_fav } = props;
    // console.log(id, title, 'id', 'title')
    const {theme} = useContext(themeContext)

    return (

        <div className=" card" key={id} style={theme ? { boxShadow: '#fa6400 0px 0px 0px 3px' } : {}}>
            <img src={image} className="card-img" alt="..." />
            <div className="card-body">
                <h5 className="card-title" >{title}</h5>
                <button onClick={add_fav} className="btn  " style={theme ? { backgroundColor: '#fa6400' } : { backgroundColor: '#0197d7', }}>Add to Favorites</button>
            </div>
        </div>
    )
}

export default Recipecards
