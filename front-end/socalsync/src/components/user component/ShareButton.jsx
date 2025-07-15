import { useEffect } from "react";
import './sharebutton.css'
//this component is used to create a share button for multiple platforms. making it easy for the user to share the data. Reference code https://www.addtoany.com/buttons/for/website. 
const ShareButton = () =>{
    useEffect(() =>{
        const script = document.createElement('script');
        script.src = 'https://static.addtoany.com/menu/page.js';
        script.defer = true;
        document.body.appendChild(script);

        return () =>{
            document.body.removeChild(script);
        } 
    }, []);

    return (
        <>
        <div className="addtoany-container">
         <a className="a2a_dd" href="https://www.addtoany.com/share">
            <i className="fa-solid fa-share"></i>
         </a>
            <script defer src="https://static.addtoany.com/menu/page.js"></script>
        </div>
       </> 
    );
};
export default ShareButton; 