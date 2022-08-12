import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addReviewForProduct, editReview } from '../../store/review';
import './EditReview.css'

const EditReview = ({userId, setEditReviewOpen}) => {

    const review = useSelector(state=>state.reviews)[userId];
    const reviewId = review.id;

    const { productId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(review.rating);
    const [hover, setHover] = useState(review.rating);
    const [title, setTitle] = useState(review.title);
    const [content, setContent] = useState(review.content);

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            title: title,
            content: content,
            rating: rating
        }

        let errors = [];
        if (title.length < 4) {
            errors.push("Please enter a title with at least 4 characters!")
        }
        if (title.length > 70) {
            errors.push("Please enter a title under 70 characters!")
        }
        if (content.length < 10) {
            errors.push("Please enter at least 10 characters for review content!")
        }
        if (content.length > 300) {
            errors.push("Please keep the review under 300 characters!")
        }
        if (rating < 1) {
            errors.push("Please provide a rating!");
        }
        setErrors(errors);

        if (!errors.length) {
            await dispatch(editReview(reviewId, payload))
                .then(() => setEditReviewOpen());
        }
    }



    return (
        <form onSubmit={e => handleSubmit(e)}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label> Title:*
                <input
                    type="text"
                    className="review-writing-area-title"
                    placeholder='Leave a title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                </label>
            </div>
            <div>
                <label>Content:*
                    <textarea
                        className="review-writing-area-content"
                        placeholder='Leave your review here'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </label>
            </div>
            <div>Rating:*</div>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            id="star-rating"
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
            <div id="required-message">* Please keep your review under 300 characters</div>
            <div id="required-message">* Please keep your title under 70 characters</div>  
            <br />
            <button type="submit" id="write-review-submit">Submit</button>
        </form>
    );
};

export default EditReview;