import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewForProduct } from '../../store/review';
import './WriteReview.css'

const WriteReview = ( {productId, currentUserId}) => {

    const dispatch = useDispatch();
    const [errors, setErrors] = [];
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async e => {
        e.preventdefault();
        const payload = {
            productId: productId,
            userId: currentUserId,
            title: title,
            content: content,
            rating: rating
        }

        if (!errors.length){
            console.log(`line`)
            await dispatch(addReviewForProduct(productId, payload));
        }
    }



    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="textarea"
                placeholder='Leave a title'
                value={title}
                onChange={e=>setTitle(e.target.value)}
            />
            <input 
                type="textarea"
                placeholder='Leave your review here'
                value={content}
                onChange={e=>setContent(e.target.value)}
            />
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
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
            <input type="submit" />
        </form>
    );
};

export default WriteReview;