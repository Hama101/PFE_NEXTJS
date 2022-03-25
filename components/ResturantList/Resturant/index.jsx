import React from 'react';

const Resturant = ({ resturant }) => {
    return (
        <div>
            {/* create a cool item card */}
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={resturant.bg_image} className="card-img" alt="..." height={'100%'} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{resturant.name}</h5>
                            <p className="card-text">Description</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Address :
                                </small>
                            </p>

                            <p className="card-text">
                                <small className="text-muted">
                                    Phone :
                                </small>
                            </p>

                            <p className="card-text">
                                <small className="text-muted">
                                    Email :
                                </small>
                            </p>

                            <p className="card-text">
                                <small className="text-muted">
                                    Website :
                                </small>
                            </p>

                            <p className="card-text">
                                <small className="text-muted">
                                    Prices :
                                </small>
                            </p>

                            <p className="card-text">
                                <small className="text-muted">
                                    Ratings :
                                </small>
                            </p>
                        </div>
                        {/* two buttons */}
                        <div className="row justify-content-end">
                            <div className="col-md-6">
                                <button type="button" className="btn btn-primary">
                                    <span className="green-title">View</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resturant;
