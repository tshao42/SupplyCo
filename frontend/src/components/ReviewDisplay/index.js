import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteReview } from '../../store/review';
import EditReview from '../EditReview';
import WriteReview from '../WriteReview';




function ReviewDisplay({reviews}){

    const currentUserId = useSelector(state=>state.session.user.id);
    const dispatch = useDispatch();

    const {productId} = useParams();

    const [ writeOpen, setWriteOpen ] = useState(false);
    const [ editOpen, setEditOpen ] = useState(false);

    const setWriteReviewOpen = () => {
        if (writeOpen) setWriteOpen(false);
        if (!writeOpen) setWriteOpen(true);
    }


    const setEditReviewOpen = () => {
        if (editOpen) setEditOpen(false);
        if (!editOpen) setEditOpen(true);
    }

    const handleSubmitDelete = async (e, reviewId) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId));
        alert("Review Deleted!")
    }
    


    return (
        <div>
            <h1>Hello from ReviewDisplay!</h1>
            {currentUserId && !reviews[currentUserId] && 
                <div>
                    <button onClick={setWriteReviewOpen}>Write a review</button>
                    {writeOpen &&
                        <WriteReview productId={productId} currentUserId={currentUserId} />
                    }
                </div>
            }
            {
               Object.values(reviews).map(({ id, title, content, rating, User})=>{
                return(
                    <div>
                        <div>{rating}★</div>
                        <div> 
                            Written by: {User.username} 
                        </div>
                        <div>
                            {title}
                        </div>
                        <div>
                            {content}
                        </div>
                        {
                            currentUserId===User.id &&
                            <div>
                                <button onClick={setEditReviewOpen}>Edit</button>
                                {editOpen &&
                                    <EditReview userId = {currentUserId} setEditReviewOpen={setEditReviewOpen} />
                                }
                                <button onClick={e=>handleSubmitDelete(e, id)}>Delete</button>
                            </div>
                        }
                        <div>----------------------------</div>
                    </div>
                )
               }

               )
            }
        </div>
    )
}

export default ReviewDisplay;