import React from 'react';
//import css module


const Cart = ({ recipe, username }) => {
    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <img src={recipe.thumbnail} className="card-img-top mt-2" alt={recipe.name} height={300} width={200} />
            <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.rating}</p>
                <a href="#" className="btn btn-primary">View</a>
                {username === recipe.restaurant ? <a href="#" className="btn btn-danger ml-2">Delete</a> : null}
            </div>
        </div>
    );
}

export default Cart;
