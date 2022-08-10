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

        if (!errors.length) {
            await dispatch(editReview(reviewId, payload))
        }
        setEditReviewOpen();
    }

    useEffect(() => {
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
        setErrors(errors);
    }, [content, title, rating]);



    return (
        <form onSubmit={e => handleSubmit(e)}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
                type="text"
                className="review-writing-area-title"
                placeholder='Leave a title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                className="review-writing-area-content"
                placeholder='Leave your review here'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
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
            <button type="submit">Submit Changes</button>
        </form>
    );
};

export default EditReview;