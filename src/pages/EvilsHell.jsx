export default function EvilsHell() {
    return (
        <div className="relative w-screen h-screen overflow-hidden">
          
          {/* 🎥 Live Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/assets/Evil.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
    
          {/* 🖤 Overlay for Readability */}
          <div className="absolute inset-0 bg-black/40"></div>
    
          {/* 📌 Content Positioned Beside Sidebar */}
          <div className="absolute top-20 left-72 text-white z-10">
            <h1 className="text-5xl font-bold drop-shadow-lg">Evil'l Hell</h1>
            <p className="text-lg opacity-80 mt-2">Before I'm alone..</p>
          </div>
        </div>
      );
    }
    