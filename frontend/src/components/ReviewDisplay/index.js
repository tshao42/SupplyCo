import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import WriteReview from '../WriteReview';




function ReviewDisplay({reviews}){

    const currentUserId = useSelector(state=>state.session.user.id);

    const {productId} = useParams();
    
    return (
        <div>
            <h1>Hello from ReviewDisplay!</h1>
            {currentUserId && !reviews[currentUserId] && 
                <WriteReview productId={productId} currentUserId={currentUserId} />
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
                             <Link to={`/reviews/edit/${id}`}>Edit</Link>
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