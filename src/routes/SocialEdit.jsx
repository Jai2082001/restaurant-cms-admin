import axios from "axios";
import { useState } from "react";
import Email from "../components/Email";

const SocialEdit = () => {
    const [choice, setChoice] = useState("");
    const [emailContent, setEmailContent] = useState("");
    const [image, setImage] = useState('');
    const [tweetText, changeTweetText] = useState('');

    const emailSent = async () => {
        console.log("email sent")
        const response = await axios.get(`${process.env.REACT_APP_BACK_END_LINK}/email/send`);
        console.log(response)
    }

    const handleImageUpload = (e) => {
        const file1 = e.target.files[0];
        if (file1) {
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target.result)
                const base64 = e.target.result;

                setImage(base64)
            }

            reader.readAsDataURL(file1)
        }

    }

    const twitterHandler = async () => {
        const response = await axios.post(`${process.env.REACT_APP_BACK_END_LINK}/api/tweet`, {
            tweetText
        });

        console.log(response)

    }

    console.log(image)
    const handleChoice = (e) => {
        setChoice(e.target.value);
    };

    const handleEmailContentChange = (e) => {
        setEmailContent(e.target.value);
    };

    return (
        <div className="max-w-lg mx-auto p-4 font-sans">
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Choose your communication method</h2>

            {/* Selection buttons */}
            <div className="flex justify-around mb-6">
                <button
                    value="email"
                    onClick={handleChoice}
                    className={`${choice === "email" ? "bg-blue-500 text-black" : "bg-gray-200"
                        } py-2 px-4 rounded-lg text-black`}
                >
                    Email
                </button>
                <button
                    value="twitter"
                    onClick={handleChoice}
                    className={`${choice === "twitter" ? "bg-blue-500 text-black" : "bg-gray-200"
                        } py-2 px-4 rounded-lg text-black`}
                >
                    Twitter
                </button>
            </div>

            {choice == 'email' &&
                <Email></Email>
            }

            {/* Message for Twitter option */}
            {choice == "twitter" && (
                <div>
                    <h3 className="text-xl font-semibold">Post a Tweet</h3>
                    <p className="mt-2">Compose your tweet to share with your followers.</p>
                    <textarea
                        className="block text-black w-full h-40 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base placeholder-gray-400 
               hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:shadow-md focus:outline-none resize-none"
                value={tweetText}
                onChange={(e)=>{changeTweetText(e.target.value)}}     
               placeholder="Enter your text here"
                    />

                    <button className="mt-3 p-3 bg-blue-600 text-white focus:ring-blue-500" onClick={twitterHandler}>Post the Tweet</button>
                </div>
            )}
        </div>
    )

}

export default SocialEdit;