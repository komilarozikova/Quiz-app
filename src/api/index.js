import axios from "axios"

const getVideos = async() => {
    try {
        const res = await axios.get("http://localhost:5002/quizzes");
        console.log(res);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export {getVideos};