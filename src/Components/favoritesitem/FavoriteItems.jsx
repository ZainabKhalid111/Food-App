import React, { useContext } from 'react';
import './favoriteItems.css'
import { themeContext } from '../../App';

const FavoriteItems = (props) => {
    // console.log(props);

    const { id, image, title ,removeFromFav} = props;
    // console.log(id, title, 'id', 'title')

    const {theme} = useContext(themeContext);

    return (

        <div className=" card" key={id} style={theme ? { boxShadow: '#fa6400 0px 0px 0px 3px' } : {}}>
            <img src={image} className="card-img" alt="..." />
            <div className="card-body">
                <h5 className="card-title" style={theme ? { color: 'black' } : {}}>{title}</h5>
                <button onClick={removeFromFav} className="btn " style={theme ? { backgroundColor: '#fa6400' } : {backgroundColor: '#0197d7'}}>Remove from Favorites</button>
            </div>
        </div>
    )
}

export default FavoriteItems
