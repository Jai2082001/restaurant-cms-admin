// src/emailTemplates/SingleProductPromotion.js
import React, { useEffect, useState } from "react";
import { Section, Button, Text, Heading, Img, Link } from "@react-email/components";
import axios from "axios";
import { render } from '@react-email/render';

import UserTable from "../components/UserEmailChoose";
const SingleProductPromotion = ({ productName, productImg, discount, productLink }) => {
    const [textInput, setTextInput] = useState("");
    const [heading, changeHeading] = useState('')
    const [image, setImage] = useState(null)
    const [selectedOption, setSelectedOption] = useState("");
    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState(false);

    const [popUp, setPopUp] = useState(false);
    const handleTextChange = (e) => setTextInput(e.target.value);


    const SendEmails = async () => {

        const html = await render(<EmailTemplate text={textInput} heading={heading} selectedProduct={selectedOption}></EmailTemplate>, { pretty: true })
        console.log(html)
        axios.post(`${process.env.REACT_APP_BACK_END_LINK}/api/email/send`, {
            html: {
                html
            },
            emailList: users
        }).then((response) => {
            console.log(response)
        })
    }

    const popUpHandler = () => {
        setPopUp((prev) => {
            return !prev
        })
    }

    const handleDropdownChange = (e) => {
        options.map((single) => {
            if (single.productName == e.target.value) {
                setSelectedOption(single)
                return;
            }
        })

    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/products`).then((response) => {
            setOptions(response.data);
        });
    }, [])

    console.log(selectedOption, textInput)

    return (
        <>

            <div className="m-5">
                <h2 className="text-2xl font-bold text-center mb-6">Input</h2>
                <div>
                    <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
                        Text Input
                    </label>
                    <input
                        type="text"
                        id="textInput"
                        value={textInput}
                        onChange={handleTextChange}
                        className="mt-2 text-black mb-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter some text"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center">Heading</h2>
                <div>
                    <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
                        Text Input
                    </label>
                    <input
                        type="text"
                        id="textInput"
                        value={heading}
                        onChange={(e) => { changeHeading(e.target.value) }}
                        className="mt-2 text-black mb-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter the heading "
                    />
                </div>

                {/* Image File Upload */}


                {/* Dropdown */}
                <div className="mt-2 mb-2">
                    <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
                        Select an Option
                    </label>
                    <select
                        id="dropdown"
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Choose an option
                        </option>
                        {options.map((single, idx) => {
                            return (
                                <option key={idx} value={single.name}>
                                    {single.productName}
                                </option>
                            )
                        })}


                        {/* <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option> */}
                    </select>
                </div>
            </div>
            <EmailTemplate heading={heading} textInput={textInput} selectedProduct={selectedOption}></EmailTemplate>
            <button className={'mt-2 px-6 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50'} onClick={popUpHandler}>Send the Emails</button>
            {popUp && <UserTable setEmailUsers={setUsers} setIsOpen={setPopUp} SendEmails={SendEmails}></UserTable>}
        </>
    );
};

export default SingleProductPromotion;


const EmailTemplate = ({ heading, textInput, selectedProduct }) => {
    return (

        <Section style={{ backgroundColor: "#f3f4f6", margin: "16px 0" }}>
            <Link href={`${process.env.REACT_APP_FRONT_END_LINK}/product/${selectedProduct._id}`}>
                <Img
                    alt={selectedProduct.productName}
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        borderRadius: "12px",
                        objectFit: "cover",
                    }}
                    height={320}
                    src={selectedProduct.imageUrl}
                />
            </Link>

            <Section style={{ marginTop: "32px", marginBottom: "20px", textAlign: "center" }}>
                <Heading
                    as="h1"
                    style={{
                        fontSize: "36px",
                        fontWeight: "600",
                        lineHeight: "40px",
                        letterSpacing: "0.4px",
                        color: "#1f2937",
                    }}
                >
                    {heading}
                </Heading>
                <Text
                    style={{
                        marginTop: "8px",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#6b7280",
                    }}
                >
                    {textInput}
                </Text>
                <Text
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "24px",
                        color: "#1f2937",
                    }}
                >
                    ${selectedProduct.price}
                </Text>
            </Section>
        </Section>
    )
}