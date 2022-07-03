import { Link, useHistory } from "react-router-dom"
import './footer.css'
export default function Footer() {
    const history = useHistory();
    const handleGitHub = () => {
    }
    return (
        <footer id={'footer'}><ul id='footer-ul'>

            <a href="https://www.linkedin.com/in/ethan-browning-42a032118/">
                <li><img height={'50px'} width={'100px'} onClick={handleGitHub} src='https://logosmarcas.net/wp-content/uploads/2020/04/Linkedin-Logo.png'></img></li>
            </a>
            <a href={`https://github.com/eebrowning`}>
                <li><img height={'30px'} width={'30px'} onClick={handleGitHub} src='http://www.pngall.com/wp-content/uploads/2016/04/Github-PNG-Image.png'></img>Github</li>
            </a>


        </ul></footer>

    )
}
