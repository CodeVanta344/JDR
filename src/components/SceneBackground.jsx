import React, { useState, useEffect } from 'react';

export const SceneBackground = ({ currentImage }) => {
    const [bg1, setBg1] = useState(currentImage);
    const [bg2, setBg2] = useState(null);
    const [activeLayer, setActiveLayer] = useState(1);
    const [transitioning, setTransitioning] = useState(false);

    const fallbackImage = 'https://w0.peakpx.com/wallpaper/243/662/HD-wallpaper-dark-fantasy-castle-dark-fantasy-landscape-mystical.jpg';

    useEffect(() => {
        const nextImage = currentImage || fallbackImage;

        // If the new image is the same as the one currently showing, do nothing
        const currentlyShowing = activeLayer === 1 ? bg1 : bg2;
        if (nextImage === currentlyShowing) return;

        setTransitioning(true);
        if (activeLayer === 1) {
            setBg2(nextImage);
            setActiveLayer(2);
        } else {
            setBg1(nextImage);
            setActiveLayer(1);
        }

        const timer = setTimeout(() => {
            setTransitioning(false);
        }, 2000); // Transition duration matches CSS

        return () => clearTimeout(timer);
    }, [currentImage]);

    return (
        <div className="scene-background-container">
            <div
                className={`scene-layer layer-1 ${activeLayer === 1 ? 'active' : 'inactive'}`}
                style={{ backgroundImage: `url(${bg1 || fallbackImage})` }}
            />
            <div
                className={`scene-layer layer-2 ${activeLayer === 2 ? 'active' : 'inactive'}`}
                style={{ backgroundImage: `url(${bg2 || fallbackImage})` }}
            />
            <div className="scene-overlay" />
        </div>
    );
};
