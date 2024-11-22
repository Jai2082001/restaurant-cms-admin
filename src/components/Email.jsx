import SingleProductPromotion from "../email_templates/SingleProductPromotion"
import MultipleProductPromotion from "../email_templates/MultipleProductPromotion"
import SurveyRequest from "../email_templates/Survey"
import { useState } from "react"


function Email() {
    const [template, changeTemplate] = useState('');

    const changeHandler = (e) => {
        changeTemplate(e.target.id);
    }
    
    const buttonClass = (id) => `px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
      template === id
        ? "bg-blue-600 text-white focus:ring-blue-500"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
    }`;
    
    return (
        <>

            <div className="flex space-x-4">
                <button
                    onClick={changeHandler}
                    id="single"
                    className={buttonClass("single")}
                >
                    Single Product Email
                </button>

                <button
                    onClick={changeHandler}
                    id="multiple"
                    className={buttonClass("multiple")}
                >
                    Multiple Product Email
                </button>

                <button
                    onClick={changeHandler}
                    id="survey"
                    className={buttonClass("survey")}
                >
                    Survey
                </button>
            </div>
            {template == 'single' && <SingleProductPromotion></SingleProductPromotion>}

            {template == 'multiple' && <MultipleProductPromotion></MultipleProductPromotion>}

            {/* {template == 'survey' && <SurveyRequest></SurveyRequest>} */}
        </>
    )
}

export default Email