import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, uploadFile } from "Slices/ai/reducer";
import RightSidebar from "./RightSidebar";
import useSidebarToggle from "Common/UseSideberToggleHooks";
import avatar03 from "../../assets/images/icons/03.png"; // Placeholder avatar

const Chatbot = () => {
    const dispatch = useDispatch();
    const { chatHistory, loading, error } = useSelector((state) => state.ai);
    const [userInput, setUserInput] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const themeSidebarToggle = useSidebarToggle();
    const fileInputRef = useRef(null);

    useEffect(() => {
        document.body.classList.add("chatbot");
        return () => {
            document.body.classList.remove("chatbot");
        };
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("File selected:", file.name);
        setIsUploading(true);
        try {
            const result = await dispatch(uploadFile(file)).unwrap();
            console.log("Upload success:", result);
            setAttachments(prev => [...prev, result]);
        } catch (err) {
            console.error("Upload error:", err);
            alert("Upload failed: " + err);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if ((!userInput.trim() && attachments.length === 0) || loading || isUploading) return;

        dispatch(sendMessage({ 
            message: userInput, 
            attachments: attachments 
        }));
        setUserInput("");
        setAttachments([]);
    };

    return (
        <>
            <div className={`main-center-content-m-left center-content search-sticky ${themeSidebarToggle ? "collapsed" : ""}`}>
                <div className="question_answer__wrapper__chatbot">
                    {error && (
                        <div className="alert alert-danger mx-4 mt-4">
                            {typeof error === 'string' ? error : "Something went wrong. Please check your backend."}
                        </div>
                    )}
                    {chatHistory.length === 0 ? (
                        <div className="empty-chat-state text-center mt--50">
                            <h4 className="title">Welcome to AI Chat Bot</h4>
                            <p>Start a conversation by typing a message below or uploading a file/image.</p>
                        </div>
                    ) : (
                        chatHistory.map((chat, index) => (
                            <div key={index} className="single__question__answer">
                                <div className={chat.role === "user" ? "question_user" : "answer__area"}>
                                    <div className="left_user_info">
                                        <img src={avatar03} alt="avatar" style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                        <div className={chat.role === "user" ? "question__user" : "answer_main__wrapper"}>
                                            {chat.role === "assistant" && <h4 className="common__title">AI Assistant</h4>}
                                            <p className="disc" style={{ whiteSpace: 'pre-wrap' }}>{chat.content}</p>
                                            
                                            {chat.attachments && chat.attachments.length > 0 && (
                                                <div className="chat-attachments mt-2 d-flex flex-wrap">
                                                    {chat.attachments.map((file, i) => (
                                                        <div key={i} className="attachment-item me-2 mb-2 p-1 border rounded bg-light">
                                                            {file.mimetype.startsWith("image/") ? (
                                                                <img src={file.fileUrl} alt="attachment" style={{ maxHeight: '150px', borderRadius: '5px' }} />
                                                            ) : (
                                                                <div className="p-2"><i className="fa-solid fa-file-pdf me-2"></i> {file.filename}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {(loading || isUploading) && (
                        <div className="single__question__answer">
                            <div className="answer__area">
                                <div className="left_user_info">
                                    <div className="answer_main__wrapper text-center">
                                        <p className="disc">{isUploading ? "Uploading file..." : "AI is thinking..."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="search-form">
                    {/* Previews relative to the form box */}
                    {attachments.length > 0 && (
                        <div className="attachment-previews" style={{ 
                            position: 'absolute', 
                            bottom: '80px', 
                            left: '0', 
                            display: 'flex', 
                            padding: '10px',
                            zIndex: 100 
                        }}>
                            {attachments.map((file, index) => (
                                <div key={index} className="position-relative me-2 border rounded p-1" style={{ backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                    {file.mimetype.startsWith("image/") ? (
                                        <img src={file.fileUrl} alt="preview" style={{ height: '40px' }} />
                                    ) : (
                                        <span className="small px-2">PDF</span>
                                    )}
                                    <button 
                                        onClick={() => removeAttachment(index)}
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border-0"
                                        style={{ cursor: 'pointer', zIndex: 101 }}
                                    >x</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSendMessage}>
                        <input 
                            type="file" 
                            hidden 
                            ref={fileInputRef} 
                            onChange={handleFileChange}
                            accept="image/*,application/pdf"
                        />
                        <button 
                            type="button" 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                fileInputRef.current.click();
                            }}
                            className="attach-btn"
                            style={{ 
                                position: 'absolute', 
                                right: '55px', 
                                bottom: '33px', 
                                zIndex: 100,
                                background: '#E1E1FF',
                                border: 'none',
                                borderRadius: '2px',
                                height: '30px', 
                                width: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-primary)',
                                cursor: 'pointer'
                            }}
                            disabled={loading || isUploading}
                        >
                            <i className="fa-solid fa-paperclip"></i>
                        </button>
                        <input 
                            type="text" 
                            placeholder={isUploading ? "Uploading..." : "Message AI..."}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={loading || isUploading}
                            className="chat-input-field"
                            style={{ paddingRight: '100px' }} 
                        />
                        <button type="submit" disabled={loading || isUploading || (!userInput.trim() && attachments.length === 0)} className="send-btn">
                            <i className="fa-regular fa-arrow-up"></i>
                        </button>
                    </form>
                </div>
            </div>

            <RightSidebar />
        </>
    );
};

export default Chatbot;