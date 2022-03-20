import React from 'react';
//import css module


const Cart = ({ recipe }) => {
    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <img src={recipe.thumbnail} className="card-img-top mt-2" alt={recipe.name} height={300} width={200} />
            <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.rating}</p>
                <a href="#" className="btn btn-primary">View</a>
            </div>
        </div>
    );
}

export default Cart;
