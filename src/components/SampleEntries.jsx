import React, { useState, useEffect } from 'react';
import { FaStar, FaEye, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { apiGetUserPhotos, apiDeletePhoto, apiPostFavorite, apiRemoveFavorite, isEntryFavorited } from '../services/photo';
import ViewEntry from './ViewEntry';
import EditEntry from './EditEntry';
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';
import Pagination from './Pagination';
import ViewToggle from './ViewToggle';

// At the top of your file, add the sample images array
const sampleImages = [
    "https://americanbehavioralclinics.com/wp-content/uploads/2023/06/Depositphotos_252922046_L.jpg",
    "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg",
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
];

const SampleEntries = ({ theme }) => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Show 9 items per page (3x3 grid)
    const [isGridView, setIsGridView] = useState(true);

    const fetchEntries = async () => {
        try {
            const response = await apiGetUserPhotos();
            const sortedEntries = response.data.sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setEntries(sortedEntries);
            setFilteredEntries(sortedEntries);
        } catch (error) {
            console.error('Error fetching entries:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load entries',
            });
        } finally {
            setLoading(false);
        }
    };

    console.log(entries);

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleSearch = ({ searchTerm, startDate, endDate }) => {
        let filtered = entries;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(entry => 
                entry.title.toLowerCase().includes(term) ||
                entry.description?.toLowerCase().includes(term)
            );
        }

        if (startDate && endDate) {
            filtered = filtered.filter(entry => {
                const entryDate = new Date(entry.createdAt);
                return entryDate >= new Date(startDate) && 
                       entryDate <= new Date(endDate);
            });
        }

        setFilteredEntries(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await apiDeletePhoto(id);
                setEntries(entries.filter(entry => entry.id !== id));
                setFilteredEntries(filteredEntries.filter(entry => entry.id !== id));
                Swal.fire('Deleted!', 'Your entry has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete entry',
            });
        }
    };

    const handleToggleFavorite = async (id) => {
        try {
            const entry = entries.find(e => e.id === id);
            if (entry.isFavorited) {
                await apiRemoveFavorite(id);
            } else {
                await apiPostFavorite(id);
            }

            // Update the entries state with the new favorite status
            const updatedEntries = entries.map(entry => 
                entry.id === id 
                    ? { ...entry, isFavorited: !entry.isFavorited }
                    : entry
            );
            setEntries(updatedEntries);
            setFilteredEntries(updatedEntries);

        } catch (error) {
            console.error('Error toggling favorite:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update favorite status',
            });
        }
    };

    const handleUpdate = async (updatedEntry) => {
        try {
            // Update both entries and filteredEntries states
            const updatedEntries = entries.map(entry => 
                entry.id === updatedEntry.id ? updatedEntry : entry
            );
            const updatedFilteredEntries = filteredEntries.map(entry => 
                entry.id === updatedEntry.id ? updatedEntry : entry
            );

            setEntries(updatedEntries);
            setFilteredEntries(updatedFilteredEntries);
            setEditingEntry(null);

            // Fetch fresh data
            await fetchEntries();
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    };

    // Get current entries
    const indexOfLastEntry = currentPage * itemsPerPage;
    const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className={`p-6 ${theme.textColor} ${theme.formBg}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Memories</h2>
                <ViewToggle 
                    isGridView={isGridView} 
                    onToggle={setIsGridView}
                    theme={theme}
                />
            </div>
            
            <SearchBar 
                onSearch={handleSearch}
                onClear={() => setFilteredEntries(entries)}
                theme={theme}
            />
            
            <div className={isGridView 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }>
                {currentEntries.map((entry, index) => (
                    <div 
                        key={entry.id} 
                        className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden
                            ${!isGridView && 'flex'}`}
                    >
                        <div className={!isGridView ? 'w-48 h-48 flex-shrink-0' : ''}>
                            <img
                                src={sampleImages[index % sampleImages.length]} // Use modulo to cycle through sample images
                                alt={entry.title}
                                className={`${isGridView ? 'w-full h-48' : 'w-48 h-48'} object-cover`}
                                onError={(e) => {
                                    e.target.src = sampleImages[0]; // Fallback to first sample image if error
                                }}
                            />
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
                                        onClick={() => setEditingEntry(entry)}
                                        className="text-green-500 hover:text-green-600"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleToggleFavorite(entry.id)}
                                        className={`${entry.isFavorited ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                                        title={entry.isFavorited ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <FaStar />
                                    </button>
                                </div>
                                
                                <button
                                    onClick={() => handleDelete(entry.id)}
                                    className="text-red-500 hover:text-red-600"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination 
                currentPage={currentPage}
                totalItems={filteredEntries.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                theme={theme}
            />

            {selectedEntry && (
                <ViewEntry
                    entry={selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                    onToggleFavorite={handleToggleFavorite}
                    theme={theme}
                />
            )}

            {editingEntry && (
                <EditEntry
                    entry={editingEntry}
                    onClose={() => setEditingEntry(null)}
                    onUpdate={handleUpdate}
                    theme={theme}
                />
            )}
        </div>
    );
};

export default SampleEntries;
