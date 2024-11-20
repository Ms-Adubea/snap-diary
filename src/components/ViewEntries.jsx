import React, { useState, useEffect } from 'react';
import { FaStar, FaEye, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { apiGetUserPhotos, apiDeletePhoto, apiPostFavorite } from '../services/photo';
import ViewEntry from './ViewEntry';
import EditEntry from './EditEntry';
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';

const ViewEntries = ({ theme }) => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    const [loading, setLoading] = useState(true);

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
            await apiPostFavorite(id);
            const updatedEntries = entries.map(entry => 
                entry.id === id 
                    ? { ...entry, isFavorite: !entry.isFavorite }
                    : entry
            );
            setEntries(updatedEntries);
            setFilteredEntries(
                filteredEntries.map(entry => 
                    entry.id === id 
                        ? { ...entry, isFavorite: !entry.isFavorite }
                        : entry
                )
            );
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
            setEntries(prevEntries => 
                prevEntries.map(entry => 
                    entry.id === updatedEntry.id ? updatedEntry : entry
                )
            );
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className={`p-6 ${theme.textColor}`}>
            <h2 className="text-2xl font-bold mb-6">My Memories</h2>
            
            <SearchBar 
                onSearch={handleSearch}
                onClear={() => setFilteredEntries(entries)}
                theme={theme}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntries.map((entry) => (
                    <div 
                        key={entry.id} 
                        className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden`}
                    >
                        <div className="aspect-w-16 aspect-h-9">
                            {entry.images && entry.images[0] ? (
                                <img
                                    src={`https://savefiles.org/secure/uploads/${entry.images[0]}?shareable_link=509`}
                                    alt={entry.title}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <FaImage className="text-4xl text-gray-400" />
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4">
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
                                        className={`${entry.isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                                        title={entry.isFavorite ? "Remove from favorites" : "Add to favorites"}
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

export default ViewEntries;
