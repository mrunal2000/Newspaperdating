import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { shouldUseSupabase } from './services/supabase';
import { Button } from './components/minimal/button';
import { Badge } from './components/minimal/badge';
import { Heart, MessageCircle } from 'lucide-react';
import { HybridPostsService } from './services/hybridPostsService';
import { Profile, Comment } from './types';

// City-specific template posts
const cityTemplates = {
  'New York': [
    {
      names: ['Alex', 'Jordan', 'Sam', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Quinn'],
      titles: [
        'Seeking Coffee & Conversation in the City',
        'Brooklyn Artist Looking for Inspiration',
        'Wall Street Professional Seeking Balance',
        'Queens Foodie Wants Dining Partner',
        'Manhattan Creative Seeks Muse'
      ],
      descriptions: [
        "NYC transplant looking for someone to explore hidden coffee shops and rooftop bars with. Love discovering new neighborhoods and sharing stories over craft cocktails.",
        "Brooklyn-based painter seeking someone who appreciates art, live music, and late-night conversations about life, love, and everything in between.",
        "Finance professional by day, jazz enthusiast by night. Looking for someone to share weekend adventures and weekday decompression sessions.",
        "Queens native passionate about authentic cuisine from every culture. Want to find someone to explore the city's diverse food scene with.",
        "Creative director seeking someone who values both ambition and authenticity. Let's build something beautiful together in this crazy city."
      ],
      interests: [
        ['Coffee', 'Art', 'Live Music'],
        ['Painting', 'Jazz', 'Brooklyn'],
        ['Finance', 'Jazz', 'Weekend Adventures'],
        ['Food', 'Culture', 'Queens'],
        ['Creativity', 'Ambition', 'Authenticity']
      ]
    }
  ],
  'Los Angeles': [
    {
      names: ['Blake', 'Skyler', 'Avery', 'Rowan', 'Sage', 'River', 'Phoenix', 'Ocean'],
      titles: [
        'Venice Beach Creative Seeking Sunshine Partner',
        'Hollywood Dreamer Wants Real Connection',
        'Silver Lake Musician Looking for Harmony',
        'Santa Monica Tech Founder Seeks Balance',
        'Echo Park Artist Wants to Paint Together'
      ],
      descriptions: [
        "Venice Beach local who believes in the power of sunshine, creativity, and authentic connections. Let's build sandcastles and dreams together.",
        "Hollywood isn't just about fame—it's about finding someone real in a world of make-believe. Looking for genuine connection and shared adventures.",
        "Silver Lake musician seeking someone to harmonize with in life. Whether it's music, conversation, or just being together, let's create something beautiful.",
        "Tech founder who believes success means nothing without someone to share it with. Looking for balance between ambition and meaningful relationships.",
        "Echo Park artist who sees beauty in everything. Want to find someone to paint the canvas of life with, one brushstroke at a time."
      ],
      interests: [
        ['Beach', 'Creativity', 'Sunshine'],
        ['Hollywood', 'Authenticity', 'Adventure'],
        ['Music', 'Harmony', 'Silver Lake'],
        ['Technology', 'Success', 'Balance'],
        ['Art', 'Beauty', 'Echo Park']
      ]
    }
  ],
  'San Francisco': [
    {
      names: ['Riley', 'Quinn', 'Avery', 'Blake', 'Skyler', 'Rowan', 'Sage', 'River'],
      titles: [
        'Mission District Foodie Seeks Culinary Partner',
        'Marina Tech Professional Wants Work-Life Balance',
        'North Beach Poet Looking for Muse',
        'Hayes Valley Designer Seeks Creative Connection',
        'Pacific Heights Professional Wants Authenticity'
      ],
      descriptions: [
        "Mission District resident who believes food is love. Looking for someone to explore the city's incredible culinary scene with, from food trucks to fine dining.",
        "Tech professional who's learned that success isn't everything. Seeking someone to help maintain work-life balance and share the beauty of the Bay Area.",
        "North Beach poet who finds inspiration in everyday moments. Want to connect with someone who sees the poetry in life and loves deep conversations.",
        "Hayes Valley designer seeking someone who appreciates both creativity and authenticity. Let's build something beautiful together in this amazing city.",
        "Pacific Heights professional who values substance over status. Looking for genuine connection and someone to share the simple pleasures of life with."
      ],
      interests: [
        ['Food', 'Culinary Arts', 'Mission District'],
        ['Technology', 'Work-Life Balance', 'Bay Area'],
        ['Poetry', 'Inspiration', 'North Beach'],
        ['Design', 'Creativity', 'Hayes Valley'],
        ['Authenticity', 'Simple Pleasures', 'Pacific Heights']
      ]
    }
  ],
  'Chicago': [
    {
      names: ['Jordan', 'Casey', 'Morgan', 'Riley', 'Quinn', 'Alex', 'Sam', 'Taylor'],
      titles: [
        'Wicker Park Artist Seeks Creative Soulmate',
        'Lincoln Park Professional Wants Weekend Adventures',
        'Lakeview Foodie Looking for Dining Partner',
        'West Loop Entrepreneur Seeks Work-Life Harmony',
        'Gold Coast Professional Wants Authentic Connection'
      ],
      descriptions: [
        "Wicker Park artist who believes creativity flows from connection. Looking for someone to inspire and be inspired by in this amazing neighborhood.",
        "Lincoln Park professional who loves exploring the city on weekends. Seeking someone to share adventures with, from museums to music venues.",
        "Lakeview resident passionate about Chicago's incredible food scene. Want to find someone to explore new restaurants and hidden gems with.",
        "West Loop entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "Gold Coast professional who values authenticity over appearances. Seeking someone real to share the simple pleasures of life with."
      ],
      interests: [
        ['Art', 'Creativity', 'Wicker Park'],
        ['Adventure', 'Exploration', 'Lincoln Park'],
        ['Food', 'Restaurants', 'Lakeview'],
        ['Entrepreneurship', 'Work-Life Balance', 'West Loop'],
        ['Authenticity', 'Simple Pleasures', 'Gold Coast']
      ]
    }
  ],
  'Austin': [
    {
      names: ['Skyler', 'Rowan', 'Sage', 'River', 'Phoenix', 'Ocean', 'Blake', 'Avery'],
      titles: [
        'East Austin Musician Seeks Creative Partner',
        'South Congress Foodie Wants Culinary Adventures',
        'Downtown Tech Professional Seeks Work-Life Balance',
        'Zilker Park Enthusiast Looking for Nature Lover',
        'Barton Springs Local Wants Authentic Connection'
      ],
      descriptions: [
        "East Austin musician who believes music is the language of the soul. Looking for someone to harmonize with in life and create beautiful melodies together.",
        "South Congress foodie passionate about Austin's incredible culinary scene. Want to explore food trucks, farmers markets, and hidden gems together.",
        "Downtown tech professional who's learned that success isn't everything. Seeking someone to help maintain work-life balance and enjoy Austin's unique culture.",
        "Zilker Park enthusiast who finds peace in nature. Looking for someone to share outdoor adventures, from hiking to swimming in Barton Springs.",
        "Barton Springs local who values authenticity and connection. Seeking someone real to share the simple pleasures of Austin life with."
      ],
      interests: [
        ['Music', 'Creativity', 'East Austin'],
        ['Food', 'Culinary Arts', 'South Congress'],
        ['Technology', 'Work-Life Balance', 'Downtown'],
        ['Nature', 'Outdoors', 'Zilker Park'],
        ['Authenticity', 'Local Culture', 'Barton Springs']
      ]
    }
  ],
  'Houston': [
    {
      names: ['Jordan', 'Casey', 'Morgan', 'Riley', 'Quinn', 'Alex', 'Sam', 'Taylor'],
      titles: [
        'Montrose Artist Seeks Creative Inspiration',
        'Rice Village Professional Wants Weekend Adventures',
        'Heights Foodie Looking for Dining Partner',
        'Galleria Entrepreneur Seeks Work-Life Harmony',
        'River Oaks Professional Wants Authentic Connection'
      ],
      descriptions: [
        "Montrose artist who finds beauty in Houston's diverse culture. Looking for someone to explore art galleries and share creative inspiration with.",
        "Rice Village professional who loves discovering Houston's hidden gems. Seeking someone to share weekend adventures and explore the city together.",
        "Heights resident passionate about Houston's incredible food scene. Want to find someone to explore new restaurants and food trucks with.",
        "Galleria entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "River Oaks professional who values authenticity over appearances. Seeking someone real to share the simple pleasures of Houston life with."
      ],
      interests: [
        ['Art', 'Creativity', 'Montrose'],
        ['Adventure', 'Exploration', 'Rice Village'],
        ['Food', 'Restaurants', 'Heights'],
        ['Entrepreneurship', 'Work-Life Balance', 'Galleria'],
        ['Authenticity', 'Simple Pleasures', 'River Oaks']
      ]
    }
  ],
  'Phoenix': [
    {
      names: ['Blake', 'Skyler', 'Avery', 'Rowan', 'Sage', 'River', 'Phoenix', 'Ocean'],
      titles: [
        'Scottsdale Creative Seeks Sunshine Partner',
        'Downtown Phoenix Professional Wants Real Connection',
        'Tempe Musician Looking for Harmony',
        'Chandler Tech Professional Seeks Balance',
        'Gilbert Local Wants to Explore Together'
      ],
      descriptions: [
        "Scottsdale creative who believes in the power of sunshine and authentic connections. Let's explore the desert and build dreams together.",
        "Downtown Phoenix professional seeking someone real in the Valley of the Sun. Looking for genuine connection and shared adventures.",
        "Tempe musician seeking someone to harmonize with in life. Whether it's music, conversation, or just being together, let's create something beautiful.",
        "Chandler tech professional who believes success means nothing without someone to share it with. Looking for balance between ambition and meaningful relationships.",
        "Gilbert local who sees beauty in the desert landscape. Want to find someone to explore Arizona's natural wonders with."
      ],
      interests: [
        ['Desert', 'Creativity', 'Scottsdale'],
        ['Downtown', 'Authenticity', 'Adventure'],
        ['Music', 'Harmony', 'Tempe'],
        ['Technology', 'Success', 'Balance'],
        ['Nature', 'Beauty', 'Gilbert']
      ]
    }
  ],
  'Philadelphia': [
    {
      names: ['Riley', 'Quinn', 'Avery', 'Blake', 'Skyler', 'Rowan', 'Sage', 'River'],
      titles: [
        'Fishtown Artist Seeks Creative Soulmate',
        'Rittenhouse Professional Wants Weekend Adventures',
        'South Philly Foodie Looking for Dining Partner',
        'University City Entrepreneur Seeks Work-Life Harmony',
        'Old City Professional Wants Authentic Connection'
      ],
      descriptions: [
        "Fishtown artist who believes creativity flows from connection. Looking for someone to inspire and be inspired by in this amazing neighborhood.",
        "Rittenhouse professional who loves exploring Philly on weekends. Seeking someone to share adventures with, from museums to music venues.",
        "South Philly resident passionate about Philadelphia's incredible food scene. Want to find someone to explore new restaurants and hidden gems with.",
        "University City entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "Old City professional who values authenticity over appearances. Seeking someone real to share the simple pleasures of Philadelphia life with."
      ],
      interests: [
        ['Art', 'Creativity', 'Fishtown'],
        ['Adventure', 'Exploration', 'Rittenhouse'],
        ['Food', 'Restaurants', 'South Philly'],
        ['Entrepreneurship', 'Work-Life Balance', 'University City'],
        ['Authenticity', 'Simple Pleasures', 'Old City']
      ]
    }
  ],
  'San Antonio': [
    {
      names: ['Jordan', 'Casey', 'Morgan', 'Riley', 'Quinn', 'Alex', 'Sam', 'Taylor'],
      titles: [
        'Pearl District Creative Seeks Inspiration',
        'King William Professional Wants Weekend Adventures',
        'Southtown Foodie Looking for Dining Partner',
        'Stone Oak Entrepreneur Seeks Work-Life Harmony',
        'Alamo Heights Professional Wants Authentic Connection'
      ],
      descriptions: [
        "Pearl District creative who finds inspiration in San Antonio's rich culture. Looking for someone to explore art galleries and share creative moments with.",
        "King William professional who loves discovering San Antonio's hidden gems. Seeking someone to share weekend adventures and explore the city together.",
        "Southtown resident passionate about San Antonio's incredible food scene. Want to find someone to explore new restaurants and food trucks with.",
        "Stone Oak entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "Alamo Heights professional who values authenticity over appearances. Seeking someone real to share the simple pleasures of San Antonio life with."
      ],
      interests: [
        ['Art', 'Creativity', 'Pearl District'],
        ['Adventure', 'Exploration', 'King William'],
        ['Food', 'Restaurants', 'Southtown'],
        ['Entrepreneurship', 'Work-Life Balance', 'Stone Oak'],
        ['Authenticity', 'Simple Pleasures', 'Alamo Heights']
      ]
    }
  ],
  'San Jose': [
    {
      names: ['Blake', 'Skyler', 'Avery', 'Rowan', 'Sage', 'River', 'Phoenix', 'Ocean'],
      titles: [
        'Downtown Tech Professional Seeks Work-Life Balance',
        'Willow Glen Local Wants to Explore Together',
        'Santana Row Foodie Looking for Culinary Partner',
        'Almaden Valley Entrepreneur Seeks Harmony',
        'Campbell Local Wants Authentic Connection'
      ],
      descriptions: [
        "Downtown San Jose tech professional who's learned that success isn't everything. Seeking someone to help maintain work-life balance and enjoy the Bay Area.",
        "Willow Glen resident who loves exploring San Jose's hidden gems. Looking for someone to share weekend adventures and discover new experiences with.",
        "Santana Row foodie passionate about San Jose's diverse culinary scene. Want to find someone to explore new restaurants and food trucks with.",
        "Almaden Valley entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "Campbell local who values authenticity over appearances. Seeking someone real to share the simple pleasures of San Jose life with."
      ],
      interests: [
        ['Technology', 'Work-Life Balance', 'Downtown'],
        ['Adventure', 'Exploration', 'Willow Glen'],
        ['Food', 'Culinary Arts', 'Santana Row'],
        ['Entrepreneurship', 'Work-Life Balance', 'Almaden Valley'],
        ['Authenticity', 'Simple Pleasures', 'Campbell']
      ]
    }
  ],
  'Dallas': [
    {
      names: ['Jordan', 'Casey', 'Morgan', 'Riley', 'Quinn', 'Alex', 'Sam', 'Taylor'],
      titles: [
        'Deep Ellum Artist Seeks Creative Inspiration',
        'Uptown Professional Wants Weekend Adventures',
        'Bishop Arts Foodie Looking for Dining Partner',
        'Oak Lawn Entrepreneur Seeks Work-Life Harmony',
        'Highland Park Professional Wants Authentic Connection'
      ],
      descriptions: [
        "Deep Ellum artist who finds inspiration in Dallas's vibrant culture. Looking for someone to explore art galleries and share creative moments with.",
        "Uptown professional who loves discovering Dallas's hidden gems. Seeking someone to share weekend adventures and explore the city together.",
        "Bishop Arts resident passionate about Dallas's incredible food scene. Want to find someone to explore new restaurants and food trucks with.",
        "Oak Lawn entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "Highland Park professional who values authenticity over appearances. Seeking someone real to share the simple pleasures of Dallas life with."
      ],
      interests: [
        ['Art', 'Creativity', 'Deep Ellum'],
        ['Adventure', 'Exploration', 'Uptown'],
        ['Food', 'Restaurants', 'Bishop Arts'],
        ['Entrepreneurship', 'Work-Life Balance', 'Oak Lawn'],
        ['Authenticity', 'Simple Pleasures', 'Highland Park']
      ]
    }
  ],
  'Seattle': [
    {
      names: ['Blake', 'Skyler', 'Avery', 'Rowan', 'Sage', 'River', 'Phoenix', 'Ocean'],
      titles: [
        'Capitol Hill Creative Seeks Inspiration',
        'Fremont Local Wants to Explore Together',
        'Ballard Foodie Looking for Culinary Partner',
        'Queen Anne Entrepreneur Seeks Harmony',
        'Green Lake Professional Wants Authentic Connection'
      ],
      descriptions: [
        "Capitol Hill creative who finds inspiration in Seattle's unique culture. Looking for someone to explore art galleries and share creative moments with.",
        "Fremont resident who loves discovering Seattle's hidden gems. Seeking someone to share weekend adventures and explore the city together.",
        "Ballard foodie passionate about Seattle's incredible food scene. Want to find someone to explore new restaurants and food trucks with.",
        "Queen Anne entrepreneur who believes success means nothing without someone to share it with. Looking for work-life harmony and meaningful relationships.",
        "Green Lake professional who values authenticity over appearances. Seeking someone real to share the simple pleasures of Seattle life with."
      ],
      interests: [
        ['Art', 'Creativity', 'Capitol Hill'],
        ['Adventure', 'Exploration', 'Fremont'],
        ['Food', 'Restaurants', 'Ballard'],
        ['Entrepreneurship', 'Work-Life Balance', 'Queen Anne'],
        ['Authenticity', 'Simple Pleasures', 'Green Lake']
      ]
    }
  ]
};

// Generate random posts for a city
function generateCityPosts(city: string, count: number): Profile[] {
  const templates = cityTemplates[city as keyof typeof cityTemplates];
  if (!templates) {
    // Fallback template for cities without specific templates
    const fallbackTemplate = {
      names: ['Alex', 'Jordan', 'Sam', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Quinn'],
      titles: [
        'Seeking Connection in the City',
        'Professional Looking for Balance',
        'Creative Seeks Inspiration',
        'Local Wants to Explore Together',
        'Professional Wants Authentic Connection'
      ],
      descriptions: [
        "City resident looking for someone to explore local attractions and share meaningful conversations with. Love discovering new places and building genuine connections.",
        "Professional seeking someone who appreciates both ambition and authenticity. Looking for work-life balance and meaningful relationships.",
        "Creative soul seeking someone to inspire and be inspired by. Want to build something beautiful together in this amazing city.",
        "Local who loves exploring the city's hidden gems. Looking for someone to share adventures and discover new experiences with.",
        "Professional who values substance over status. Seeking genuine connection and someone to share the simple pleasures of life with."
      ],
      interests: [
        ['Exploration', 'Connection', 'Local Culture'],
        ['Professional Growth', 'Balance', 'Authenticity'],
        ['Creativity', 'Inspiration', 'Art'],
        ['Adventure', 'Discovery', 'Local Gems'],
        ['Authenticity', 'Simple Pleasures', 'Connection']
      ]
    };
    
    const posts: Profile[] = [];
    
    // Create arrays to track used names and ensure uniqueness
    const usedNames = new Set<string>();
    const availableNames = [...fallbackTemplate.names];
    
    for (let i = 0; i < count; i++) {
      let randomName: string;
      
      // If we've used all available names, reset the used names set
      if (usedNames.size >= availableNames.length) {
        usedNames.clear();
      }
      
      // Find an unused name
      do {
        randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
      } while (usedNames.has(randomName));
      
      usedNames.add(randomName);
      
      const randomTitle = fallbackTemplate.titles[Math.floor(Math.random() * fallbackTemplate.titles.length)];
      const randomDescription = fallbackTemplate.descriptions[Math.floor(Math.random() * fallbackTemplate.descriptions.length)];
      const randomInterests = fallbackTemplate.interests[Math.floor(Math.random() * fallbackTemplate.interests.length)];
      
      posts.push({
        id: `${city}-${i + 1}`,
        name: randomName,
        age: Math.floor(Math.random() * 15) + 25, // 25-40
        title: randomTitle,
        location: `${city}, ${getStateFromCity(city)}`,
        description: randomDescription,
        interests: randomInterests,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
        comments: []
      });
    }
    return posts;
  }
  
  const posts: Profile[] = [];
  const template = templates[0]; // Use first template for now
  
  // Create arrays to track used names and ensure uniqueness
  const usedNames = new Set<string>();
  const availableNames = [...template.names];
  
  for (let i = 0; i < count; i++) {
    let randomName: string;
    
    // If we've used all available names, reset the used names set
    if (usedNames.size >= availableNames.length) {
      usedNames.clear();
    }
    
    // Find an unused name
    do {
      randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
    } while (usedNames.has(randomName));
    
    usedNames.add(randomName);
    
    const randomTitle = template.titles[Math.floor(Math.random() * template.titles.length)];
    const randomDescription = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
    const randomInterests = template.interests[Math.floor(Math.random() * template.interests.length)];
    
    posts.push({
      id: `${city}-${i + 1}`,
      name: randomName,
      age: Math.floor(Math.random() * 15) + 25, // 25-40
      title: randomTitle,
      location: `${city}, ${getStateFromCity(city)}`,
      description: randomDescription,
      interests: randomInterests,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
      comments: []
    });
  }
  
  return posts;
}

// Get state abbreviation for cities
// Get state abbreviation for cities
function getStateFromCity(city: string): string {
  const stateMap: { [key: string]: string } = {
    'New York': 'NY',
    'Los Angeles': 'CA',
    'San Francisco': 'CA',
    'Chicago': 'IL',
    'Austin': 'TX',
    'Houston': 'TX',
    'Phoenix': 'AZ',
    'Philadelphia': 'PA',
    'San Antonio': 'TX',
    'San Diego': 'CA',
    'Dallas': 'TX',
    'San Jose': 'CA',
    'Jacksonville': 'FL',
    'Fort Worth': 'TX',
    'Columbus': 'OH',
    'Charlotte': 'NC',
    'Indianapolis': 'IN',
    'Seattle': 'WA',
    'Denver': 'CO',
    'Washington': 'DC'
  };
  return stateMap[city] || 'CA';
}

// Get the correct image path for a city, with fallback support
function getCityImagePath(city: string): string {
  // Map of cities to their available image formats
  const cityImageMap: { [key: string]: string[] } = {
    'New York': ['New York.jpg'],
    'Los Angeles': ['Los Angeles.jpg'],
    'San Francisco': ['San Francisco.jpg'],
    'Chicago': ['Chicago.jpg'],
    'Austin': ['Austin.jpg'],
    'Houston': ['Houston.jpg'],
    'Phoenix': ['Phoenix.jpg', 'Phoenix.webp'],
    'Philadelphia': ['Philadelphia.jpg'],
    'San Antonio': ['San Antonio.jpg'],
    'San Diego': ['San Diego.jpg'],
    'Dallas': ['Dallas.jpg'],
    'San Jose': ['San Jose.jpg'],
    'Jacksonville': ['Jacksonville.jpg'],
    'Fort Worth': ['Fort Worth.jpg'],
    'Columbus': ['Columbus.jpeg'],
    'Charlotte': ['Charlotte.jpg'],
    'Indianapolis': ['Indianapolis.jpg'],
    'Seattle': ['Seattle.jpeg'],
    'Denver': ['Denver.jpg'],
    'Washington': ['Washington.jpg']
  };

  const availableImages = cityImageMap[city];
  if (availableImages && availableImages.length > 0) {
    // Return the first available image (primary format)
    return `/${availableImages[0]}`;
  }
  
  // Fallback to San Francisco if no city-specific image is found
  return '/San Francisco.jpg';
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 5) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) { // 24 hours
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return `${diffInDays}d ago`;
  }
}

