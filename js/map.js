// Map JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the map page
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;
    
    // Initialize map (using Leaflet.js as an example)
    // Note: You need to include Leaflet CSS and JS in your HTML
    const map = L.map('map-container').setView([16.0, 106.0], 5);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Sample data for heritage sites
    const heritageSites = [
        {
            name: "Cố đô Huế",
            type: "architecture",
            lat: 16.4637,
            lng: 107.5909,
            description: "Quần thể di tích Cố đô Huế là di sản văn hóa thế giới, bao gồm Kinh thành Huế và các lăng tẩm vua chúa triều Nguyễn."
        },
        {
            name: "Phố cổ Hội An",
            type: "architecture",
            lat: 15.8801,
            lng: 108.338,
            description: "Phố cổ Hội An là một thương cảng cổ, một ví dụ nổi bật về cảng thương mại Đông Nam Á từ thế kỷ 15 đến 19."
        },
        {
            name: "Thánh địa Mỹ Sơn",
            type: "architecture",
            lat: 15.7684,
            lng: 108.125,
            description: "Thánh địa Mỹ Sơn là một quần thể đền đài Chăm Pa, được xây dựng trong khoảng thời gian từ thế kỷ 4 đến thế kỷ 13."
        },
        {
            name: "Vịnh Hạ Long",
            type: "natural",
            lat: 20.9101,
            lng: 107.1839,
            description: "Vịnh Hạ Long là một vịnh nhỏ thuộc phần bờ tây vịnh Bắc Bộ, bao gồm vùng biển đảo thuộc thành phố Hạ Long, Quảng Ninh."
        },
        {
            name: "Phong Nha - Kẻ Bàng",
            type: "natural",
            lat: 17.5906,
            lng: 106.2832,
            description: "Vườn quốc gia Phong Nha - Kẻ Bàng nổi tiếng với hệ thống hang động kỳ vĩ và đa dạng sinh học phong phú."
        }
    ];
    
    // Add markers for each heritage site
    heritageSites.forEach(site => {
        const marker = L.marker([site.lat, site.lng]).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div class="map-popup">
                <h3>${site.name}</h3>
                <p class="site-type">${site.type === 'architecture' ? 'Di sản kiến trúc' : 'Di sản thiên nhiên'}</p>
                <p>${site.description}</p>
                <a href="heritage/${site.name.toLowerCase().replace(/\s+/g, '-')}.html" class="popup-link">Xem chi tiết</a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
    
    // Filter sites by type
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Clear existing markers
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });
                
                // Add filtered markers
                heritageSites.forEach(site => {
                    if (filterType === 'all' || site.type === filterType) {
                        const marker = L.marker([site.lat, site.lng]).addTo(map);
                        
                        const popupContent = `
                            <div class="map-popup">
                                <h3>${site.name}</h3>
                                <p class="site-type">${site.type === 'architecture' ? 'Di sản kiến trúc' : 'Di sản thiên nhiên'}</p>
                                <p>${site.description}</p>
                                <a href="heritage/${site.name.toLowerCase().replace(/\s+/g, '-')}.html" class="popup-link">Xem chi tiết</a>
                            </div>
                        `;
                        
                        marker.bindPopup(popupContent);
                    }
                });
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('map-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Filter the list of sites
            const filteredSites = heritageSites.filter(site => 
                site.name.toLowerCase().includes(searchTerm) || 
                site.description.toLowerCase().includes(searchTerm)
            );
            
            // Update the site list
            updateSiteList(filteredSites);
        });
    }
    
    // Function to update the site list in the sidebar
    function updateSiteList(sites) {
        const siteListContainer = document.getElementById('site-list');
        if (!siteListContainer) return;
        
        // Clear existing list
        siteListContainer.innerHTML = '';
        
        // Add sites to the list
        sites.forEach(site => {
            const siteElement = document.createElement('div');
            siteElement.className = 'site-item';
            siteElement.innerHTML = `
                <h3>${site.name}</h3>
                <p class="site-type">${site.type === 'architecture' ? 'Di sản kiến trúc' : 'Di sản thiên nhiên'}</p>
                <p class="site-description">${site.description.substring(0, 100)}...</p>
            `;
            
            // Add click event to center map on this site
            siteElement.addEventListener('click', function() {
                map.setView([site.lat, site.lng], 12);
                
                // Find the marker and open its popup
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker && 
                        layer.getLatLng().lat === site.lat && 
                        layer.getLatLng().lng === site.lng) {
                        layer.openPopup();
                    }
                });
            });
            
            siteListContainer.appendChild(siteElement);
        });
        
        // Show message if no sites found
        if (sites.length === 0) {
            siteListContainer.innerHTML = '<p class="no-results">Không tìm thấy kết quả phù hợp</p>';
        }
    }
    
    // Initialize site list
    updateSiteList(heritageSites);
});