import React, {useState} from 'react';

const Counter = () => {
    const [likes, setLikes] = useState(0)

    return (
        <div>
            <div>
                <button onClick={() => setLikes(likes + 1)}>Increment</button>
                <button onClick={() => setLikes(likes - 1)}>Decrement</button>
            </div>
            <h1>{likes}</h1>
        </div>
    );
};

export default Counter;
