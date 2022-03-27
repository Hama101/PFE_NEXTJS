import React from 'react';
import Link from 'next/link';
// my controllers



const Cart = ({ recipe, username, onDelete }) => {

    const handelDelete = (event) => {
        event.preventDefault();
        onDelete(recipe.slug);
    }

    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <img src={recipe.thumbnail} className="card-img-top mt-2" alt={recipe.name} height={300} width={200} />
            <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.rating}</p>

                <Link href={`/recipes/${recipe.slug}`}>
                    <a className="btn btn-primary mr-2">View</a>
                </Link>

                {username === recipe.restaurant
                    ? <a
                        className="btn btn-danger ml-2"
                        onClick={event => handelDelete(event)}
                    >
                        Delete
                    </a>
                    : null
                }
            </div>
        </div>
    );
}

export default Cart;
