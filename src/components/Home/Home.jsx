import { useEffect, useState } from 'react';
import { getVideos } from '../../api';
import '../Home/Home.css'
import { Link } from 'react-router-dom';
import html from '../../assets/icon-html.svg';
import css from '../../assets/icon-css.svg';
import javascript from '../../assets/icon-javascript.svg';
import accessibility from '../../assets/icon-accessibility.svg';

function Home() {

    const [text, setText] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getVideos();
                console.log(data);
                 setText(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const images = [html, css, javascript, accessibility]

    return (
        <div class="container">
            <div class="column" id='titles'>
            <p className='title'>Welcome to the <br /> <b>Frontend Quiz</b></p>
            <p className='mini-title'>Pick a subject to get started</p>
            </div>
            <div class="column" id='languages'>
            {text.map((quizzes, index) => (
                  <ul key={quizzes.title}>
                   <div className='languages-container'>
                   <img src={images[index]} alt={quizzes.title} />
                      <Link to={`/quiz/${quizzes.title}`}>{quizzes.title}</Link>
                   </div>
                </ul>
                   ))}
            </div>
        </div>
    )
}

export default Home
