import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';

export default function SubCategories() {

    const [categories, setCategories] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id!==null) {
            axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
                .then(res => setCategories(res.data.data))
                .catch(err => console.log(err))
        }
    }, [id]
    )
    return <>
        {
            categories === null ?
                <div className='d-flex justify-content-center align-items-center min-vh-100'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
                :
                categories.length > 0 ?
                <div className='container py-5'>
                    <div className='row g-4'>
                        {
                            categories.map((category, idx) => {
                                return <Link to={'/category/' + category._id} className='col-md-3 col-sm-6 col-12' key={idx}>
                                    <div >
                                        <div className="card">
                                            <img src={category.image} className="card-img-top" alt="..." height='400' />
                                            <div className="card-body border">
                                                <h6 className="card-title">{category.name}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>
                :
                <div className='d-flex justify-content-center align-items-center min-vh-100'>
                    <h1>No Sub Categories</h1>
                </div>
        }
    </>
}
