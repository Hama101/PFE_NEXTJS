import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
//3rd partty components
import swal from 'sweetalert';
//mui
import { Button, Grid } from '@material-ui/core'
//my components
import MultipleFileUploadField from '../../components/MultipleFileUploadField'
import Layout from '../../components/layout'
//my controllers
import { createRecipe } from '../../controllers/api/Next/recpies'


const CreateRecipePage = () => {
    const router = useRouter()
    //if not authenticated, redirect to login page
    const isAuthenticated = useSelector(state => state.auth.authenticated)


    if (!isAuthenticated && typeof window !== 'undefined') {
        router.push('/login')
    }

    //a dummy image for now
    const [images, setImages] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const [name, setName] = useState('')
    //time
    const [days, setDays] = useState(null)
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name === '' || ingredients.length === 0 || steps.length === 0 || images.length === 0 ) {
            swal('Ivalid Data' , "Please enter a Valid Data!" , "error")
            return false
        }
        console.log("submitted")
        let time = ""
        if (days) {
            time += days + " days "
        }
        if (hours) {
            time += hours + " hours "
        }
        if (minutes) {
            time += minutes + " minutes "
        }

        const formData = {
            name: name,
            images: images,
            ingredients: ingredients,
            instructions: steps,
            time: time,
            rating: "0 rating",
            vedios: [],
        }
        console.log("formData :", formData);
        const apiResponse = await createRecipe(formData)
        console.log(apiResponse)
        if (apiResponse.success) {
            const recipeSlug = apiResponse.recipe.data.slug
            swal("Success", "Recipe created successfully with slug of " + recipeSlug, "success")
            router.push('/recipes') // for now we redicret to recipes page
            // router.push('/recipes/' + recipeSlug)

        } else {
            swal("Error", "Something went wrong", "error")
        }
    }

    return (
        <Layout
            title="I FOOD | Create Recipe"
            description="Create Recipe page where you can create your own recipe"
        >
            <div className='p-5 bg-dark rounded-3'>
                <div className='container-fluid py-3'>
                    <h1 className='display-5 fw-bold text-white'>Create Recipe</h1>
                </div>
                <form >
                    {/* where we will have the iamge droper component */}
                    {/* image preview for the first image */}
                    <img src={images[0] || "https://thumbs.dreamstime.com/b/indian-food-curry-butter-chicken-palak-paneer-chiken-tikka-biryani-vegetable-curry-papad-dal-palak-sabji-jira-alu-rice-138549925.jpg"}
                        className="img-fluid"
                        alt="recipe image"
                        height={200} width={300}
                    />
                    <div className='form-group mt-4'>
                        <label className="text-white mb-2" htmlFor='recipeImage'>Recipe Images*</label>
                        <br />
                        <MultipleFileUploadField
                            setImages={setImages}
                        />
                    </div>

                    <div className='container-fluid py-3'>
                        <div className=''>
                            <div className=''>
                                <div className='form-group mt-4'>
                                    <label className="text-white mb-2" htmlFor='recipeName'>Recipe Name*</label>
                                    <input required type='text' className='form-control' id='recipeName' placeholder='Recipe Name'
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className='mt-4'>
                                    <label className="text-white mb-2" htmlFor='recipeCookTime'>Recipe Cook Time*</label>
                                    {/* days and minutes inputs */}
                                    <div className=''>
                                        <Grid container justify="space-between" alignItems="center">
                                            <Grid item>
                                                <input type='number' className='form-control' id='recipeCookTime' placeholder='Days'
                                                    onChange={(e) => {
                                                        setDays(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <input type='number' className='form-control' id='recipeCookTime' placeholder='Hours'
                                                    onChange={(e) => {
                                                        setHours(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <input type='number' className='form-control' id='recipeCookTime' placeholder='Minutes'
                                                    onChange={(e) => {
                                                        setMinutes(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <div className='form-group mt-4'>
                                    <label className="text-white mb-2 mr-2" htmlFor='recipeIngredients'>Recipe Ingredients*</label>
                                    <button className='btn btn-warning btn-sm'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            //add another input
                                            setIngredients([...ingredients, ""])
                                        }}
                                    >+</button>
                                    <div className=''>
                                        <div className=''>
                                            {
                                                ingredients.map((ingredient, index) => {
                                                    return (
                                                        <Grid container justify="space-between" alignItems="center" key={index}>
                                                            <Grid item className='col-md-10'>
                                                                <input type='text' className='form-control mb-2' id='recipeIngredients' placeholder={'Ingredient ' + (index + 1)}
                                                                    onChange={(e) => {
                                                                        e.preventDefault()
                                                                        //update the ingredient
                                                                        ingredients[index] = e.target.value
                                                                        setIngredients([...ingredients])
                                                                    }}
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <Button size="meduim"
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        //remove the input
                                                                        let data = [...ingredients]
                                                                        data.splice(index, 1)
                                                                        setIngredients(data)
                                                                    }}
                                                                    color="secondary"
                                                                    style={{
                                                                        //rounded borderRadius
                                                                        border: '1px solid #fff',
                                                                    }}>
                                                                    Delete
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group mt-4'>
                                    <label className="text-white mb-2" htmlFor='recipeInstructions'>Recipe Steps*</label>
                                    <button className='btn btn-warning btn-sm'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            //add another input
                                            setSteps([...steps, ""])
                                        }}
                                    >+</button>
                                    {/* input for recipeInstructions step by step and button with add step */}
                                    <div className=''>
                                        <div className=''>
                                            {
                                                steps.map((step, index) => {
                                                    return (
                                                        <Grid container justify="space-between" alignItems="center" key={index}>
                                                            <Grid item className='col-md-10'>
                                                                <input type='text' className='form-control mb-2' id='recipeIngredients' placeholder={'Step ' + (index + 1)}
                                                                    onChange={(e) => {
                                                                        e.preventDefault()
                                                                        //update the ingredient
                                                                        steps[index] = e.target.value
                                                                        setSteps([...steps])
                                                                    }}
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <Button size="meduim"
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        //remove the input
                                                                        let data = [...steps]
                                                                        data.splice(index, 1)
                                                                        setSteps(data)
                                                                    }}
                                                                    color="secondary"
                                                                    style={{
                                                                        //rounded borderRadius
                                                                        border: '1px solid #fff',
                                                                    }}>
                                                                    Delete
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid py-3'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <button type='submit' className='btn btn-primary btn-block'
                                    onClick={(e) => handleSubmit(e)}
                                >Create Recipe</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </Layout>
    );
}

export default CreateRecipePage;
