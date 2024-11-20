import React, { useState, useEffect } from 'react';
import { FaBook, FaCalendar } from 'react-icons/fa';
import { apiGetUserPhotos } from '../services/photo';
import { apiGetEvents } from '../services/event';
import { IoImagesOutline } from "react-icons/io5";

const Stats = ({ theme }) => {
    const [stats, setStats] = useState({
        totalEntries: 0,
        totalEvents: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [entriesResponse, eventsResponse] = await Promise.all([
                    apiGetUserPhotos(),
                    apiGetEvents()
                ]);

                setStats({
                    totalEntries: entriesResponse.data.length,
                    totalEvents: eventsResponse.data.length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${theme.cardBg} p-6 rounded-lg shadow-md flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${theme.buttonColor} bg-opacity-10`}>
                        <FaBook className={`text-2xl ${theme.buttonColor}`} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Total Memories</h3>
                        <p className="text-3xl font-bold">{stats.totalEntries}</p>
                    </div>
                </div>
            </div>

            <div className={`${theme.cardBg} p-6 rounded-lg shadow-md flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${theme.buttonColor} bg-opacity-10`}>
                        <IoImagesOutline className={`text-2xl ${theme.buttonColor}`} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Total Collections</h3>
                        <p className="text-3xl font-bold">{stats.totalEvents}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats; 