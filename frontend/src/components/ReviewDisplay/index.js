import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteReview } from '../../store/review';
import EditReview from '../EditReview';
import WriteReview from '../WriteReview';
import "./reviewdisplay.css"




function ReviewDisplay({reviews}){

    const currentUserId = useSelector(state=>state.session.user?.id);
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
    
    function calculateAverageReview(reviewObj){
        let accum = 0;
        const size = Object.values(reviewObj).length;
        if (size===0){
            return 0;
        }
        for (const review in reviewObj){
            accum += reviewObj[review].rating;
        }
        return (accum/size);
        
    }


    return (
        <div>
            <h1>Reviews</h1>
            <div id="write-review-unit">
            {currentUserId && !reviews[currentUserId] && 
                <div>
                    {!writeOpen &&
                    <button id="write-review-button" onClick={setWriteReviewOpen}>Write a review</button>
                    }
                    {writeOpen &&
                        <WriteReview productId={productId} currentUserId={currentUserId} setWriteReviewOpen={setWriteReviewOpen}/>
                    }
                </div>
            }
            </div>
            <div id="review-display-unit">
                {
                Object.values(reviews).map(({ id, title, content, rating, User})=>{
                    return(
                        <div className="individual-review-display-unit">
                            {currentUserId === User.id &&
                                <div id="author-review-hint">
                                    Review by you <br />
                                </div>
                            }
                            <div className="individual-review-title-line">
                                <div id="review-title">
                                    {title}
                                </div>
                                <div>
                                    {rating}★
                                </div>
                            </div>
                            <div> 
                                Review by:
                                <span id="review-username-container">
                                    {User.username} 
                                </span>
                            </div>
                            <div>
                              
                                "...{content}...
                            </div>
                            {
                                currentUserId===User.id &&
                                <div className="review-author-options">
                                    <div className="review-edit-options-fake-button" onClick={setEditReviewOpen}>Edit</div>
                                    {editOpen &&
                                        <EditReview userId = {currentUserId} setEditReviewOpen={setEditReviewOpen} />
                                    }
                                    <div className="review-edit-options-fake-button" onClick={e=>handleSubmitDelete(e, id)}>Delete</div>
                                </div>
                            }
                        </div>
                    )
                }

                )
                }
                <div id="review-display-total-count">Showing {Object.values(reviews).length} Reviews, Average Rating {parseFloat(calculateAverageReview(reviews)).toFixed(2)}</div>
            </div>
        </div>
    )
}

export default ReviewDisplay;