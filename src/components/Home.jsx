import { React, useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import VideoItem from './VideoCard';

const Home = () => {
    const { categoryId } = useParams(); 
    const [videos, setVideos] = useState([]);
    const { searchQuery } = useOutletContext();
    const apiKey = 'AIzaSyCKpkytg6ARhaK5EEC6pdUlwcfklLXvoFw';
    const navigate = useNavigate();

    const handleVideoClick = (videoId) => {
        navigate(`/video/${videoId}`); 
    };

    const fetchTrendingVideos = async () => {
        let allVideos = [];
        let nextPageToken = '';
    
        do {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&key=${apiKey}&maxResults=30&pageToken=${nextPageToken}`;
        
            try {
                const response = await axios.get(url);
                allVideos = [...allVideos, ...response.data.items]; // Combine current videos with allVideos
                nextPageToken = response.data.nextPageToken; // Update token for next fetch
            } catch (error) {
                console.error('Error fetching trending videos:', error);
                break; // Exit if there's an error
            }
        } while (nextPageToken); 
    
        setVideos(allVideos); 
    };
    
    
    const fetchVideosByCategory = async () => {
        let allVideos = [];
        let nextPageToken = '';
        const maxVideos = 10; 
    
        if (!categoryId) return;
    
        do {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`;
    
            try {
                const response = await axios.get(url);
                if (response.data.items) {
                    allVideos = [...allVideos, ...response.data.items]; 
                }
                nextPageToken = response.data.nextPageToken; 
    
                // if (allVideos.length >= maxVideos) {
                //     break; // Exit the loop if we have enough videos
                // }
            } catch (error) {
                console.error('Error fetching videos by category:', error);
                break; 
            }
        // } while (nextPageToken && allVideos.length < maxVideos); // Continue fetching while there's a next page and we haven't reached the limit

        } while (nextPageToken ); 
    
        // Limit to maxVideos count
        // setVideos(allVideos.slice(0, maxVideos)); // Set the first 10 videos in state
        setVideos(allVideos); 
    };
    
    const fetchVideosBySearch = async (query) => {
        const allVideos = []; 
        let nextPageToken = ''; 
    
        const fetchNextPage = async (pageToken) => {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=50${pageToken ? `&pageToken=${pageToken}` : ''}`;
            try {
                const response = await axios.get(url);
                allVideos.push(...response.data.items); 
                nextPageToken = response.data.nextPageToken; 
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
    
        await fetchNextPage(nextPageToken);
    
        while (nextPageToken) {
            await fetchNextPage(nextPageToken);
        }
    
        setVideos(allVideos); 
    };
    
    useEffect(() => {
        if (searchQuery) {
            fetchVideosBySearch(searchQuery); 
        } else if (categoryId) {
            fetchVideosByCategory(); 
        } else {
            fetchTrendingVideos(); 
        }
    }, [categoryId, searchQuery]);

    return (
        <>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-5 pb-6">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <VideoItem key={video.id.videoId || video.id} video={video} onClick={() => handleVideoClick(video.id.videoId || video.id)} />
                    ))
                ) : (
                    <p>No videos found.</p>
                )}
            </div>
        </>
    );
};

export default Home;
