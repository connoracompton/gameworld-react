import React from 'react';
import Hero from '../../components/Hero/Hero';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import './Reviews.css';

function Reviews() {
    const reviews = [
        {
            id: 1,
            name: 'Mystic Realms',
            image: 'https://gameworld-server.onrender.com/images/mystic-realms.png',
            rating: '⭐ ⭐ ⭐ ⭐ ☆ (4/5)',
            review: 'A visually stunning adventure with deep storytelling. Combat can feel repetitive, but the world-building makes up for it.',
            author: 'Alex G.'
        },
        {
            id: 2,
            name: 'Next-Gen Gaming Console',
            image: 'https://gameworld-server.onrender.com/images/next-gen.jpg',
            rating: '⭐ ⭐ ⭐ ⭐ ⭐ (5/5)',
            review: 'Blazing fast load times and breathtaking graphics. Finally feels like a true generational leap.',
            author: 'Jordan P.'
        },
        {
            id: 3,
            name: 'Limited Edition Figure',
            image: 'https://gameworld-server.onrender.com/images/limited-edition-figurine.png',
            rating: '⭐ ⭐ ⭐ ☆ ☆ (3/5)',
            review: 'The detail is great, but the price feels steep. Collectors will still love it though.',
            author: 'Sam K.'
        }
    ];

    return (
        <main>
            <Hero 
                title="Player Reviews" 
                subtitle="See what gamers are saying about the latest titles, consoles, and collectibles." 
            />

            <section className="featured">
                <h2>Latest Reviews</h2>
                <div className="products">
                    {reviews.map((review) => (
                        <ReviewCard 
                            key={review.id}
                            name={review.name}
                            image={review.image}
                            rating={review.rating}
                            review={review.review}
                            author={review.author}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Reviews;