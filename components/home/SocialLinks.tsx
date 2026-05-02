'use client';

import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter, FaTelegram, FaSnapchat } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

export function SocialLinks() {
  const links = [
    { 
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com/@yourchannel',
      color: 'hover:text-red-500 hover:border-red-500'
    },
    {
      name: 'Instagram', 
      icon: FaInstagram,
      url: 'https://instagram.com/yourprofile',
      color: 'hover:text-pink-500 hover:border-pink-500'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com/yourpage',
      color: 'hover:text-blue-500 hover:border-blue-500'
    },
    {
      name: 'X (Twitter)',
      icon: FaXTwitter,
      url: 'https://x.com/yourprofile',
      color: 'hover:text-white hover:border-white'
    },
    {
      name: 'Threads',
      icon: SiThreads,
      url: 'https://threads.net/@yourprofile',
      color: 'hover:text-white hover:border-white'
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      url: 'https://t.me/yourchannel',
      color: 'hover:text-blue-400 hover:border-blue-400'
    },
    {
      name: 'Snapchat',
      icon: FaSnapchat,
      url: 'https://snapchat.com/add/yourusername',
      color: 'hover:text-yellow-400 hover:border-yellow-400'
    }
  ];

  return (
    <div className="flex overflow-x-auto md:overflow-visible md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 my-12 px-4 md:px-0 no-scrollbar max-w-full">
      {links.map((link, i) => {
        const Icon = link.icon;
        return (
          <button  
            key={i}
            onClick={() => window.open(link.url, '_blank')}
            title={link.name}
            className={`w-12 h-12 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${link.color} transition-all duration-200`}
          >
            <Icon className="text-xl" />
          </button>
        );
      })}
    </div>
  );
}
