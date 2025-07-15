import { useState } from "react";
import "./about.css"

const About = () =>{

    const [formData, setFormData] = useState({
    name:"",
    email:"",
    feedback:"",
    });

    const handleFormData= (e) => {
    const{ name, value} = e.target;

    console.log(`Updating ${name}:`, value);
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));

    }

    return(
        <div className="about-wrapper">
            <p className="app-bio">This app was created to make family planning easier, safer, and more reliable. </p>
            <div>
                <form className="feedback-box">
                <h1 className="feedback-header">Feedback Form</h1>
                <div>
                    <label >
                        Name:
                        <input className="input-box"
                        type="text" 
                        name="name"
                        value= {formData.name} 
                        placeholder="Enter Your Name"
                        onChange= {handleFormData} />
                    </label><br />
                    <label >
                        Email:
                        <input className="input-box"
                        type="text" 
                        name="email"
                        value= {formData.email}
                        placeholder="Enter Your Email"
                        onChange= {handleFormData} />
                    </label><br />
                    <label>
                        Feedback:
                        <textarea className="feedback-input" name="feedback"
                        value= {formData.feedback}
                        placeholder="Please provide your feedback(max 200 Characters"
                        onChange= {handleFormData} rows="5" cols="33" 
                            maxLength={200}
                        />
                        <p className = "counter"> {formData.feedback.length}/200 Characters</p>
                    </label>
                    <button className="submit-button" type="submit">Submit</button>
                </div>
                </form>
    
            </div>
        </div>
    );
};

export default About;