import React from 'react';
import { FaStar, FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for favorite, view, edit, and delete

const ViewEntries = ({ entries }) => {
  return (
    <div className="entry-list p-6">
      <h2 className="text-2xl font-bold mb-4">All Entries</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b font-semibold text-gray-700">Image</th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">Title</th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">Category</th>
            {/* <th className="py-3 px-4 border-b font-semibold text-gray-700">Location</th> */}
            <th className="py-3 px-4 border-b font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              {/* Image column */}
              <td className="py-3 px-4 border-b text-center">
                {entry.images && entry.images.length > 0 ? (
                  <img
                    src={URL.createObjectURL(entry.images[0])}
                    alt="Entry"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>
              {/* Title column */}
              <td className="py-3 px-4 border-b text-gray-800">{entry.title}</td>
              {/* Category column */}
              <td className="py-3 px-4 border-b text-gray-800">{entry.category}</td>
              {/* Location column */}
              <td className="py-3 px-4 border-b text-gray-800">{entry.location || 'N/A'}</td>
              {/* Actions column */}
              <td className="py-3 px-4 border-b text-center space-x-2">
                <button className="text-yellow-500 hover:text-yellow-600">
                  <FaStar title="Favorite" />
                </button>
                <button className="text-blue-500 hover:text-blue-600">
                  <FaEye title="View" />
                </button>
                <button className="text-green-500 hover:text-green-600">
                  <FaEdit title="Edit" />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <FaTrash title="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEntries;
