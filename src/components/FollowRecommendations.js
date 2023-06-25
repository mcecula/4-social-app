import axios from "axios";
import { useEffect, useState } from "react";
import './FollowRecommendations.css'



const FollowRecommendations = (props) => {

    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                setRecommendations(res.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getRecommendations()
    }, [props.posts]);

    const follow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
            .then(() => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return <div className="followRecommendations">
        {recommendations.map(recommendations => {
            return (
                <div className="followRecommendation" key={recommendations.id}>
                    <img src={recommendations.avatar_url} alt={recommendations.username}></img>
                    <h3>{recommendations.username}</h3>
                    <button className="btn" onClick={() => follow(recommendations.id)}>Follow</button>
                </div>
            );
        })}
    </div>
}

export default FollowRecommendations;