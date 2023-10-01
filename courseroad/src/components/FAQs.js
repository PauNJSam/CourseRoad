import '../styles/FAQs.css';
import BackIcon from '../icons/BackIcon.jsx';
import { useNavigate } from 'react-router-dom';

const FAQs = () => {
    const navigate = useNavigate();
    const toHome = () => {
        navigate("/");
    };
    return(
        <div className="faqs">
            <div className="faqs__content">
                <button className="faqs__home-btn" onClick={toHome}><BackIcon />Home</button>
                <p className="faqs__header">FAQs</p>
                <article className="faqs__card">
                    <p className="faqs__card-title" >What is CourseRoad?</p>
                    <p className="faqs__card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Neque egestas congue quisque egestas diam in. Proin sed libero enim sed faucibus turpis in eu mi. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Aliquet bibendum enim facilisis gravida neque convallis. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.</p>
                </article>
                <article className="faqs__card">
                    <p className="faqs__card-title" >What kinds of study resources does Course Road offer?</p>
                    <p className="faqs__card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Neque egestas congue quisque egestas diam in. Proin sed libero enim sed faucibus turpis in eu mi. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Aliquet bibendum enim facilisis gravida neque convallis. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.</p>
                </article>
                <article className="faqs__card">
                    <p className="faqs__card-title" > Why use Course Road?</p>
                    <p className="faqs__card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Neque egestas congue quisque egestas diam in. Proin sed libero enim sed faucibus turpis in eu mi. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Aliquet bibendum enim facilisis gravida neque convallis. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.</p>
                </article>
                <article className="faqs__card">
                    <p className="faqs__card-title" >Is Course Road worth paying for?</p>
                    <p className="faqs__card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Neque egestas congue quisque egestas diam in. Proin sed libero enim sed faucibus turpis in eu mi. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Aliquet bibendum enim facilisis gravida neque convallis. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.</p>
                </article>
                <article className="faqs__card">
                    <p className="faqs__card-title" >How can I use Course Road for free?</p>
                    <p className="faqs__card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Neque egestas congue quisque egestas diam in. Proin sed libero enim sed faucibus turpis in eu mi. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Aliquet bibendum enim facilisis gravida neque convallis. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.</p>
                </article>
            </div>
        </div>
    );

}
export default FAQs;