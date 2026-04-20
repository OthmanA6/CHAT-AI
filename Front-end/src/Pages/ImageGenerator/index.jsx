import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateImage } from "Slices/ai/reducer";
import useSidebarToggle from "Common/UseSideberToggleHooks";

const ImageGenerator = () => {
    const dispatch = useDispatch();
    const { generatedImages, imageLoading, error } = useSelector((state) => state.ai);
    const [prompt, setPrompt] = useState("");
    const themeSidebarToggle = useSidebarToggle();

    useEffect(() => {
        document.body.classList.add("chatbot");
        return () => {
            document.body.classList.remove("chatbot");
        };
    }, []);

    const handleGenerate = (e) => {
        e.preventDefault();
        console.log("Generating image for:", prompt);
        if (!prompt.trim() || imageLoading) return;
        dispatch(generateImage({ prompt }));
        setPrompt("");
    };

    return (
        <>
            {/* Removed RightSidebar and adjusted classes for full width if needed */}
            <div className={`main-center-content-m-left center-content search-sticky w-100 ${themeSidebarToggle ? "collapsed" : ""}`} style={{ marginRight: '0' }}>
                <div className="question_answer__wrapper__chatbot">
                    {error && (
                        <div className="alert alert-danger mx-4 mt-4">
                            {typeof error === 'string' ? error : "Failed to generate image. Please check your API key and backend."}
                        </div>
                    )}
                    
                    {generatedImages.length === 0 && !imageLoading ? (
                        <div className="empty-chat-state text-center mt--50">
                            <h4 className="title">AI Image Generator</h4>
                            <p>Describe the image you want to generate below.</p>
                        </div>
                    ) : (
                        <div className="row g-4 p-4">
                            {imageLoading && (
                                <div className="col-12 text-center mb-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Generating your masterpiece...</p>
                                </div>
                            )}
                            {generatedImages.map((imgUrl, index) => (
                                <div key={index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    <div className="single-generated-image card shadow-sm" style={{ marginBottom: '20px', overflow: 'hidden' }}>
                                        <img src={imgUrl} alt={`Generated ${index}`} style={{ width: '100%', display: 'block' }} />
                                        <div className="card-body p-2 text-center">
                                            <a href={imgUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">View Full Image</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <form onSubmit={handleGenerate} className="search-form">
                    <input 
                        type="text" 
                        placeholder="Describe your image..." 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={imageLoading}
                    />
                    <button type="submit" disabled={imageLoading}>
                        <i className="fa-regular fa-arrow-up"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default ImageGenerator;