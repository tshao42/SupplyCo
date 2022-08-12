import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addReviewForProduct } from '../../store/review';
import './WriteReview.css'

const WriteReview = ( {productId, currentUserId, setWriteReviewOpen}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            productId: productId,
            userId: currentUserId,
            title: title,
            content: content,
            rating: rating
        }


        let errors = [];
        if (content.length < 10) {
            errors.push("Please enter at least 10 characters for review content!")
        }
        if (title.length < 4) {
            errors.push("Please enter a title with at least 4 characters!")
        }
        if (rating < 1) {
            errors.push("Please provide a rating!");
        }
        if (content.length > 140) {
            errors.push("Please keep the review under 140 characters!")
        }
        setErrors(errors);



        if (!errors.length){
            await dispatch(addReviewForProduct(payload))
            .then(()=>setWriteReviewOpen())
            .then(()=>history.push(`/products/${productId}`))
        }
    }
    
    return (
        <form onSubmit={e=>handleSubmit(e)}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>Title:*
            <input 
                type="text"
                placeholder='Leave a title'
                value={title}
                onChange={e=>setTitle(e.target.value)}
                className="review-writing-area-title"
            />
            </label>
            <label>Content:*
            <textarea 
                placeholder='Leave your review here'
                className="review-writing-area-content"
                value={content}
                onChange={e=>setContent(e.target.value)}
            />
            </label>
            <label>Rating:*
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            id = "star-rating"
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <div id="required-message">* Required fields</div> 
            <br/>
            </label>
            <button type="submit" id="write-review-submit">Submit Review</button>
        </form>
    );
};

export default WriteReview;