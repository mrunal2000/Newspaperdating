import React, { useState, useEffect } from 'react';
import { Button } from './components/minimal/button';
import { Badge } from './components/minimal/badge';
import { Heart } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  age: number;
  title: string;
  location: string;
  description: string;
  image?: string;
  interests: string[];
  createdAt: Date;
}

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
    for (let i = 0; i < count; i++) {
      const randomName = fallbackTemplate.names[Math.floor(Math.random() * fallbackTemplate.names.length)];
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
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
      });
    }
    return posts;
  }
  
  const posts: Profile[] = [];
  const template = templates[0]; // Use first template for now
  
  for (let i = 0; i < count; i++) {
    const randomName = template.names[Math.floor(Math.random() * template.names.length)];
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
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
    });
  }
  
  return posts;
}

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

function ProfileCard({ profile }: { 
  profile: Profile; 
}) {
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
        <div className="flex flex-col font-nyt justify-end leading-[0] not-italic relative shrink-0 text-[#6b6969] text-[16px] text-left w-full">
          <p className="block leading-[normal]">{profile.location}</p>
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
      </div>
    </div>
  );
}

function ProfileCardWithImage({ profile }: { 
  profile: Profile; 
}) {
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
                src="/900x0.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
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
            <div className="flex flex-col font-['NYTImperial:Regular',_sans-serif] justify-center items-center leading-[0] not-italic text-[#252424] text-[16px] text-center text-nowrap">
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
          <div className="flex flex-col font-['NYTImperial:Regular',_sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#6b6969] text-[16px] text-left w-full">
            <p className="block leading-[normal]">{profile.location}</p>
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
          <div className="flex flex-col font-['NYTImperial',_sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[16px] text-left w-full">
            <p className="block leading-[normal]">{profile.description}</p>
          </div>
          
          {/* Timestamp */}
          <div className="flex flex-col font-['NYTImperial:Regular',_sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#6b6969] text-[12px] text-left w-full mt-2">
            <p className="block leading-[normal]">{formatTimestamp(profile.createdAt)}</p>
          </div>
          
          {/* Interest tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs font-['NYTImperial:Regular',_sans-serif]">
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
          </div>
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

function NewspaperHeader({ onCityChange, usCities }: { onCityChange: () => void; usCities: string[] }) {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [selectedCity, setSelectedCity] = useState('San Francisco');
  
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    onCityChange();
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-start p-0 relative shrink-0 w-full">
      <div className="flex flex-col font-['NYTImperial',_sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#252424] text-[32px] lg:text-[40px] text-center tracking-[-1px] w-full px-4">
        <p className="block leading-[normal]">what are you looking for?</p>
      </div>
      
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
        <NewspaperDivider />
        <div className="box-border content-stretch flex flex-col lg:flex-row font-['NYTImperial:Regular',_sans-serif] items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[14px] lg:text-[16px] text-center text-nowrap w-full gap-2 lg:gap-0">
          <div className="flex flex-col justify-end relative shrink-0">
            <p className="block leading-[normal] text-nowrap whitespace-pre">
              live, love, laugh
            </p>
          </div>
          <div className="flex flex-col justify-end relative shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-nowrap whitespace-pre">
                {selectedCity}, {dateString}
              </span>
              <div className="relative ml-1">
                <select
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="font-nyt text-[14px] lg:text-[16px] text-black bg-transparent border-none outline-none cursor-pointer pr-6 w-4"
                >
                  <option value="" disabled selected className="font-nyt text-transparent bg-transparent">
                    
                  </option>
                  {usCities.filter(city => city !== selectedCity).map((city) => (
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

function AddPostForm({ onAddPost }: { onAddPost: (profile: Omit<Profile, 'id' | 'createdAt'>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    title: '',
    location: 'San Francisco, CA',
    description: '',
    interests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.title && formData.description) {
      const newProfile: Omit<Profile, 'id' | 'createdAt'> = {
        name: formData.name,
        age: parseInt(formData.age),
        title: formData.title,
        location: formData.location,
        description: formData.description,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i.length > 0)
      };
      onAddPost(newProfile);
      setFormData({
        name: '',
        age: '',
        title: '',
        location: 'San Francisco, CA',
        description: '',
        interests: ''
      });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="w-full flex justify-center mb-6">
        <Button
          variant="newspaper"
          onClick={() => setIsOpen(true)}
          className="text-sm px-6 py-2"
        >
          + Add New Post
        </Button>
      </div>
    );
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
            <h3 className="font-['NYTImperial:Regular',_sans-serif] text-xl font-bold">Add New Post</h3>
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
                <label className="block font-['NYTImperial:Regular',_sans-serif] text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-black font-['NYTImperial:Regular',_sans-serif] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block font-['NYTImperial:Regular',_sans-serif] text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full p-2 border border-black font-['NYTImperial:Regular',_sans-serif] text-sm"
                  min="18"
                  max="100"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block font-['NYTImperial:Regular',_sans-serif] text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border border-black font-['NYTImperial:Regular',_sans-serif] text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block font-['NYTImperial:Regular',_sans-serif] text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-black font-['NYTImperial:Regular',_sans-serif] text-sm h-24"
                required
              />
            </div>
            
            <div>
              <label className="block font-['NYTImperial:Regular',_sans-serif] text-sm font-medium mb-1">Interests (comma-separated)</label>
              <input
                type="text"
                value={formData.interests}
                onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                className="w-full p-2 border border-black font-['NYTImperial:Regular',_sans-serif] text-sm"
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
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Top 20 US cities
  const usCities = [
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
  ];
  
  // Generate random posts for different cities
  const generateAllPosts = () => {
    const allPosts: Profile[] = [];
    
    // Generate random number of posts for each city (3-8 posts per city)
    // Cities with specific templates get 3-8 posts, others get 2-5 posts
    Object.keys(cityTemplates).forEach(city => {
      const postCount = Math.floor(Math.random() * 6) + 3; // 3-8 posts
      const cityPosts = generateCityPosts(city, postCount);
      allPosts.push(...cityPosts);
    });
    
    // Add posts for remaining cities in the top 20 list
    const remainingCities = usCities.filter(city => !cityTemplates[city as keyof typeof cityTemplates]);
    remainingCities.forEach((city: string) => {
      const postCount = Math.floor(Math.random() * 4) + 2; // 2-5 posts
      const cityPosts = generateCityPosts(city, postCount);
      allPosts.push(...cityPosts);
    });
    
    // Shuffle posts randomly
    return allPosts.sort(() => Math.random() - 0.5);
  };

  const [profiles, setProfiles] = useState<Profile[]>(() => generateAllPosts());
  
  // Regenerate posts when refreshKey changes (city change)
  useEffect(() => {
    setProfiles(generateAllPosts());
  }, [refreshKey]);

  const addNewPost = (newProfile: Omit<Profile, 'id' | 'createdAt'>) => {
    const newId = (profiles.length + 1).toString();
    const newPost: Profile = {
      ...newProfile,
      id: newId,
      createdAt: new Date()
    };
    setProfiles(prev => [...prev, newPost]); // Add new post at the end to distribute across columns
  };

  // Split profiles into columns with time-based hierarchy (latest posts first)
  const totalProfiles = profiles.length;
  const leftColumnCount = Math.ceil(totalProfiles / 3);
  const centerColumnCount = Math.ceil((totalProfiles - leftColumnCount) / 2);
  
  // Sort profiles by creation time (newest first) and distribute across columns
  const sortedProfiles = [...profiles].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  const leftColumnProfiles = sortedProfiles.slice(0, leftColumnCount);
  const centerColumnProfiles = sortedProfiles.slice(leftColumnCount, leftColumnCount + centerColumnCount);
  const rightColumnProfiles = sortedProfiles.slice(leftColumnCount + centerColumnCount);

  return (
    <div className="bg-[#fffbfb] min-h-screen w-full">
      <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-col gap-[33px] items-center justify-start w-full max-w-[1184px]">
          <NewspaperHeader onCityChange={() => setRefreshKey(prev => prev + 1)} usCities={usCities} />
          <AddPostForm onAddPost={addNewPost} />
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 items-stretch justify-start w-full">
            {/* Left Column */}
            <div className="flex flex-col gap-7 items-start justify-start w-full lg:w-[321px] mb-8 lg:mb-0">
              {leftColumnProfiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                />
              ))}
            </div>
            
            <VerticalDivider />
            
            {/* Center Column */}
            <div className="flex flex-col gap-[30px] items-start justify-start w-full lg:w-[436px] mb-8 lg:mb-0">
              {centerColumnProfiles.map((profile, index) => 
                index === 0 ? (
                  <ProfileCardWithImage 
                    key={profile.id} 
                    profile={profile} 
                  />
                ) : (
                  <ProfileCard 
                    key={profile.id} 
                    profile={profile} 
                  />
                )
              )}
            </div>
            
            <VerticalDivider />
            
            {/* Right Column */}
            <div className="flex flex-col gap-[26px] items-start justify-start w-full lg:w-[331px]">
              {rightColumnProfiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}