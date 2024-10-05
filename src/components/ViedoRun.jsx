import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import adv from "../assets/adv.png";

function VideoRun() {
    const { videoId: initialVideoId } = useParams();
    const [videoId, setVideoId] = useState(initialVideoId);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const [videoDetails, setVideoDetails] = useState({});
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    

    useEffect(() => {
        const apiKey = 'AIzaSyCnVaZ9Zf7osMx1xyaJWLZineLCBMP30CA';

        const fetchVideoDetails = async () => {
            const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
            try {
                const response = await axios.get(videoUrl);
                if (response.data.items && response.data.items.length > 0) {
                    const snippet = response.data.items[0].snippet;
                    setVideoDetails(snippet);
                    setCategoryId(snippet.categoryId);
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        fetchVideoDetails();
    }, [videoId]);

    useEffect(() => {
        const fetchRelatedVideos = async () => {
            if (!categoryId) return;
    
            const apiKey = 'AIzaSyCnVaZ9Zf7osMx1xyaJWLZineLCBMP30CA';
            let allRelatedVideos = [];
            let nextPageToken = null;
    
            do {
                const relatedUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&key=${apiKey}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    
                try {
                    const response = await axios.get(relatedUrl);
                    if (response.data.items) {
                        allRelatedVideos = [...allRelatedVideos, ...response.data.items]; 
                        nextPageToken = response.data.nextPageToken; 
                    } else {
                        break; 
                    }
                } catch (error) {
                    console.error('Error fetching related videos:', error);
                    break; 
                }
            } while (nextPageToken); 
    
            setRelatedVideos(allRelatedVideos); 
        };
    
        fetchRelatedVideos();
    }, [categoryId]);
    

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('https://66edced2380821644cde0b48.mockapi.io/comments');
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    const handleCommentSubmit = async () => {
        const savedUserName = localStorage.getItem('username');
        
        if (!savedUserName) {
            alert('You must be logged in to add a comment and have a username set.');
            return;
        }

        const comment = { name: savedUserName, text: newComment };

        try {
            const response = await axios.post('https://66edced2380821644cde0b48.mockapi.io/comments', comment);
            setComments((prevComments) => [...prevComments, response.data]);
            setNewComment(""); // Clear input
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const truncateDescription = (description, limit) => {
        if (!description || typeof description !== 'string') return '';
        if (description.length <= limit) return description;
        const truncated = description.substring(0, limit);
        const lastSpace = truncated.lastIndexOf(' ');
        return truncated.substring(0, lastSpace) + '...';
    };

    const convertLinksToAnchors = (text) => {
        const urlRegex = /https?:\/\/[^\s]+/g;
        return text.split(urlRegex).flatMap((part, index) => {
            const match = text.match(urlRegex);
            if (match && match[index]) {
                return [
                    part,
                    <a key={index} href={match[index]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{match[index]}</a>
                ];
            }
            return part;
        });
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleVideoSelect = (selectedVideoId) => {
        setVideoId(selectedVideoId);
    };

    return (
        <div className='flex items-center justify-center max-sm:mt-5'>
            <div className="flex md:w-[90%] gap-4  md:p-4 max-sm:flex-col-reverse max-sm:w-full">
                {/* Related Videos List */}
                <div className="w-[40%] max-sm:w-full overflow-y-auto rounded-lg">
                    {/* Channel Info Section */}
                    <div className="bg-cover bg-center mb-3 p-4 flex items-center justify-center" >
                        <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white text-center shadow-lg">
                            <img src={adv} alt="Channel Logo" className="w-32 mx-auto mb-4 rounded-full" />
                            <h1 className="text-3xl font-bold mb-2">Healthy Lifestyle</h1>
                            <p className="text-lg mb-4">Join us for thrilling travel vlogs, mouth-watering recipes, and lifestyle tips!</p>
                            <div className="bg-red-600 text-white py-2 px-4 rounded-full font-bold hover:bg-red-500 transition duration-300">
                                Subscribe Now!
                            </div>
                        </div>
                    </div>

                    {/* Related Videos Display */}
                    <div className="space-y-2 overflow-y-auto h-screen">
                        {relatedVideos.map((video) => (
                            <div key={video.id.videoId} className="group cursor-pointer" onClick={() => handleVideoSelect(video.id.videoId)}>
                                <div className="flex items-start rounded-md shadow-lg p-2 bg-lightpink transition-transform duration-300 transform group-hover:scale-105">
                                    {/* Image Section */}
                                    <img 
                                        className="rounded-lg aspect-video w-32 h-20 object-cover" 
                                        src={video.snippet.thumbnails.default.url} 
                                        alt={video.snippet.title} 
                                    />
                                    {/* Text Section */}
                                    <div className="ml-3 flex flex-col justify-between">
                                        <h3 className="text-lg font-semibold text-gray-800">{video.snippet.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Video Description and Comments responsive */}
                    <div className="w-full p-4  bg-white rounded-lg shadow mt-4 md:hidden">
                        <h2 className="text-xl font-semibold mb-2">Video Description</h2>
                        <p className="text-gray-700 mb-4">
                            {videoDetails.description || "This is a description of the video. It can contain information about the content, the creator, and any other relevant details."}
                        </p>
                        {/* Comments Section */}
                        <h3 className="text-lg font-semibold mb-2">Comments</h3>
                        <div className="space-y-2 mb-4">
                            {comments.length > 0 ? comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-100 rounded-md p-2">
                                    <strong>{comment.name}:</strong> {comment.text}
                                </div>
                            )) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                        {/* Add Comment Input */}
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="border rounded-md p-2 flex-grow"
                            />
                            <button onClick={handleCommentSubmit} className="bg-blue-500 text-white rounded-md px-4 mt-2">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Video Player */}
                <div className="flex-grow w-full flex flex-col rounded-lg overflow-hidden mb-4 bg-blue-200">
    <div>
        <iframe
            className="w-full h-[60vh] max-sm:h-[50vh]"
            src={embedUrl}
            title={videoDetails.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
    
    {/* Video Information and Comments Section for large screen */}
    <div className="w-full p-4 flex flex-col bg-white rounded-lg shadow max-sm:hidden h-full">
        <h2 className="text-xl font-semibold mb-2">{videoDetails.title}</h2>
        <p className="text-gray-700 mb-4">
            {videoDetails.description && videoDetails.description.length > 0 ? (
                isExpanded
                    ? convertLinksToAnchors(videoDetails.description)
                    : convertLinksToAnchors(truncateDescription(videoDetails.description, 200))
            ) : (
                <span>No description of this video.</span>
            )}
            {videoDetails.description && videoDetails.description.length > 200 && (
                <button onClick={toggleDescription} className="text-blue-500 ml-2 underline">
                    {isExpanded ? "Show Less" : "Read More"}
                </button>
            )}
        </p>

        {/* Comments Section */}
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="flex-grow overflow-y-auto bg-gray-100 rounded-md p-2 mb-4 max-h-[30vh]">
            {comments.length > 0 ? comments.map((comment) => (
                <div key={comment.id} className="bg-gray-200 rounded-md p-2 mb-2">
                    <strong>{comment.name}:</strong> {comment.text}
                </div>
            )) : (
                <p>No comments yet.</p>
            )}
        </div>

        {/* Add Comment Input */}
        <div className="flex bg-white border-t border-gray-300 pt-4">
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border rounded-md p-2 flex-grow mr-3"
            />
            <button onClick={handleCommentSubmit} className="bg-blue-500 text-white rounded-md p-3">
                Submit
            </button>
        </div>
    </div>
</div>

            </div>
        </div>
    );
}

export default VideoRun;
