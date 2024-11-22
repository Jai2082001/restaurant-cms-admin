// src/emailTemplates/MultipleProductPromotion.js
import React from "react";
import { Body, Html, Text, Section, Img, Link, Row } from "@react-email/components";
import axios from "axios";
import { useState, useEffect } from "react";
import { render } from '@react-email/render';
import UserTable from "../components/UserEmailChoose";

const MultipleProductPromotion = ({ products }) => {
    const [textInput, setTextInput] = useState("");
    const [heading, setHeading] = useState('');
    const [image, setImage] = useState(null)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState([])
    const [users, setUsers] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const handleHeadingChange = (e) => setHeading(e.target.value)
    const handleTextChange = (e) => setTextInput(e.target.value);
    
    
   
    const popUpHandler = () => {
        setPopUp((prev)=>{
            return !prev
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    const handleDropdownChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedOptions(selectedValues);
    };

    const SendEmails = async () => {

        const html = await render(<EmailTemplate text={textInput} heading={heading} selectedOptions={selectedOptions} options={options}></EmailTemplate>, {pretty: true})
        console.log(html)
        axios.post(`${process.env.REACT_APP_BACK_END_LINK}/api/email/send`, {
            html: {
                html
            }, 
            emailList: users
        }).then((response)=>{
            console.log(response)
        })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_END_LINK}/products`).then((response) => {
            setOptions(response.data);
        });
    }, [])
    return (
        <div className="m-5">
            <h2 className="text-2xl font-bold text-center mb-6">Input & Image Upload</h2>
            <div>
                <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
                    Text Input
                </label>
                <input
                    type="text"
                    id="textInput"
                    value={textInput}
                    onChange={handleTextChange}
                    className="mt-2 mb-2 text-black block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter some text"
                />
            </div>

            <div>
                <label htmlFor="Heading" className="block text-sm font-medium text-gray-700">
                    Heading
                </label>
                <input
                    type="text"
                    id="Heading"
                    value={heading}
                    onChange={handleHeadingChange}
                    className="mt-2 text-black mb-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Heading"
                />
            </div>



            {/* Dropdown */}
            <div className="mt-2 mb-2">
                <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
                    Select Options
                </label>
                <select
                    id="dropdown"
                    value={selectedOptions}
                    onChange={handleDropdownChange}
                    multiple
                    className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    {options.map((single, idx) => (
                        <option key={idx} value={single.name}>
                            {single.productName}
                        </option>
                    ))}
                </select>
                <div className="mt-2">
                    <strong>Selected Options:</strong>
                    <ul>
                        {selectedOptions.map((option, idx) => (
                            <li key={idx}>{option}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <EmailTemplate text={textInput} heading={heading} selectedOptions={selectedOptions} options={options}></EmailTemplate>
            <button className={'mt-2 px-6 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50'} onClick={popUpHandler}>Send the Emails</button>
            {popUp && <UserTable setEmailUsers={setUsers} setIsOpen={setPopUp} SendEmails={SendEmails}></UserTable>}
        </div>
    );
};

export default MultipleProductPromotion;



const EmailTemplate = ({text, heading, selectedOptions, options}) => {

    let product = [];
    for(let i=0;i<selectedOptions.length;i++){
        for(let j=0;j<options.length;j++){
            if(selectedOptions[i] == options[j].productName){
                product.push(options[j])
            }

        }
    }


    return (
        <Html lang="en">
        <Body style={{ backgroundColor: "#f3f4f6", padding: "12px", marginTop: "8px" }}>
            <Section style={{ margin: "16px 0" }}>
                <Section style={{ paddingTop: "30px" }}>
                    <Row>
                        <Text
                            style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "600",
                                lineHeight: "24px",
                                color: "#4f46e5",
                            }}
                        >
                            Our products
                        </Text>
                        <Text
                            style={{
                                margin: 0,
                                marginTop: "8px",
                                fontSize: "24px",
                                fontWeight: "600",
                                lineHeight: "32px",
                                color: "#1f2937",
                            }}
                        >
                            {heading}
                        </Text>
                        <Text
                            style={{
                                marginTop: "8px",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#6b7280",
                            }}
                        >
                            {text}
                        </Text>
                    </Row>
                </Section>
                <Section style={{ marginTop: "16px" }}>
                    {/* Grid container for products */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                            gap: "16px",
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            },
                            "@media (min-width: 768px)": {
                                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                            },
                        }}
                    >
                        {product.map((product, idx) => (
                            <div
                                key={idx}
                                style={{
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                }}
                            >
                                <Link href={`${process.env.REACT_APP_FRONT_END_LINK}/product/${product._id}`}>
                                    <Img
                                        alt={product.productName}
                                        style={{
                                            width: "100%",
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                        }}
                                        height={288}
                                        src={product.imageUrl}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </Section>
            </Section>
        </Body>
    </Html>
    
    )
}