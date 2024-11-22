import React, { useState } from "react";

function FoodCategoryForm() {
    const [categoryName, setCategoryName] = useState("");
    const [values, setValues] = useState([""]);
    const [submitted, setSubmitted] = useState(false);

    const handleCategoryChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleValuesChange = (index, e) => {
        const newValues = [...values];
        newValues[index] = e.target.value;
        setValues(newValues);
    };

    const addValueField = () => {
        setValues([...values, ""]);
    };

    const removeValueField = (index) => {
        const newValues = values.filter((_, i) => i !== index);
        setValues(newValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (categoryName.trim() === "" || values.some((value) => value.trim() === "")) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        setSubmitted(true);

        console.log("Submitted Category:", categoryName);
        console.log("Submitted Values:", values);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_LINK}/categories/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: categoryName, values: values}),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Category added successfully:', data);
        } catch (error) {
            console.error('Error adding product:', error);
        }


        setCategoryName("");
        setValues([""]);
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Register Food Category</h2>
            {submitted && (
                <p className="text-green-600 text-center font-semibold mb-4">Category registered successfully!</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="categoryName" className="block text-gray-600 font-medium mb-1">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={handleCategoryChange}
                        required
                        className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter category name"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Values for Category:</label>
                    {values.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleValuesChange(index, e)}
                                required
                                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter value"
                            />
                            <button
                                type="button"
                                onClick={() => removeValueField(index)}
                                disabled={values.length === 1}
                                className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addValueField}
                        className="mt-2 text-blue-500 font-medium hover:underline"
                    >
                        + Add Another Value
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-150"
                >
                    Register Category
                </button>
            </form>
        </div>
    );
}

export default FoodCategoryForm;
