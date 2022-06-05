import { useState, useEffect } from 'react';
//3rd party components
import swal from 'sweetalert';
//bring Cart component
import Cart from './Cart'
import MyLoader from '../MyLoader'
//3rd party components
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchListOfRecipesByPageAndQuery } from '../../controllers/api/Django/recpies'
//my controllers
import { deleteRecipe } from '../../controllers/api/Next/recpies'


const CartList = ({username}) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [max_pages, setMaxPages] = useState(50);
    const [recipes, setRecipes] = useState([]);

    const onDelete = async (slug) => {
        const newRecipes = recipes.filter(recipe => recipe.slug !== slug);
        setRecipes(newRecipes);
        //call backend to delete the recipe
        const apiResponse = await deleteRecipe(slug);
        if (apiResponse.success) {
            swal('Deleted', 'The recipe has been deleted', 'success');
        }
    }

    const next = async () => {
        setPage(page + 1);
        const apiResponse = await fetchListOfRecipesByPageAndQuery(page, query);
        setRecipes([...recipes, ...apiResponse.data]);
        setMaxPages(apiResponse.max_pages);
    }

    // handel Search
    const handelSearch = async () => {
        setRecipes([]);
        console.log("in search function", page, query);
        const apiResponse = await fetchListOfRecipesByPageAndQuery(page = 1, query);
        setRecipes(apiResponse.data);
        setMaxPages(apiResponse.max_pages);
        setPage(1);
    }

    //call next when component loads
    useEffect(async () => {
        await next(page, query);
    }, [])


    return (
        <>
            <form method="get">
                <div className='p-3 bg-dark rounded-3'>
                    <div className='container-fluid'>
                        {/* a div with input field and a button aligned on the same line */}
                        <div className='row'>
                            <div>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search for recipes'
                                    name='query'
                                    value={query || ''}
                                    onChange={(e) => {
                                        setQuery(e.target.value)
                                    }}
                                />
                                <button
                                    type='submit'
                                    className="btn btn-success bg-dark mt-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handelSearch();
                                    }}>
                                    <span className="green-title">Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <InfiniteScroll
                dataLength={recipes.length}
                next={next}
                hasMore={page < max_pages}
                loader={
                    <MyLoader />
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="mt-3 row">
                    {recipes && recipes.length > 0
                        && recipes.map((recipe, index) => {
                            return (
                                <Cart
                                    className="col"
                                    key={index}
                                    recipe={recipe}
                                    username={username}
                                    onDelete={onDelete}
                                />
                            )
                        })
                    }
                </div>
            </InfiniteScroll>
        </>
    );
}

export default CartList;
