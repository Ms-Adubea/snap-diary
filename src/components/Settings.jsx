import React from 'react'
import UserProfile from './UserProfile';
import ThemeSelector from './ThemeSelector';

const Settings = ({ user, onUpdateProfile, currentTheme, onThemeChange }) => {
  return (
    <div className={`space-y-8 ${currentTheme.textColor}`}>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className={`${currentTheme.cardBg} rounded-lg shadow-md`}>
        <UserProfile 
          user={user} 
          onUpdateProfile={onUpdateProfile}
          theme={currentTheme}
        />
      </div>
      
      <div className={`${currentTheme.cardBg} rounded-lg shadow-md`}>
        <ThemeSelector 
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />
      </div>
    </div>
  )
}

export default Settings;