import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaStar, FaImage } from 'react-icons/fa';
import { apiGetFavoritePhotos, apiPostFavorite, apiRemoveFavorite } from '../services/photo';
import ViewEntry from './ViewEntry';
import Swal from 'sweetalert2';
import Pagination from './Pagination';
import ViewToggle from './ViewToggle';

const ViewFavorites = ({ theme }) => {
    const [favorites, setFavorites] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [isGridView, setIsGridView] = useState(true);

    const fetchFavorites = async () => {
        try {
            const response = await apiGetFavoritePhotos();
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load favorite entries',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleToggleFavorite = async (id) => {
        try {
            const entry = favorites.find(e => e.id === id);
            if (entry.isFavorited) {
                await apiRemoveFavorite(id);
            } else {
                await apiPostFavorite(id);
            }

            // Refresh favorites list after toggling
            fetchFavorites();
        } catch (error) {
            console.error('Error toggling favorite:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update favorite status',
            });
        }
    };

    // Get current favorites
    const indexOfLastFavorite = currentPage * itemsPerPage;
    const indexOfFirstFavorite = indexOfLastFavorite - itemsPerPage;
    const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className={`p-6 ${theme.textColor}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Favorite Memories</h2>
                <ViewToggle 
                    isGridView={isGridView} 
                    onToggle={setIsGridView}
                    theme={theme}
                />
            </div>

            {favorites.length > 0 ? (
                <>
                    <div className={isGridView 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "flex flex-col gap-4"
                    }>
                        {currentFavorites.map((entry) => (
                            <div 
                                key={entry.id} 
                                className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden
                                    ${!isGridView && 'flex'}`}
                            >
                                {/* Thumbnail Image */}
                                <div className={!isGridView ? 'w-48 h-48 flex-shrink-0' : ''}>
                                    {entry.image ? (
                                        <img
                                            src={`https://savefiles.org/${entry.image}`}
                                            alt={entry.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                            <FaImage className="text-4xl text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-4 flex-1">
                                    <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
                                    <p className="text-sm opacity-75 mb-4">
                                        {entry.description?.substring(0, 100)}...
                                    </p>
                                    
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedEntry(entry)}
                                                className="text-blue-500 hover:text-blue-600"
                                                title="View"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleToggleFavorite(entry.id)}
                                                className="text-yellow-500 hover:text-yellow-600"
                                                title="Remove from favorites"
                                            >
                                                <FaStar />
                                            </button>
                                        </div>
                                        
                                        <div className="text-sm opacity-75">
                                            {new Date(entry.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination 
                        currentPage={currentPage}
                        totalItems={favorites.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        theme={theme}
                    />
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No favorite entries yet. Mark entries as favorite to see them here!</p>
                </div>
            )}

            {selectedEntry && (
                <ViewEntry
                    entry={selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                    onToggleFavorite={handleToggleFavorite}
                    theme={theme}
                />
            )}
        </div>
    );
};

export default ViewFavorites;