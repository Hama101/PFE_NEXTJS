import {useState , useEffect}from 'react';
//my components
import MyLoader from '../MyLoader'
import Resturant from './Resturant'
//3rd party components
import InfiniteScroll from 'react-infinite-scroll-component';
//my controllers
import {fetchListOfResturantsByPageAndQuery} from '../../controllers/api/Django/profiles'

const ResturantList = () => {
    // intitalize state for query and page and maxPages and resturants
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [resturants, setResturants] = useState([]);
    
    const next = async () => {
        setPage(page + 1);
        const apiResponse = await fetchListOfResturantsByPageAndQuery(page, query);
        setResturants([...resturants, ...apiResponse]);
        console.log("Resturants in page " , resturants)
        // setMaxPages(apiResponse.maxPages);
    }

    // handel Search
    const handelSearch = async () => {
        console.log("in search function", page, query);
        // const apiResponse = await fetchListOfRecipesByPageAndQuery(page = 1, query);
        // setRecipes(apiResponse.data);
        // setMaxPages(apiResponse.max_pages);
        // setPage(1);
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
                dataLength={resturants.length}
                next={next}
                hasMore={page < maxPages}
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
                    {resturants && resturants.length > 0
                        && resturants.map((resturant, index) => {
                            return (
                                <Resturant
                                    className="col"
                                    key={index}
                                    resturant={resturant}
                                />
                            )
                        })
                    }
                </div>
            </InfiniteScroll>
        </>
    );
}

export default ResturantList;
