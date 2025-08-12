import { useState } from 'react';
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

function NewspaperHeader() {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [selectedCity, setSelectedCity] = useState('San Francisco');
  
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
    'Washington',
    'Boston',
    'El Paso',
    'Nashville',
    'Detroit',
    'Oklahoma City',
    'Portland',
    'Las Vegas',
    'Memphis',
    'Louisville',
    'Baltimore',
    'Milwaukee',
    'Albuquerque',
    'Tucson',
    'Fresno',
    'Sacramento',
    'Mesa',
    'Kansas City',
    'Atlanta',
    'Long Beach',
    'Colorado Springs',
    'Raleigh',
    'Miami',
    'Virginia Beach',
    'Omaha',
    'Oakland',
    'Minneapolis',
    'Tampa',
    'Tulsa',
    'Arlington',
    'New Orleans',
    'Wichita',
    'Cleveland',
    'Bakersfield',
    'Aurora',
    'Anaheim',
    'Honolulu',
    'Santa Ana',
    'Corpus Christi',
    'Riverside',
    'Lexington',
    'Stockton',
    'Henderson',
    'Saint Paul',
    'St. Louis',
    'Fort Wayne',
    'Jersey City',
    'Chandler',
    'Madison',
    'Lubbock',
    'Scottsdale',
    'Reno',
    'Buffalo',
    'Gilbert',
    'Glendale',
    'North Las Vegas',
    'Fremont',
    'Boise',
    'Richmond',
    'Winston-Salem',
    'Santa Rosa',
    'Yonkers',
    'Hialeah',
    'Seattle',
    'Spokane',
    'Tacoma',
    'Vancouver',
    'Bellevue',
    'Kent',
    'Everett',
    'Yakima',
    'Renton',
    'Spokane Valley',
    'Federal Way',
    'Bellingham',
    'Kennewick',
    'Auburn',
    'Pasco',
    'Marysville',
    'Lakewood',
    'Redmond',
    'Shoreline',
    'Richland',
    'Kirkland',
    'Burien',
    'Sammamish',
    'Olympia',
    'Lacey',
    'Edmonds',
    'Bremerton',
    'Puyallup',
    'Kenmore',
    'Issaquah',
    'Tumwater',
    'Mount Vernon',
    'Walla Walla',
    'Pullman',
    'Ellensburg',
    'Cheney',
    'Centralia',
    'Aberdeen',
    'Hoquiam',
    'Port Angeles',
    'Sequim',
    'Port Townsend',
    'Anacortes',
    'Oak Harbor',
    'Coupeville',
    'Langley',
    'Friday Harbor',
    'Eastsound',
    'Lopez Island',
    'Shaw Island',
    'Orcas Island',
    'San Juan Island',
    'Lummi Island',
    'Guemes Island',
    'Camano Island',
    'Whidbey Island',
    'Vashon Island',
    'Bainbridge Island',
    'Mercer Island',
    'Anderson Island',
    'Fox Island',
    'Herron Island',
    'McNeil Island',
    'Blake Island',
    'Maury Island',
    'Vashon-Maury Island',
    'Bainbridge Island',
    'Mercer Island',
    'Anderson Island',
    'Fox Island',
    'Herron Island',
    'McNeil Island',
    'Blake Island',
    'Maury Island',
    'Vashon-Maury Island'
  ];

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
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="font-['NYTImperial:Regular',_sans-serif] text-[14px] lg:text-[16px] text-black bg-transparent border-none outline-none cursor-pointer pr-6 w-4"
                >
                  <option value="" disabled selected className="font-['NYTImperial:Regular',_sans-serif] text-transparent bg-transparent">
                    
                  </option>
                  {usCities.filter(city => city !== selectedCity).map((city) => (
                    <option key={city} value={city} className="font-['NYTImperial:Regular',_sans-serif] text-black bg-white">
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
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Nishant',
      age: 27,
      title: 'Looking for Love and company',
      location: 'San Francisco, CA',
      description: "Looking for someone who shares my passion for culinary adventures and isn't afraid of late-night conversations about molecular gastronomy. Looking for someone who shares my passion for culinary adventures and isn't afraid of late-night conversations about molecular gastronomy. Someone who shares my passion for culinary adventures and isn't afraid of late-night conversations about molecular gastronomy.",
      interests: ['Cooking', 'Science', 'Late-night talks'],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: '2',
      name: 'Sarah',
      age: 29,
      title: 'Seeking Adventure Partner',
      location: 'San Francisco, CA',
      description: "Rock climbing enthusiast seeking someone who loves the outdoors as much as I do. Weekend hikes, camping under the stars, and exploring hidden trails are my idea of perfect dates. Looking for genuine connection with someone who isn't afraid of heights or getting their hands dirty.",
      interests: ['Rock climbing', 'Hiking', 'Camping'],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      id: '3',
      name: 'Marcus',
      age: 31,
      title: 'Coffee Connoisseur & Book Lover',
      location: 'San Francisco, CA',
      description: "Third-wave coffee roaster by day, poetry reader by night. Seeking someone who appreciates the finer things in life - from perfectly extracted espresso to beautifully crafted sentences. Let's discuss Murakami over a cup of single-origin Ethiopian beans.",
      interests: ['Coffee', 'Literature', 'Poetry'],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: '4',
      name: 'Elena',
      age: 26,
      title: 'Artist & Dreamer',
      location: 'San Francisco, CA',
      description: "Painter and gallery curator looking for someone who sees beauty in unexpected places. I spend my weekends at art shows, farmers markets, and trying new restaurants. Seeking a creative soul who loves deep conversations about art, life, and everything in between.",
      interests: ['Art', 'Painting', 'Museums'],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: '5',
      name: 'David',
      age: 33,
      title: 'Tech Founder & Jazz Enthusiast',
      location: 'San Francisco, CA',
      description: "Building the future by day, losing myself in jazz clubs by night. Looking for someone who appreciates both innovation and timeless music. Whether it's discussing startup ideas or debating the best Miles Davis album, I'm here for meaningful conversations.",
      interests: ['Technology', 'Jazz', 'Innovation'],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: '6',
      name: 'Zoe',
      age: 28,
      title: 'Yoga Instructor & World Traveler',
      location: 'San Francisco, CA',
      description: "Just returned from a month in Bali and ready to share stories and create new ones. Yoga teacher seeking someone who values mindfulness, adventure, and authentic connections. Let's practice presence together, whether in warrior pose or exploring new neighborhoods.",
      interests: ['Yoga', 'Travel', 'Mindfulness'],
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
    },
    {
      id: '7',
      name: 'Oliver',
      age: 30,
      title: 'Chef & Sustainability Advocate',
      location: 'San Francisco, CA',
      description: "Farm-to-table chef passionate about sustainable living and creating memorable dining experiences. Looking for someone who cares about where their food comes from and isn't afraid to get their hands dirty in a garden. Let's cook together and change the world, one meal at a time.",
      interests: ['Sustainable cooking', 'Gardening', 'Environment'],
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
    }
  ]);

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
          <NewspaperHeader />
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