import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaLeaf } from 'react-icons/fa';
import Sidebar from './Sidebar';
import AddEntry from './AddEntry';
import CreateEvent from './CreateEvent';
import ViewEntries from './ViewEntries';
import ViewEvents from './ViewEvents';
import ViewFavorites from './ViewFavorites';
import Settings from './Settings';
import Header from './Header';
import Overview from './Overview';
import ThemeSelector from './ThemeSelector';

const themes = [
  {
    id: 'light',
    name: 'Light',
    icon: FaSun,
    gradient: 'bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200',
    headerGradient: 'bg-pink-400',
    textColor: 'text-gray-800',
    bgColor: 'bg-gray-50',
    cardBg: 'bg-white',
    buttonColor: 'bg-orange-600 hover:bg-orange-700',
    borderColor: 'border-gray-200'
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: FaMoon,
    gradient: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black',
    headerGradient: 'bg-gray-800',
    textColor: 'text-white',
    bgColor: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    borderColor: 'border-gray-700'
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: FaLeaf,
    gradient: 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400',
    headerGradient: 'bg-green-600',
    textColor: 'text-gray-800',
    bgColor: 'bg-green-50',
    cardBg: 'bg-white',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    borderColor: 'border-green-200'
  }
];

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("overview");
  const [entries, setEntries] = useState([]);
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: null
  });

  const handleSaveEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleSaveEntry = (newEntry) => {
    const updatedEvents = events.map(event => {
      if (event.id === newEntry.event) {
        return { ...event, entries: [...event.entries, newEntry] };
      }
      return event;
    });
    setEvents(updatedEvents);
    setEntries([...entries, newEntry]);
  };

  const sampleEvents = [
    {
      id: 1,
      eventName: "Summer Vacation",
      eventDescription: "A memorable vacation with friends at the beach.",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      entries: [
        { id: 1, title: "Beach Day" },
        { id: 2, title: "Sunset Cruise" },
        { id: 3, title: "Camping by the Shore" },
      ],
    },
    {
      id: 2,
      eventName: "Birthday Celebration",
      eventDescription: "Celebrating my 25th birthday with close family and friends.",
      startDate: "2024-08-10",
      endDate: "2024-08-10",
      entries: [
        { id: 4, title: "Party Setup" },
        { id: 5, title: "Dinner & Cake" },
      ],
    },
    {
      id: 3,
      eventName: "Road Trip",
      eventDescription: "An adventurous road trip through the mountains.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      entries: [
        { id: 6, title: "Scenic Route" },
        { id: 7, title: "Mountain Hike" },
        { id: 8, title: "Night Camping" },
      ],
    },
  ];
  
  // Sample handler functions for testing (replace with your actual handlers)
  const onViewEvent = (event) => console.log("Viewing event:", event);
  const onEditEvent = (event) => console.log("Editing event:", event);
  const onDeleteEvent = (event) => console.log("Deleting event:", event);
  const onViewEntry = (entry) => console.log("Viewing entry:", entry);
  const onEditEntry = (entry) => console.log("Editing entry:", entry);
  const onDeleteEntry = (entry) => console.log("Deleting entry:", entry);
  

  useEffect(() => {
  // Replace with actual API calls or local storage retrieval
  const fetchEntries = async () => {
    const response = await fetch('/api/entries'); // Example API endpoint
    const data = await response.json();
    setEntries(data);
  };

  const fetchEvents = async () => {
    const response = await fetch('/api/events'); // Example API endpoint
    const data = await response.json();
    setEvents(data);
  };

  fetchEntries();
  fetchEvents();
}, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser(updatedProfile);
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('themeId', theme.id);
  };

  useEffect(() => {
    const savedThemeId = localStorage.getItem('themeId');
    if (savedThemeId) {
      const savedTheme = themes.find(theme => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  const renderContent = () => {
    switch (selectedView) {
      case "overview":
        return <Overview 
          username={user.firstName}
          entries={entries}
          onSelect={setSelectedView}
          theme={currentTheme}
        />;
      case "addEntry":
        return <AddEntry 
          events={events} 
          onSave={handleSaveEntry} 
          theme={currentTheme}
        />;
      case "createEvent":
        return <CreateEvent 
          onSave={handleSaveEvent} 
          theme={currentTheme}
        />;
      case "viewEntries":
        return <ViewEntries 
          entries={entries} 
          theme={currentTheme}
        />;
      case "viewEvents":
        return <ViewEvents
          events={sampleEvents}
          onViewEvent={onViewEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
          onViewEntry={onViewEntry}
          onEditEntry={onEditEntry}
          onDeleteEntry={onDeleteEntry}
          theme={currentTheme}
        />;
      case "viewFavorites":
        return <ViewFavorites 
          entries={entries.filter(entry => entry.isFavorite)} 
          theme={currentTheme}
        />;
      case "settings":
        return <Settings 
          user={user}
          onUpdateProfile={handleUpdateProfile}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />;
      default:
        return <ViewEntries 
          entries={entries} 
          theme={currentTheme}
        />;
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar 
        onSelect={(view) => {
          setSelectedView(view);
          if (isMobile) setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        theme={currentTheme}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          user={user} 
          theme={currentTheme}
        />
        <main className={`flex-1 overflow-y-auto p-6 ${currentTheme.bgColor}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
