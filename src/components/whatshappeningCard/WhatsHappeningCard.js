import React from "react";
import { Card } from "react-bootstrap";
import './WhatsHappeningCard.scss';

const WhatsHappeningCard = () => {
    const items = [
        {
            id: 1,
            topic: "Entertainment",
            description: "Fans wish Amala Paul a happy birthday",
            tweets: "4576"
        }, {
            id: 2,
            topic: "Games",
            description: "Akshay Kumar's Ram Setu hits the theatres",
            tweets: "4576"
        }, {
            id: 3,
            topic: "Trending In india",
            description: "ब्रिटेन के 57वें प्रधानमंत्री बने ऋषि सुनक",
            tweets: "4576"
        }, {
            id: 4,
            topic: "Nasa Bites",
            description: "NASA Announced Its Unidentified Aerial Phenomena Research Team",
            tweets: "4576"
        },
    ]
    return (
        <Card className="cards">
            <h4 className="title">What's Happening</h4>
            {
                items.map((item) => (
                    <div className="card" key={item.id}>
                        <p className="topic">{item.topic}</p>
                        <p className="description">{item.description}</p>
                        <p className="tweets">{item.tweets} Tweets</p>
                    </div>
                ))
            }
        </Card>
    )
}

export default WhatsHappeningCard;