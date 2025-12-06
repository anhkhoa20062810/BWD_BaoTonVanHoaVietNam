// Gallery.js - React component for image gallery
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Sample data for gallery items
const galleryItems = [
    {
        id: 1,
        title: "Cố đô Huế",
        category: "architecture",
        image: "assets/images/gallery/hue.jpg",
        description: "Quần thể di tích Cố đô Huế là di sản văn hóa thế giới."
    },
    {
        id: 2,
        title: "Phố cổ Hội An",
        category: "architecture",
        image: "assets/images/gallery/hoian.jpg",
        description: "Phố cổ Hội An là một thương cảng cổ từ thế kỷ 15 đến 19."
    },
    {
        id: 3,
        title: "Nghề dệt lụa truyền thống",
        category: "craft",
        image: "assets/images/gallery/silk.jpg",
        description: "Nghề dệt lụa là một trong những nghề thủ công truyền thống lâu đời."
    },
    {
        id: 4,
        title: "Múa rối nước",
        category: "performance",
        image: "assets/images/gallery/waterpuppet.jpg",
        description: "Múa rối nước là loại hình nghệ thuật dân gian độc đáo của Việt Nam."
    },
    {
        id: 5,
        title: "Vịnh Hạ Long",
        category: "natural",
        image: "assets/images/gallery/halong.jpg",
        description: "Vịnh Hạ Long là di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi."
    },
    {
        id: 6,
        title: "Lễ hội Đền Hùng",
        category: "festival",
        image: "assets/images/gallery/denhung.jpg",
        description: "Lễ hội Đền Hùng là lễ hội lớn tưởng nhớ các Vua Hùng đã có công dựng nước."
    }
];

function Gallery() {
    const [items, setItems] = useState(galleryItems);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    
    // Filter items when category changes
    useEffect(() => {
        if (selectedCategory === 'all') {
            setItems(galleryItems);
        } else {
            setItems(galleryItems.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory]);
    
    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    
    // Open lightbox
    const openLightbox = (item) => {
        setCurrentImage(item);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };
    
    // Close lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto'; // Enable scrolling
    };
    
    // Navigate to next image
    const nextImage = () => {
        const currentIndex = galleryItems.findIndex(item => item.id === currentImage.id);
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        setCurrentImage(galleryItems[nextIndex]);
    };
    
    // Navigate to previous image
    const prevImage = () => {
        const currentIndex = galleryItems.findIndex(item => item.id === currentImage.id);
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setCurrentImage(galleryItems[prevIndex]);
    };
    
    return (
        <div className="gallery-container">
            <div className="gallery-filters">
                <button 
                    className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('all')}
                >
                    Tất cả
                </button>
                <button 
                    className={`filter-btn ${selectedCategory === 'architecture' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('architecture')}
                >
                    Kiến trúc
                </button>
                <button 
                    className={`filter-btn ${selectedCategory === 'craft' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('craft')}
                >
                    Nghề thủ công
                </button>
                <button 
                    className={`filter-btn ${selectedCategory === 'festival' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('festival')}
                >
                    Lễ hội
                </button>
                <button 
                    className={`filter-btn ${selectedCategory === 'natural' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('natural')}
                >
                    Thiên nhiên
                </button>
                <button 
                    className={`filter-btn ${selectedCategory === 'performance' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('performance')}
                >
                    Nghệ thuật biểu diễn
                </button>
            </div>
            
            <div className="gallery-grid">
                {items.map(item => (
                    <div key={item.id} className="gallery-item" onClick={() => openLightbox(item)}>
                        <div className="gallery-image">
                            <img src={item.image || "/placeholder.svg"} alt={item.title} />
                        </div>
                        <div className="gallery-info">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Lightbox */}
            {lightboxOpen && currentImage && (
                <div className="lightbox">
                    <div className="lightbox-overlay" onClick={closeLightbox}></div>
                    <div className="lightbox-content">
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <i className="fas fa-times"></i>
                        </button>
                        <button className="lightbox-prev" onClick={prevImage}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="lightbox-image-container">
                            <img src={currentImage.image || "/placeholder.svg"} alt={currentImage.title} />
                            <div className="lightbox-caption">
                                <h3>{currentImage.title}</h3>
                                <p>{currentImage.description}</p>
                            </div>
                        </div>
                        <button className="lightbox-next" onClick={nextImage}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Render the Gallery component
const galleryContainer = document.getElementById('gallery-root');
if (galleryContainer) {
    ReactDOM.render(<Gallery />, galleryContainer);
}