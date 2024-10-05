const VideoCard = ({ video,onClick }) => {
    return (
      <div className="group cursor-pointer"  onClick={onClick}>
        <div className="relative">
          <img className="rounded-lg aspect-video"     src={video.snippet.thumbnails.high.url} alt={'video.title'} />
          <p className="absolute bottom-2 right-2 text-sm bg-black bg-opacity-50 text-white px-1.5 font-medium rounded-md">
          {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </p>
        </div>
  
        <div className="flex gap-3 py-3 px-2">
          <img className="h-9 w-9 rounded-full"  src={video.snippet.thumbnails.high.url} alt={'video-image'} />
          <div>
            <h2 className="group-hover:text-blue-500 font-semibold leading-snug line-clamp-2 dark:text-neutral-300" title={video.snippet.title}>
            {video.snippet.title}
       
            </h2>
            <p className="text-sm mt-1 text-neutral-700 hover:text-neutral-500 dark:text-neutral-300">
            {video.snippet.channelTitle}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {/* {video.views} Views • {video.postedAt} */}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default VideoCard