function ProfileCard({ profile, onAddComment, onDeletePost, isUserPost }: { 
  profile: Profile; 
  onAddComment: (profileId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  onDeletePost: (profileId: string) => void;
  isUserPost: boolean;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      onAddComment(profile.id, {
        text: newComment.trim(),
        author: commentAuthor.trim()
      });
      setNewComment('');
      setCommentAuthor('');
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
      <div className="h-[38px] relative shrink-0 w-[100px] flex items-center justify-center">
        <div className="h-[38px] w-[100px] flex items-center justify-center">
          <div className="flex flex-col font-nyt justify-center items-center leading-[0] not-italic text-[#252424] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">{profile.name},{profile.age}</p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-[#000000] border-solid inset-0 pointer-events-none"
        />
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
        <div className="flex flex-col font-futura-condensed-extra-bold font-futura-fallback justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[16px] text-left w-full">
          <p className="block leading-[normal]">{profile.title}</p>
        </div>
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 321 1"
            >
              <line
                id="Line 3"
                stroke="var(--stroke-0, black)"
                x2="321"
                y1="0.5"
                y2="0.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-nyt justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[16px] text-left w-full">
          <p className="block leading-[normal]">{profile.description}</p>
        </div>
        
        {/* Timestamp */}
        <div className="flex flex-col font-nyt justify-end leading-[0] not-italic relative shrink-0 text-[#6b6969] text-[12px] text-left w-full mt-2">
          <p className="block leading-[normal]">{formatTimestamp(profile.createdAt)}</p>
        </div>
        
        {/* Interest tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {profile.interests.map((interest, index) => (
            <Badge key={index} variant="outline" className="text-xs font-nyt">
              {interest}
            </Badge>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant="newspaper"
            onClick={() => {}}
            className="text-xs"
          >
            <Heart className="w-3 h-3" />
            Like
          </Button>
          <Button
            size="sm"
            variant="newspaper"
            onClick={() => setShowComments(!showComments)}
            className="text-xs"
          >
            <MessageCircle className="w-3 h-3" />
            {profile.comments.length} Comments
          </Button>
          {isUserPost && (
            <Button
              size="sm"
              variant="newspaper"
              onClick={() => onDeletePost(profile.id)}
              className="text-xs"
            >
              🗑️ Delete
            </Button>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="font-nyt font-bold text-sm mb-3">Comments</h4>
            
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-4">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm font-nyt"
                  required
                />
                <textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm font-nyt h-20 resize-none"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="newspaper"
                  className="text-xs self-start"
                >
                  Post Comment
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {profile.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-nyt font-bold text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500 font-nyt">
                      {formatTimestamp(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm font-nyt">{comment.text}</p>
                </div>
              ))}
              {profile.comments.length === 0 && (
                <p className="text-sm text-gray-500 font-nyt italic">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}
        
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 321 1"
            >
              <line
                id="Line 3"
                stroke="var(--stroke-0, black)"
                x2="321"
                y1="0.5"
                y2="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCardWithImage({ profile, onAddComment, onDeletePost, isUserPost, currentCity }: { 
  profile: Profile; 
  onAddComment: (profileId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  onDeletePost: (profileId: string) => void;
  isUserPost: boolean;
  currentCity: string;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  
  // Debug: Log the image path being used
  console.log(`🖼️ ProfileCardWithImage rendering for city: ${currentCity}`);
  console.log(`🖼️ Image path: ${getCityImagePath(currentCity)}`);
  console.log(`🖼️ Profile location: ${profile.location}`);
  


  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      onAddComment(profile.id, {
        text: newComment.trim(),
        author: commentAuthor.trim()
      });
      setNewComment('');
      setCommentAuthor('');
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[30px] items-start justify-start p-0 relative shrink-0 w-full">
      <div className="h-[284px] relative shrink-0 w-full">
        <div className="h-[284px] overflow-clip relative w-full">
          {profile.image ? (
            <div
              className="absolute bg-center bg-cover bg-no-repeat h-[488px] left-[-14px] mix-blend-luminosity top-[-99px] w-[486px]"
              style={{ backgroundImage: `url('${profile.image}')` }}
            />
          ) : (
                        <div className="absolute flex items-center justify-center h-[284px] left-0 top-0 w-full bg-gray-100">
              
              <img 
                id={`city-image-${currentCity}`}
                src={getCityImagePath(currentCity)}
                alt={`${currentCity} Profile`} 
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 sepia-20 hue-rotate-15 saturate-150"
                style={{ border: '2px solid red' }} // Debug border
                onError={(e) => {
                  console.error(`❌ Image failed to load: ${e.currentTarget.src}`);
                  // Try with different encoding first
                  const encodedCity = encodeURIComponent(currentCity);
                  if (e.currentTarget.src !== `/${encodedCity}.jpg`) {
                    e.currentTarget.src = `/${encodedCity}.jpg`;
                    return;
                  }
                  
                  // Try alternative formats for the city
                  const cityImageMap: { [key: string]: string[] } = {
                    'Phoenix': ['Phoenix.jpg', 'Phoenix.webp'],
                    'Columbus': ['Columbus.jpeg'],
                    'Seattle': ['Seattle.jpeg'],
                    // Add other cities with multiple formats as needed
                  };
                  
                  const alternatives = cityImageMap[currentCity];
                  if (alternatives && alternatives.length > 1) {
                    const currentSrc = e.currentTarget.src;
                    const currentFormat = currentSrc.split('.').pop();
                    const nextFormat = alternatives.find(format => !format.includes(currentFormat || ''));
                    if (nextFormat) {
                      e.currentTarget.src = `/${nextFormat}`;
                      return;
                    }
                  }
                  
                  // Final fallback to San Francisco image
                  e.currentTarget.src = '/San Francisco.jpg';
                }}
                onLoad={() => {
                  // Image loaded successfully
                }}
                onLoadStart={() => {
                  // Image load started
                }}
              />

            </div>
          )}
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-[#000000] border-solid inset-0 pointer-events-none"
        />
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
        <div className="h-[38px] relative shrink-0 w-[100px] flex items-center justify-center">
          <div className="h-[38px] w-[100px] flex items-center justify-center">
            <div className="flex flex-col font-nyt justify-center items-center leading-[0] not-italic text-[#252424] text-[16px] text-center text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{profile.name},{profile.age}</p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute border border-[#000000] border-solid inset-0 pointer-events-none"
          />
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="flex flex-col font-futura-condensed-extra-bold font-futura-fallback justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[16px] text-left w-full">
            <p className="block leading-[normal]">{profile.title}</p>
          </div>
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 436 1"
              >
                <line
                  id="Line 3"
                  stroke="var(--stroke-0, black)"
                  x2="436"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-nyt justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[16px] text-left w-full">
            <p className="block leading-[normal]">{profile.description}</p>
          </div>
          
          {/* Timestamp */}
          <div className="flex flex-col font-nyt justify-end leading-[0] not-italic relative shrink-0 text-[#6b6969] text-[12px] text-left w-full mt-2">
            <p className="block leading-[normal]">{formatTimestamp(profile.createdAt)}</p>
          </div>
          
          {/* Interest tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs font-nyt">
                {interest}
              </Badge>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="newspaper"
              onClick={() => {}}
              className="text-xs"
            >
              <Heart className="w-3 h-3" />
              Like
            </Button>
            <Button
              size="sm"
              variant="newspaper"
              onClick={() => setShowComments(!showComments)}
              className="text-xs"
            >
              <MessageCircle className="w-3 h-3" />
              {profile.comments.length} Comments
            </Button>
            {isUserPost && (
              <Button
                size="sm"
                variant="newspaper"
                onClick={() => onDeletePost(profile.id)}
                className="text-xs"
              >
                🗑️ Delete
              </Button>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="font-nyt font-bold text-sm mb-3">Comments</h4>
            
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm font-nyt w-full"
                  required
                />
                <textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm font-nyt h-20 resize-none w-full"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="newspaper"
                  className="text-xs self-start"
                >
                  Post Comment
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 w-full">
              {profile.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded w-full">
                  <div className="flex justify-between items-start mb-1 w-full">
                    <span className="font-nyt font-bold text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500 font-nyt">
                      {formatTimestamp(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm font-nyt w-full">{comment.text}</p>
                </div>
              ))}
              {profile.comments.length === 0 && (
                <p className="text-sm text-gray-500 font-nyt italic w-full">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}
        
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 436 1"
            >
              <line
                id="Line 3"
                stroke="var(--stroke-0, black)"
                x2="436"
                y1="0.5"
                y2="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewspaperDivider() {
  return (
    <div className="h-1 relative shrink-0 w-full">
      <div className="absolute bottom-0 left-0 right-0 top-[-25%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1184 5"
        >
          <line
            stroke="var(--stroke-0, black)"
            x2="100%"
            y1="0.5"
            y2="0.5"
          />
          <line
            stroke="var(--stroke-0, black)"
            x2="100%"
            y1="4.5"
            y2="4.5"
          />
        </svg>
      </div>
    </div>
  );
}



function DateIdeas({ city }: { city: string }) {
  // Date ideas for different cities
  const cityDateIdeas: { [key: string]: string[] } = {
    'San Francisco': [
      'Walk across Golden Gate Bridge at sunset',
      'Explore Mission District food scene',
      'Visit Alcatraz Island together',
      'Ride cable cars through Nob Hill',
      'Picnic at Golden Gate Park',
      'Explore Fisherman\'s Wharf',
      'Visit Palace of Fine Arts',
      'Walk along Embarcadero',
      'Explore Chinatown together',
      'Visit Coit Tower for city views'
    ],
    'New York': [
      'Walk through Central Park',
      'Visit Times Square at night',
      'Explore Brooklyn Bridge walkway',
      'Visit Metropolitan Museum of Art',
      'Walk High Line park',
      'Explore Greenwich Village',
      'Visit Empire State Building',
      'Walk through SoHo galleries',
      'Visit Brooklyn Botanic Garden',
      'Explore Little Italy together'
    ],
    'Los Angeles': [
      'Walk Venice Beach boardwalk',
      'Visit Griffith Observatory',
      'Explore Santa Monica Pier',
      'Visit Getty Center',
      'Walk through Beverly Hills',
      'Explore Hollywood Walk of Fame',
      'Visit LACMA museum',
      'Walk through Echo Park',
      'Visit Huntington Library',
      'Explore Downtown Arts District'
    ],
    'Chicago': [
      'Walk along Lake Michigan',
      'Visit Millennium Park',
      'Explore Navy Pier',
      'Visit Art Institute of Chicago',
      'Walk Magnificent Mile',
      'Visit Willis Tower Skydeck',
      'Explore Wicker Park',
      'Visit Lincoln Park Zoo',
      'Walk through Riverwalk',
      'Explore Chinatown together'
    ],
    'Miami': [
      'Walk South Beach boardwalk',
      'Visit Vizcaya Museum',
      'Explore Wynwood Arts District',
      'Visit Little Havana',
      'Walk through Coconut Grove',
      'Visit Bayside Marketplace',
      'Explore Design District',
      'Visit Fairchild Tropical Garden',
      'Walk through Coral Gables',
      'Explore Brickell together'
    ]
  };

  const ideas = cityDateIdeas[city] || [
    'Visit local museums together',
    'Explore downtown area',
    'Try local restaurants',
    'Visit city parks',
    'Explore local markets',
    'Walk through historic districts',
    'Visit local landmarks',
    'Try local coffee shops',
    'Explore art galleries',
    'Visit local attractions'
  ];

  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
      <div className="h-[38px] relative shrink-0 w-full flex items-center justify-center">
        <div className="flex flex-col font-futura-condensed-extra-bold font-futura-fallback justify-center items-center leading-[0] not-italic text-[#252424] text-[16px] text-center text-nowrap">
          <p className="block leading-[normal]">Date Ideas in {city}</p>
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-[#000000] border-solid inset-0 pointer-events-none"
        />
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
        <div className="flex flex-col font-nyt justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[14px] text-left w-full">
          <div className="space-y-0">
            {ideas.map((idea, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 py-2">
                  <input 
                    type="checkbox" 
                    disabled
                    readOnly
                    className="w-3 h-3 text-[#6b6969] border border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-default opacity-60"
                  />
                  <p className="block leading-[normal]">{idea}</p>
                </div>
                {index < ideas.length - 1 && (
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 331 1"
                      >
                        <line
                          stroke="var(--stroke-0, black)"
                          strokeDasharray="2,2"
                          x2="100%"
                          y1="0.5"
                          y2="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="h-0 relative shrink-0 w-full mt-3">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 331 1"
            >
              <line
                stroke="var(--stroke-0, black)"
                x2="100%"
                y1="0.5"
                y2="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewspaperHeader({ onCityChange, usCities, onAddPostClick, currentCity }: { onCityChange: (city: string) => void; usCities: string[]; onAddPostClick: () => void; currentCity: string }) {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleCityChange = (city: string) => {
    onCityChange(city);
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-start p-0 relative shrink-0 w-full">
      <div className="relative w-full px-4">
        <div className="flex flex-col font-engravers justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[32px] lg:text-[40px] text-center tracking-[-1px]">
        <p className="block leading-[normal]">what are you looking for?</p>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex-shrink-0 hidden lg:block">
          <Button
            variant="newspaper"
            onClick={onAddPostClick}
            className="text-sm px-6 py-2"
          >
            + Add New Post
          </Button>
        </div>
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
        <NewspaperDivider />
        <div className="box-border content-stretch flex flex-col lg:flex-row font-nyt items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[14px] lg:text-[16px] text-center text-nowrap w-full gap-2 lg:gap-0">
          <div className="flex flex-col justify-end relative shrink-0">
            <p className="block leading-[normal] text-nowrap whitespace-pre">
              live, love, laugh
            </p>
          </div>
          <div className="flex flex-col justify-end relative shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-nowrap whitespace-pre">
                {currentCity}, {dateString}
              </span>
              <div className="relative ml-1">
                <select
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="font-nyt text-[14px] lg:text-[16px] text-black bg-transparent border-none outline-none cursor-pointer pr-6 w-4"
                >
                  <option value="" disabled selected className="font-nyt text-transparent bg-transparent">
                    
                  </option>
                  {usCities.filter(city => city !== currentCity).map((city) => (
                    <option key={city} value={city} className="font-nyt text-black bg-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end relative shrink-0">
            <p className="block leading-[normal] text-nowrap whitespace-pre">
              VOL. 2
            </p>
          </div>
        </div>
        <NewspaperDivider />
      </div>
    </div>
  );
}

function AddPostForm({ onAddPost, isOpen, setIsOpen, currentCity }: { onAddPost: (profile: Omit<Profile, 'id' | 'createdAt'>) => void; isOpen: boolean; setIsOpen: (open: boolean) => void; currentCity: string }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    title: '',
    location: `${currentCity}, CA`,
    description: '',
    interests: ''
  });

  // Update location when currentCity changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      location: `${currentCity}, CA`
    }));
  }, [currentCity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.title && formData.description) {
      const newProfile: Omit<Profile, 'id' | 'createdAt'> = {
        name: formData.name,
        age: parseInt(formData.age),
        title: formData.title,
        location: formData.location,
        description: formData.description,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i.length > 0),
        comments: []
      };
      onAddPost(newProfile);
      setFormData({
        name: '',
        age: '',
        title: '',
        location: `${currentCity}, CA`,
        description: '',
        interests: ''
      });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white border-2 border-black shadow-lg">
          <div className="flex justify-between items-center p-6 border-b-2 border-black">
            <h3 className="font-nyt text-xl font-bold">Add New Post</h3>
            <Button
              variant="newspaper"
              onClick={() => setIsOpen(false)}
              className="text-sm px-3 py-1"
            >
              × Close
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-nyt text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-black font-nyt text-sm"
                  required
                />
              </div>
              <div>
                <label className="block font-nyt text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full p-2 border border-black font-nyt text-sm"
                  min="18"
                  max="100"
                  required
                />
              </div>
            </div>
            
            <div>
                          <label className="block font-nyt text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-black font-nyt text-sm"
                required
              />
            </div>
            
            <div>
                          <label className="block font-nyt text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border border-black font-nyt text-sm h-24"
                required
              />
            </div>
            
            <div>
                          <label className="block font-nyt text-sm font-medium mb-1">Interests (comma-separated)</label>
              <input
                type="text"
                value={formData.interests}
                onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              className="w-full p-2 border border-black font-nyt text-sm"
                placeholder="e.g., Cooking, Science, Travel"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="newspaper"
                className="text-sm px-6 py-2"
              >
                Add Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function VerticalDivider() {
  return (
    <div className="hidden lg:flex h-full items-center justify-center relative shrink-0 w-[1px]">
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-[1px] bg-black"></div>
      </div>
    </div>
  );
}

export default function App() {
  // Load saved city from localStorage or default to New York
  const [currentCity, setCurrentCity] = useState(() => {
    const savedCity = localStorage.getItem('newspaperDatingCurrentCity');
    return savedCity || 'New York';
  });
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  
  // Top 20 US cities - memoized to prevent recreation on every render
  const usCities = useMemo(() => [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'Fort Worth',
    'Columbus',
    'Charlotte',
    'San Francisco',
    'Indianapolis',
    'Seattle',
    'Denver',
    'Washington'
  ], []);
  
  // Generate exactly 5 posts for each city - memoized to prevent regeneration
  const generateAllPosts = useCallback(() => {
    const allPosts: Profile[] = [];
    
    // Generate exactly 5 posts for each city with templates
    Object.keys(cityTemplates).forEach(city => {
      const cityPosts = generateCityPosts(city, 5);
      allPosts.push(...cityPosts);
    });
    
    // Generate exactly 5 posts for remaining cities in the top 20 list
    const remainingCities = usCities.filter(city => !cityTemplates[city as keyof typeof cityTemplates]);
    remainingCities.forEach((city: string) => {
      const cityPosts = generateCityPosts(city, 5);
      allPosts.push(...cityPosts);
    });
    
    // Shuffle posts randomly
    return allPosts.sort(() => Math.random() - 0.5);
  }, [usCities]);

  // Helper function for loading profiles from localStorage (fallback)
  const loadProfilesFromStorage = (): Profile[] | null => {
    try {
      const stored = localStorage.getItem('newspaperDatingProfiles');
      const version = localStorage.getItem('newspaperDatingVersion');
      const currentVersion = '2.0'; // Version for 20 posts per city
      
      if (stored && version === currentVersion) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((profile: any) => ({
          ...profile,
          createdAt: new Date(profile.createdAt),
          comments: profile.comments.map((comment: any) => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        }));
      } else {
        // Clear old data and return null to force regeneration
        localStorage.removeItem('newspaperDatingProfiles');
        localStorage.setItem('newspaperDatingVersion', currentVersion);
        return null;
      }
    } catch (error) {
      console.error('Failed to load profiles from localStorage:', error);
    }
    return null;
  };

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Load profiles from database/localStorage on component mount
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setError(null);
        
        // First try to load from localStorage for faster loading
        const storedProfiles = loadProfilesFromStorage();
        if (storedProfiles && storedProfiles.length > 0) {
          console.log('📱 Loading profiles from localStorage for fast startup...');
          setProfiles(storedProfiles);
          
          // Try to sync with database in background (non-blocking)
          try {
            const dbProfiles = await HybridPostsService.getAllPosts();
            if (dbProfiles.length > 0) {
              console.log('🔄 Syncing with database in background...');
              setProfiles(dbProfiles);
              // Update localStorage with latest data
              localStorage.setItem('newspaperDatingProfiles', JSON.stringify(dbProfiles));
            }
          } catch (dbErr) {
            console.log('⚠️ Database sync failed, using localStorage data:', dbErr);
          }
          return;
        }
        
        // Only generate new profiles if none exist
        console.log('🔄 No existing profiles found, generating new ones...');
        const initialProfiles = generateAllPosts();
        console.log(`🔄 Generated ${initialProfiles.length} profiles`);
        
        // Try to seed database first
        try {
          await HybridPostsService.seedInitialData(initialProfiles);
          console.log('✅ Profiles seeded to database');
        } catch (dbErr) {
          console.log('⚠️ Database seeding failed, using localStorage:', dbErr);
        }
        
        // Set profiles and save to localStorage
        setProfiles(initialProfiles);
        localStorage.setItem('newspaperDatingProfiles', JSON.stringify(initialProfiles));
        localStorage.setItem('newspaperDatingVersion', '2.3'); // New version
        
      } catch (err) {
        console.error('Error loading profiles:', err);
        setError('Failed to load posts. Using local data as fallback.');
        
        // Final fallback
        const fallbackProfiles = generateAllPosts();
        setProfiles(fallbackProfiles);
      }
    };
    
    loadProfiles();
  }, []);

  // Sync function to fetch latest data from database
  const syncWithDatabase = useCallback(async () => {
    try {
      console.log('🔄 Syncing with database...');
      const dbProfiles = await HybridPostsService.getAllPosts();
      if (dbProfiles.length > 0) {
        // Check if we have new data from database
        const currentIds = new Set(profiles.map(p => p.id));
        const newProfiles = dbProfiles.filter(p => !currentIds.has(p.id));
        
        if (newProfiles.length > 0) {
          console.log(`🔄 Found ${newProfiles.length} new profiles from database, updating...`);
          setProfiles(dbProfiles);
          localStorage.setItem('newspaperDatingProfiles', JSON.stringify(dbProfiles));
        } else {
          console.log('🔄 No new profiles found, database is up to date');
        }
      }
    } catch (err) {
      console.log('🔄 Database sync failed:', err);
    }
  }, [profiles]);

  // Real-time Supabase subscriptions for instant cross-device updates
  useEffect(() => {
    if (!shouldUseSupabase()) {
      console.log('⚠️ Supabase not configured - real-time updates disabled');
      return;
    }

    let postsSubscription: any;
    let commentsSubscription: any;

    const setupRealtimeSubscriptions = async () => {
      try {
        const { supabase } = await import('./services/supabase');
        
        // Subscribe to new posts
        postsSubscription = supabase
          .channel('posts_changes')
          .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'posts' },
            async (payload) => {
              console.log('🔄 Real-time post update:', payload);
              
              if (payload.eventType === 'INSERT') {
                // New post added
                const newPost = await HybridPostsService.getPostById(payload.new.id);
                if (newPost) {
                  setProfiles(prev => [...prev, newPost]);
                  console.log('✅ New post added via real-time subscription');
                }
              } else if (payload.eventType === 'DELETE') {
                // Post deleted
                setProfiles(prev => prev.filter(p => p.id !== payload.old.id));
                console.log('✅ Post deleted via real-time subscription');
              }
            }
          )
          .subscribe();

        // Subscribe to new comments
        commentsSubscription = supabase
          .channel('comments_changes')
          .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'comments' },
            async (payload) => {
              console.log('🔄 Real-time comment update:', payload);
              
              if (payload.eventType === 'INSERT') {
                // New comment added
                const newComment = await HybridPostsService.getCommentById(payload.new.id);
                if (newComment) {
                  setProfiles(prev => prev.map(profile => 
                    profile.id === payload.new.post_id 
                      ? { ...profile, comments: [...profile.comments, newComment] }
                      : profile
                  ));
                  console.log('✅ New comment added via real-time subscription');
                }
              }
            }
          )
          .subscribe();

        console.log('✅ Real-time subscriptions established');
      } catch (error) {
        console.error('❌ Failed to setup real-time subscriptions:', error);
      }
    };

    setupRealtimeSubscriptions();

    // Cleanup subscriptions on unmount
    return () => {
      if (postsSubscription) {
        postsSubscription.unsubscribe();
      }
      if (commentsSubscription) {
        commentsSubscription.unsubscribe();
      }
    };
  }, []);



  const addNewPost = async (newProfile: Omit<Profile, 'id' | 'createdAt'>) => {
    try {
      const newPost = await HybridPostsService.createPost(newProfile);
      setProfiles(prev => [...prev, newPost]);
      
      // Trigger sync to ensure all devices get the latest data
      console.log('🔄 New post created, triggering database sync...');
      setTimeout(() => syncWithDatabase(), 1000); // Small delay to ensure post is fully saved
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
      
      // Fallback to local creation
      const newId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newPost: Profile = {
        ...newProfile,
        id: newId,
        createdAt: new Date()
      };
      setProfiles(prev => [...prev, newPost]);
    }
  };

  const addComment = async (profileId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    try {
      const newComment = await HybridPostsService.addComment(profileId, comment);
      
      setProfiles(prev => prev.map(profile => 
        profile.id === profileId 
          ? { ...profile, comments: [...profile.comments, newComment] }
          : profile
      ));
      
      // Trigger sync to ensure all devices get the latest comment data
      console.log('🔄 New comment added, triggering database sync...');
      setTimeout(() => syncWithDatabase(), 1000); // Small delay to ensure comment is fully saved
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again.');
      
      // Fallback to local comment
      const newComment: Comment = {
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      setProfiles(prev => prev.map(profile => 
        profile.id === profileId 
          ? { ...profile, comments: [...profile.comments, newComment] }
          : profile
      ));
    }
  };

  const deletePost = async (profileId: string) => {
    try {
      await HybridPostsService.deletePost(profileId);
      setProfiles(prev => prev.filter(profile => profile.id !== profileId));
      
      // Trigger sync to ensure all devices get the latest data
      console.log('🔄 Post deleted, triggering database sync...');
      setTimeout(() => syncWithDatabase(), 1000); // Small delay to ensure deletion is fully processed
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post. Please try again.');
      
      // Fallback to local deletion
      setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    }
  };

  const isUserPost = (profileId: string) => {
    return profileId.startsWith('user-');
  };



  // Filter profiles by current city - more robust matching
  const cityProfiles = profiles.filter(profile => {
    const location = profile.location.toLowerCase();
    const city = currentCity.toLowerCase();
    
    // Check various location formats
    return location.startsWith(city + ',') || 
           location.startsWith(city + ' ') ||
           location === city ||
           location.includes(city + ',') ||
           location.includes(city + ' ');
  });
  
  // Split city-specific profiles into columns with time-based hierarchy (latest posts first)
  const totalCityProfiles = cityProfiles.length;
  const leftColumnCount = Math.ceil(totalCityProfiles / 3);
  const centerColumnCount = Math.ceil((totalCityProfiles - leftColumnCount) / 2);
  
  // Sort profiles by creation time (newest first) and distribute across columns
  const sortedCityProfiles = [...cityProfiles].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  const leftColumnProfiles = sortedCityProfiles.slice(0, leftColumnCount);
  const centerColumnProfiles = sortedCityProfiles.slice(leftColumnCount, leftColumnCount + centerColumnCount);
  const rightColumnProfiles = sortedCityProfiles.slice(leftColumnCount + centerColumnCount);
  
  // Debug: Log city filtering
  console.log(`🔍 Current city: "${currentCity}"`);
  console.log(`🔍 Total profiles: ${profiles.length}`);
  console.log(`🔍 City profiles: ${cityProfiles.length}`);
  console.log(`🔍 Sample profile locations:`, profiles.slice(0, 3).map(p => p.location));
  console.log(`🔍 City profile locations:`, cityProfiles.slice(0, 3).map(p => p.location));
  console.log(`🔍 Center column profiles: ${centerColumnProfiles.length}`);
  console.log(`🔍 Left column profiles: ${leftColumnProfiles.length}`);
  console.log(`🔍 Right column profiles: ${rightColumnProfiles.length}`);
  
  // Debug: Show location matching details
  if (profiles.length > 0) {
    console.log(`🔍 Location matching debug:`);
    profiles.slice(0, 5).forEach((profile, index) => {
      const location = profile.location.toLowerCase();
      const city = currentCity.toLowerCase();
      const matches = location.startsWith(city + ',') || 
                     location.startsWith(city + ' ') ||
                     location === city ||
                     location.includes(city + ',') ||
                     location.includes(city + ' ');
      console.log(`  Profile ${index + 1}: "${profile.location}" -> matches "${currentCity}": ${matches}`);
    });
  }

  return (
    <div className="bg-[#F5F5F0] min-h-screen w-full">
      <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-col gap-[33px] items-center justify-start w-full max-w-[1184px]">
          <NewspaperHeader 
            onCityChange={(city) => {
              setCurrentCity(city);
              // Save current city to localStorage for persistence
              localStorage.setItem('newspaperDatingCurrentCity', city);
            }} 
            usCities={usCities}
            onAddPostClick={() => setIsAddPostOpen(true)}
            currentCity={currentCity}
          />
          
          <AddPostForm onAddPost={addNewPost} isOpen={isAddPostOpen} setIsOpen={setIsAddPostOpen} currentCity={currentCity} />
          

          

          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 w-full">
              <p className="font-nyt text-red-800 text-sm">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="font-nyt text-red-600 text-xs underline mt-1"
              >
                Dismiss
              </button>
            </div>
          )}


          
          {/* Mobile Layout - Single Column Sequence */}
          <div className="flex flex-col gap-6 w-full lg:hidden">
            {/* Add Post Button - Mobile Only - Above the post */}
            <div className="flex justify-center">
              <Button
                variant="newspaper"
                onClick={() => setIsAddPostOpen(true)}
                className="text-sm px-6 py-2"
              >
                + Add New Post
              </Button>
            </div>
            
            {/* Featured Image Post (First post with image) */}
            {centerColumnProfiles.length > 0 && (
              <ProfileCardWithImage 
                key={`${centerColumnProfiles[0].id}-${currentCity}`} 
                profile={centerColumnProfiles[0]} 
                onAddComment={addComment}
                onDeletePost={deletePost}
                isUserPost={isUserPost(centerColumnProfiles[0].id)}
                currentCity={currentCity}
              />
            )}
            
            {/* Date Ideas Component */}
            <DateIdeas city={currentCity} />
            
            {/* All Posts (including the first one) */}
            {sortedCityProfiles.map((profile) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onAddComment={addComment}
                onDeletePost={deletePost}
                isUserPost={isUserPost(profile.id)}
              />
            ))}
          </div>
          
          {/* Desktop Layout - Three Columns */}
          <div className="hidden lg:flex flex-row gap-6 items-stretch justify-start w-full">
            {/* Left Column */}
            <div className="flex flex-col gap-7 items-start justify-start w-full lg:w-[321px]">
              {leftColumnProfiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  onAddComment={addComment}
                  onDeletePost={deletePost}
                  isUserPost={isUserPost(profile.id)}
                />
              ))}
            </div>
            
            <VerticalDivider />
            
            {/* Center Column */}
            <div className="flex flex-col gap-[30px] items-start justify-start w-full lg:w-[436px]">
              {centerColumnProfiles.map((profile, index) => {
                return index === 0 ? (
                  <ProfileCardWithImage 
                    key={`${profile.id}-${currentCity}`} 
                    profile={profile} 
                    onAddComment={addComment}
                    onDeletePost={deletePost}
                    isUserPost={isUserPost(profile.id)}
                    currentCity={currentCity}
                  />
                ) : (
                  <ProfileCard 
                    key={profile.id} 
                    profile={profile} 
                    onAddComment={addComment}
                    onDeletePost={deletePost}
                    isUserPost={isUserPost(profile.id)}
                  />
                );
              })}
            </div>
            
            <VerticalDivider />
            
            {/* Right Column */}
            <div className="flex flex-col gap-[26px] items-start justify-start w-full lg:w-[331px]">
              <DateIdeas city={currentCity} />
              {rightColumnProfiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  onAddComment={addComment}
                  onDeletePost={deletePost}
                  isUserPost={isUserPost(profile.id)}
                />
              ))}
            </div>
          </div>
          

          

          
        </div>
      </div>
    </div>
  );
}