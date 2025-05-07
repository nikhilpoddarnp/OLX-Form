import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';


const MAX_IMAGES = 20;

function Form() {
    const navigate = useNavigate();
    const [selectedFuel, setSelectedFuel] = useState('');
    const [selectTransmission, setTransmission] = useState('');
    const [distance, setDistance] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;

        // Allow only numbers and restrict to 6 digits
        if (/^\d{0,6}$/.test(value)) {
            setDistance(value);
        }
    };
    const [owner, setOwner] = useState('');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImages = [...images];
        newImages[index] = {
            file,
            preview: URL.createObjectURL(file),
        };
        setImages(newImages);
    };

    const handleRemove = (index) => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index]?.preview);
        newImages[index] = null;
        setImages(newImages);
    };

    const isFormValid =
        selectedFuel &&
        selectTransmission &&
        distance.length > 0 &&
        owner &&
        title.trim().length > 0 &&
        description.trim().length > 0 &&
        images.some(img => img !== null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");

    };



    return (
        <>
            <div>
                <nav className="flex items-center p-4 py-5 bg-gray-100 text-gray">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray hover:text-gray"
                    >
                        <ArrowLeft size={25} />

                    </button>
                </nav>
                <div className='text-center py-1.5 '>
                    <div>

                        <h1 className=" text-2xl font-bold ">POST YOUR AD</h1>

                    </div>
                </div>
                <div id='form' className=' flex justify-center py-1.5 '>
                    <div className='w-full max-w-4xl bg-white  rounded shadow-md border '>
                        <div className='flex flex-col divide-y' >
                            <div className='p-4'>
                                <div>
                                    <h1 className='mb-4 font-bold text-xl ' >SELECTED CATEGORY</h1>
                                    <p><span className='text-0.5 font-light text-gray-500'>Cars  / cars  </span> <span className='text-blue-900 underline'><a href='#'> Change</a></span></p>
                                </div>

                            </div>
                            <div className='p-8'>
                                <div >
                                    <div>
                                        <h1 className='mb-4 font-bold text-xl ' >INCLUDE SOME DETAILS</h1>

                                    </div>
                                    <div>
                                        <label htmlFor='brand' className='block text-sm font-medium text-gray-950 mb-2'>
                                            Brand *
                                        </label>
                                        <select id='brand' name='brand' required className='block w-sm border border-gray-700 rounded-md shadow-sm px-3 py-2 focus: outline-none focus:ring-2 focus:ring-blue-900'>

                                            <option value="">Select a car brand</option>
                                            <option value="maruti">Maruti</option>
                                            <option value="hyundai">Hyundai</option>
                                            <option value="honda">Honda</option>
                                            <option value="tata">Tata</option>
                                            <option value="toyota">Toyota</option>
                                            <option value="mahindra">Mahindra</option>
                                            <option value="kia">Kia</option>
                                            <option value="renault">Renault</option>
                                            <option value="ford">Ford</option>
                                        </select>
                                    </div>
                                    <div className='py-8'>

                                        <label htmlFor='year' className='block text-sm font-medium text-gray-950 mb-2'>
                                            Year *
                                        </label>
                                        <input type='number' name='year' required min="1900" max="2025" className='block w-sm border border-gray-800 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-900' />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-950 mb-2">
                                            Fuel *
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'].map((fuel) => (
                                                <div
                                                    key={fuel}
                                                    onClick={() => setSelectedFuel(fuel)}
                                                    className={`px-4 py-2 border rounded cursor-pointer text-sm ${selectedFuel === fuel
                                                        ? 'bg-blue-100 border-blue-600 text-gray-900'
                                                        : 'border-gray-600 hover:border-blue-400'
                                                        }`}
                                                >
                                                    {fuel}
                                                </div>
                                            ))}
                                        </div>


                                    </div>

                                    <div className='py-8'>
                                        <label className="block mb-2 text-sm font-medium text-gray-950">
                                            Transmission *
                                        </label>
                                        <div className="flex gap-3">
                                            {['Automatic', ' Manual'].map((transmission) => (
                                                <div
                                                    key={transmission}
                                                    onClick={() => setTransmission(transmission)}
                                                    className={`px-4 py-2 border rounded cursor-pointer text-sm ${selectTransmission === transmission
                                                        ? 'bg-blue-100 border-blue-600 text-gray-900'
                                                        : 'border-gray-600 hover:border-blue-400'
                                                        }`}
                                                >
                                                    {transmission}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                                            KM driven *
                                        </label>
                                        <div className="flex items-center gap-2 w-sm">
                                            <input
                                                type="text"
                                                id="distance"
                                                name="distance"
                                                value={distance}
                                                onChange={handleChange}
                                                className="flex-1 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"

                                                required
                                            />

                                            <p className=" text-xs text-gray-600 text-right">{distance.length} / 6</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            No. of Owners *
                                        </label>
                                        <div className="flex gap-3 flex-wrap">
                                            {['1st', '2nd', '3rd', '4th', '4+'].map((ownerNumber) => (
                                                <div
                                                    key={ownerNumber}
                                                    onClick={() => setOwner(ownerNumber)}
                                                    className={`px-4 py-2 border rounded cursor-pointer text-sm ${owner === ownerNumber
                                                        ? 'bg-blue-100 border-blue-600 text-gray-900'
                                                        : 'border-gray-600 hover:border-blue-400'
                                                        }`}
                                                >
                                                    {ownerNumber}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="py-8">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-950 mb-2">
                                            Ad title *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                maxLength={70}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Mention the key features of your item (e.g. brand, model, age, type)"
                                                className="w-sm border border-gray-300 rounded-md py-2 px-3 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                            />
                                            <span className="px-1 bottom-2 text-xs text-gray-500">{title.length} / 70</span>
                                        </div>
                                    </div>
                                    <div className="py-8">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-950 mb-2">
                                            Description *
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="description"
                                                name="description"
                                                maxLength={4096}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows={5}
                                                placeholder="Include condition, features and reason for selling"
                                                className="w-sm border border-gray-300 rounded-md py-2 px-3 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
                                            />
                                            <span className="px-2 bottom-2 text-xs text-gray-500">{description.length} / 4096</span>
                                        </div>
                                    </div>




                                </div>

                            </div>
                            <div className='py-8 px-8'>
                                <div>
                                    <h1 className='mb-4 font-bold text-xl ' > SET A PRICE</h1>

                                </div>
                                <div>
                                    <label htmlFor='year' className='block   text-sm font-medium text-gray-950 mb-2'>
                                        Price*
                                    </label>
                                    <input type='number' name='year' required min="1900" max="2025" className='block  w-sm border border-gray-800 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-900' />
                                </div>


                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">UPLOAD UP TO 20 PHOTOS</h2>
                                <div className="grid grid-cols-5 gap-4">
                                    {images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-400 h-28 w-full flex items-center justify-center relative"
                                        >
                                            {img ? (
                                                <>
                                                    <img
                                                        src={img.preview}
                                                        alt={`preview-${index}`}
                                                        className="object-cover w-full h-full"
                                                    />
                                                    <button
                                                        onClick={() => handleRemove(index)}
                                                        className="absolute top-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            ) : (
                                                <label className="cursor-pointer w-full h-full flex items-center justify-center text-sm text-gray-600 hover:text-blue-600">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange(e, index)}
                                                        className="hidden"
                                                    />
                                                    Add Photo
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 py-8 ">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid}
                                    className={`px-6 py-2 font-semibold rounded-lg shadow-md transition
            ${isFormValid ? 'bg-blue-900 hover:bg-blue-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
                                >
                                    Post Now
                                </button>
                            </div>



                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Form
