-- Populate database with 5 posts for each city
-- This script will add 100 total posts (20 cities × 5 posts each)

-- Clear existing posts first (optional - comment out if you want to keep existing data)
-- DELETE FROM comments; -- Delete comments first due to foreign key constraint
-- DELETE FROM posts;

-- Insert 5 posts for New York
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Alex', 28, 'Seeking Coffee & Conversation in the City', 'New York, NY', 'NYC transplant looking for someone to explore hidden coffee shops and rooftop bars with. Love discovering new neighborhoods and sharing stories over craft cocktails.', ARRAY['Coffee', 'Art', 'Live Music'], 12),
('Jordan', 32, 'Brooklyn Artist Looking for Inspiration', 'New York, NY', 'Brooklyn-based painter seeking someone who appreciates art, live music, and late-night conversations about life, love, and everything in between.', ARRAY['Painting', 'Jazz', 'Brooklyn'], 8),
('Sam', 29, 'Wall Street Professional Seeking Balance', 'New York, NY', 'Finance professional by day, jazz enthusiast by night. Looking for someone to share weekend adventures and weekday decompression sessions.', ARRAY['Finance', 'Jazz', 'Weekend Adventures'], 15),
('Taylor', 31, 'Queens Foodie Wants Dining Partner', 'New York, NY', 'Queens native passionate about authentic cuisine from every culture. Want to find someone to explore the city''s diverse food scene with.', ARRAY['Food', 'Culture', 'Queens'], 11),
('Casey', 27, 'Manhattan Creative Seeks Muse', 'New York, NY', 'Creative director seeking someone who values both ambition and authenticity. Let''s build something beautiful together in this crazy city.', ARRAY['Creativity', 'Ambition', 'Authenticity'], 9);

-- Insert 5 posts for Los Angeles
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Blake', 30, 'Venice Beach Creative Seeking Sunshine Partner', 'Los Angeles, CA', 'Venice Beach local who believes in the power of sunshine, creativity, and authentic connections. Let''s build sandcastles and dreams together.', ARRAY['Beach', 'Creativity', 'Sunshine'], 18),
('Skyler', 33, 'Hollywood Dreamer Wants Real Connection', 'Los Angeles, CA', 'Hollywood isn''t just about fame—it''s about finding someone real in a world of make-believe. Looking for genuine connection and shared adventures.', ARRAY['Hollywood', 'Authenticity', 'Adventure'], 14),
('Avery', 29, 'Silver Lake Musician Looking for Harmony', 'Los Angeles, CA', 'Silver Lake musician seeking someone to harmonize with in life. Whether it''s music, conversation, or just being together, let''s create something beautiful.', ARRAY['Music', 'Harmony', 'Silver Lake'], 16),
('Rowan', 31, 'Santa Monica Tech Founder Seeks Balance', 'Los Angeles, CA', 'Tech founder who believes success means nothing without someone to share it with. Looking for balance between ambition and meaningful relationships.', ARRAY['Technology', 'Success', 'Balance'], 13),
('Sage', 28, 'Echo Park Artist Wants to Paint Together', 'Los Angeles, CA', 'Echo Park artist who sees beauty in everything. Want to find someone to paint the canvas of life with, one brushstroke at a time.', ARRAY['Art', 'Beauty', 'Echo Park'], 12);

-- Insert 5 posts for San Francisco
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Riley', 32, 'Mission District Foodie Seeks Culinary Partner', 'San Francisco, CA', 'Mission District resident who believes food is love. Looking for someone to explore the city''s incredible culinary scene with, from food trucks to fine dining.', ARRAY['Food', 'Culinary Arts', 'Mission District'], 17),
('Quinn', 30, 'Marina Tech Professional Wants Work-Life Balance', 'San Francisco, CA', 'Tech professional who''s learned that success isn''t everything. Seeking someone to help maintain work-life balance and share the beauty of the Bay Area.', ARRAY['Technology', 'Work-Life Balance', 'Bay Area'], 15),
('Avery', 29, 'North Beach Poet Looking for Muse', 'San Francisco, CA', 'North Beach poet who finds inspiration in everyday moments. Want to connect with someone who sees the poetry in life and loves deep conversations.', ARRAY['Poetry', 'Inspiration', 'North Beach'], 11),
('Blake', 31, 'Hayes Valley Designer Seeks Creative Connection', 'San Francisco, CA', 'Hayes Valley designer seeking someone who appreciates both creativity and authenticity. Let''s build something beautiful together in this amazing city.', ARRAY['Design', 'Creativity', 'Hayes Valley'], 14),
('Skyler', 33, 'Pacific Heights Professional Wants Authenticity', 'San Francisco, CA', 'Pacific Heights professional who values substance over status. Looking for genuine connection and someone to share the simple pleasures of life with.', ARRAY['Authenticity', 'Simple Pleasures', 'Pacific Heights'], 13);

-- Insert 5 posts for Chicago
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Jordan', 31, 'Wicker Park Artist Seeks Creative Soulmate', 'Chicago, IL', 'Wicker Park artist who believes creativity flows from connection. Looking for someone to inspire and be inspired by in this amazing neighborhood.', ARRAY['Art', 'Creativity', 'Wicker Park'], 16),
('Casey', 29, 'Lincoln Park Professional Wants Weekend Adventures', 'Chicago, IL', 'Lincoln Park professional seeking someone to share weekend adventures with. Love exploring the city''s parks, museums, and hidden gems.', ARRAY['Weekend Adventures', 'Parks', 'Museums'], 12),
('Morgan', 32, 'Lakeview Foodie Looking for Dining Partner', 'Chicago, IL', 'Lakeview resident passionate about Chicago''s incredible food scene. Want to find someone to explore restaurants, breweries, and food festivals with.', ARRAY['Food', 'Restaurants', 'Breweries'], 18),
('Riley', 28, 'West Loop Entrepreneur Seeks Work-Life Harmony', 'Chicago, IL', 'West Loop entrepreneur who believes success is better shared. Looking for someone to help maintain work-life harmony and explore the city together.', ARRAY['Entrepreneurship', 'Work-Life Harmony', 'West Loop'], 14),
('Quinn', 30, 'Gold Coast Professional Wants Authentic Connection', 'Chicago, IL', 'Gold Coast professional who values authenticity over appearances. Seeking genuine connection and someone to share the simple joys of city life with.', ARRAY['Authenticity', 'City Life', 'Gold Coast'], 13);

-- Insert 5 posts for Austin
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Alex', 29, 'East Austin Creative Seeks Inspiration', 'Austin, TX', 'East Austin creative who believes in the power of community and art. Looking for someone to explore the city''s vibrant culture and music scene with.', ARRAY['Art', 'Music', 'Community'], 19),
('Sam', 31, 'South Congress Foodie Wants Culinary Partner', 'Austin, TX', 'South Congress resident passionate about Austin''s incredible food scene. Want to find someone to explore food trucks, restaurants, and farmers markets with.', ARRAY['Food', 'Food Trucks', 'Farmers Markets'], 17),
('Taylor', 28, 'Downtown Tech Professional Seeks Balance', 'Austin, TX', 'Downtown tech professional who loves the city''s laid-back vibe. Looking for someone to help maintain work-life balance and explore Austin''s outdoor spaces.', ARRAY['Technology', 'Work-Life Balance', 'Outdoors'], 15),
('Casey', 30, 'Zilker Park Enthusiast Wants Adventure Partner', 'Austin, TX', 'Zilker Park enthusiast who believes in the healing power of nature. Seeking someone to share outdoor adventures and explore Austin''s green spaces with.', ARRAY['Nature', 'Outdoors', 'Zilker Park'], 16),
('Morgan', 32, 'Barton Springs Local Seeks Authentic Connection', 'Austin, TX', 'Barton Springs local who values authenticity and community. Looking for genuine connection and someone to share Austin''s unique culture with.', ARRAY['Authenticity', 'Community', 'Barton Springs'], 14);

-- Insert 5 posts for Houston
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Jordan', 29, 'Montrose Artist Seeks Creative Soulmate', 'Houston, TX', 'Montrose artist who finds inspiration in Houston''s diverse culture. Looking for someone to explore the city''s art scene and hidden gems with.', ARRAY['Art', 'Culture', 'Montrose'], 15),
('Riley', 31, 'Rice Village Professional Wants Weekend Adventures', 'Houston, TX', 'Rice Village professional seeking someone to share weekend adventures with. Love exploring Houston''s museums, parks, and diverse neighborhoods.', ARRAY['Weekend Adventures', 'Museums', 'Parks'], 13),
('Quinn', 28, 'Heights Foodie Looking for Dining Partner', 'Houston, TX', 'Heights resident passionate about Houston''s incredible food scene. Want to find someone to explore restaurants, food trucks, and international cuisine with.', ARRAY['Food', 'Restaurants', 'International Cuisine'], 18),
('Avery', 30, 'Museum District Enthusiast Seeks Culture Partner', 'Houston, TX', 'Museum District enthusiast who loves learning and discovery. Looking for someone to explore Houston''s cultural institutions and share intellectual conversations with.', ARRAY['Culture', 'Learning', 'Museums'], 16),
('Blake', 32, 'Galleria Professional Wants Authentic Connection', 'Houston, TX', 'Galleria professional who values substance over status. Seeking genuine connection and someone to share Houston''s diverse culture and experiences with.', ARRAY['Authenticity', 'Culture', 'Galleria'], 14);

-- Insert 5 posts for Phoenix
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Skyler', 29, 'Scottsdale Creative Seeks Sunshine Partner', 'Phoenix, AZ', 'Scottsdale creative who believes in the power of sunshine and inspiration. Looking for someone to explore the desert beauty and build dreams together.', ARRAY['Creativity', 'Sunshine', 'Desert'], 17),
('Rowan', 31, 'Downtown Phoenix Professional Wants Adventure', 'Phoenix, AZ', 'Downtown Phoenix professional seeking someone to share adventures with. Love exploring the city''s urban culture and nearby natural wonders.', ARRAY['Adventure', 'Urban Culture', 'Nature'], 15),
('Sage', 28, 'Tempe Foodie Looking for Culinary Partner', 'Phoenix, AZ', 'Tempe resident passionate about Phoenix''s diverse food scene. Want to find someone to explore restaurants, food festivals, and local cuisine with.', ARRAY['Food', 'Restaurants', 'Local Cuisine'], 16),
('River', 30, 'Camelback Mountain Enthusiast Seeks Outdoor Partner', 'Phoenix, AZ', 'Camelback Mountain enthusiast who loves outdoor adventures. Looking for someone to share hiking, biking, and exploring Arizona''s natural beauty with.', ARRAY['Outdoors', 'Hiking', 'Biking'], 18),
('Phoenix', 32, 'Arcadia Local Seeks Authentic Connection', 'Phoenix, AZ', 'Arcadia local who values authenticity and community. Seeking genuine connection and someone to share Phoenix''s unique desert lifestyle with.', ARRAY['Authenticity', 'Community', 'Desert Lifestyle'], 14);

-- Insert 5 posts for Philadelphia
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Ocean', 29, 'Fishtown Artist Seeks Creative Inspiration', 'Philadelphia, PA', 'Fishtown artist who finds beauty in Philadelphia''s industrial charm. Looking for someone to explore the city''s art scene and hidden creative spaces with.', ARRAY['Art', 'Creativity', 'Fishtown'], 15),
('Alex', 31, 'Rittenhouse Professional Wants City Adventures', 'Philadelphia, PA', 'Rittenhouse professional seeking someone to share city adventures with. Love exploring Philadelphia''s historic sites, parks, and vibrant neighborhoods.', ARRAY['City Adventures', 'History', 'Parks'], 16),
('Sam', 28, 'South Philly Foodie Looking for Dining Partner', 'Philadelphia, PA', 'South Philly resident passionate about Philadelphia''s incredible food scene. Want to find someone to explore cheesesteaks, Italian markets, and local favorites with.', ARRAY['Food', 'Cheesesteaks', 'Italian Markets'], 19),
('Taylor', 30, 'University City Enthusiast Seeks Culture Partner', 'Philadelphia, PA', 'University City enthusiast who loves learning and discovery. Looking for someone to explore Philadelphia''s universities, museums, and intellectual community with.', ARRAY['Culture', 'Learning', 'Universities'], 17),
('Casey', 32, 'Old City Local Seeks Authentic Connection', 'Philadelphia, PA', 'Old City local who values Philadelphia''s rich history and authenticity. Seeking genuine connection and someone to share the city''s historic charm with.', ARRAY['Authenticity', 'History', 'Old City'], 15);

-- Insert 5 posts for San Antonio
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Morgan', 29, 'Pearl District Creative Seeks Inspiration', 'San Antonio, TX', 'Pearl District creative who believes in the power of community and art. Looking for someone to explore San Antonio''s vibrant culture and creative scene with.', ARRAY['Art', 'Culture', 'Pearl District'], 16),
('Riley', 31, 'River Walk Professional Wants Adventure Partner', 'San Antonio, TX', 'River Walk professional seeking someone to share adventures with. Love exploring the city''s historic sites, parks, and natural beauty.', ARRAY['Adventure', 'History', 'River Walk'], 17),
('Quinn', 28, 'Alamo Heights Foodie Looking for Culinary Partner', 'San Antonio, TX', 'Alamo Heights resident passionate about San Antonio''s incredible food scene. Want to find someone to explore Tex-Mex, BBQ, and local favorites with.', ARRAY['Food', 'Tex-Mex', 'BBQ'], 18),
('Avery', 30, 'King William Enthusiast Seeks Culture Partner', 'San Antonio, TX', 'King William enthusiast who loves architecture and history. Looking for someone to explore San Antonio''s historic districts and cultural heritage with.', ARRAY['Culture', 'Architecture', 'History'], 16),
('Blake', 32, 'Southtown Local Seeks Authentic Connection', 'San Antonio, TX', 'Southtown local who values authenticity and community. Seeking genuine connection and someone to share San Antonio''s unique culture and experiences with.', ARRAY['Authenticity', 'Community', 'Southtown'], 15);

-- Insert 5 posts for San Diego
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Skyler', 29, 'Pacific Beach Creative Seeks Ocean Partner', 'San Diego, CA', 'Pacific Beach creative who believes in the power of the ocean and inspiration. Looking for someone to explore the beach, surf, and build dreams together.', ARRAY['Creativity', 'Ocean', 'Surfing'], 19),
('Rowan', 31, 'Gaslamp Professional Wants Downtown Adventures', 'San Diego, CA', 'Gaslamp professional seeking someone to share downtown adventures with. Love exploring San Diego''s nightlife, restaurants, and urban culture.', ARRAY['Downtown Adventures', 'Nightlife', 'Restaurants'], 17),
('Sage', 28, 'La Jolla Foodie Looking for Culinary Partner', 'San Diego, CA', 'La Jolla resident passionate about San Diego''s incredible food scene. Want to find someone to explore seafood, fine dining, and local favorites with.', ARRAY['Food', 'Seafood', 'Fine Dining'], 18),
('River', 30, 'Balboa Park Enthusiast Seeks Culture Partner', 'San Diego, CA', 'Balboa Park enthusiast who loves culture and nature. Looking for someone to explore San Diego''s museums, gardens, and outdoor spaces with.', ARRAY['Culture', 'Museums', 'Gardens'], 16),
('Phoenix', 32, 'North Park Local Seeks Authentic Connection', 'San Diego, CA', 'North Park local who values authenticity and community. Seeking genuine connection and someone to share San Diego''s laid-back lifestyle and culture with.', ARRAY['Authenticity', 'Community', 'Laid-back Lifestyle'], 15);

-- Insert 5 posts for Dallas
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Ocean', 29, 'Deep Ellum Artist Seeks Creative Inspiration', 'Dallas, TX', 'Deep Ellum artist who finds inspiration in Dallas''s vibrant music and art scene. Looking for someone to explore the city''s creative spaces and cultural events with.', ARRAY['Art', 'Music', 'Deep Ellum'], 17),
('Alex', 31, 'Uptown Professional Wants City Adventures', 'Dallas, TX', 'Uptown professional seeking someone to share city adventures with. Love exploring Dallas''s shopping, dining, and entertainment districts.', ARRAY['City Adventures', 'Shopping', 'Dining'], 16),
('Sam', 28, 'Bishop Arts Foodie Looking for Culinary Partner', 'Dallas, TX', 'Bishop Arts resident passionate about Dallas''s incredible food scene. Want to find someone to explore local restaurants, food trucks, and artisanal markets with.', ARRAY['Food', 'Local Restaurants', 'Food Trucks'], 18),
('Taylor', 30, 'Oak Cliff Enthusiast Seeks Culture Partner', 'Dallas, TX', 'Oak Cliff enthusiast who loves culture and community. Looking for someone to explore Dallas''s diverse neighborhoods and cultural heritage with.', ARRAY['Culture', 'Community', 'Oak Cliff'], 17),
('Casey', 32, 'Highland Park Local Seeks Authentic Connection', 'Dallas, TX', 'Highland Park local who values authenticity and quality. Seeking genuine connection and someone to share Dallas''s sophisticated culture and experiences with.', ARRAY['Authenticity', 'Quality', 'Highland Park'], 15);

-- Insert 5 posts for San Jose
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Morgan', 29, 'Downtown San Jose Creative Seeks Tech Partner', 'San Jose, CA', 'Downtown San Jose creative who believes in the power of technology and innovation. Looking for someone to explore the city''s tech scene and creative spaces with.', ARRAY['Creativity', 'Technology', 'Innovation'], 18),
('Riley', 31, 'Santana Row Professional Wants Shopping Adventures', 'San Jose, CA', 'Santana Row professional seeking someone to share shopping and dining adventures with. Love exploring San Jose''s upscale retail and restaurant scene.', ARRAY['Shopping Adventures', 'Retail', 'Restaurants'], 16),
('Quinn', 28, 'Willow Glen Foodie Looking for Culinary Partner', 'San Jose, CA', 'Willow Glen resident passionate about San Jose''s diverse food scene. Want to find someone to explore international cuisine, farmers markets, and local favorites with.', ARRAY['Food', 'International Cuisine', 'Farmers Markets'], 17),
('Avery', 30, 'Almaden Valley Enthusiast Seeks Outdoor Partner', 'San Jose, CA', 'Almaden Valley enthusiast who loves nature and outdoor activities. Looking for someone to explore San Jose''s parks, trails, and natural beauty with.', ARRAY['Nature', 'Outdoors', 'Almaden Valley'], 18),
('Blake', 32, 'Campbell Local Seeks Authentic Connection', 'San Jose, CA', 'Campbell local who values authenticity and community. Seeking genuine connection and someone to share San Jose''s suburban charm and culture with.', ARRAY['Authenticity', 'Community', 'Campbell'], 15);

-- Insert 5 posts for Jacksonville
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Skyler', 29, 'Riverside Artist Seeks Creative Inspiration', 'Jacksonville, FL', 'Riverside artist who finds inspiration in Jacksonville''s riverfront beauty. Looking for someone to explore the city''s art scene and natural landscapes with.', ARRAY['Art', 'Creativity', 'Riverside'], 16),
('Rowan', 31, 'San Marco Professional Wants River Adventures', 'Jacksonville, FL', 'San Marco professional seeking someone to share river adventures with. Love exploring Jacksonville''s waterways, parks, and outdoor activities.', ARRAY['River Adventures', 'Waterways', 'Parks'], 17),
('Sage', 28, 'Avondale Foodie Looking for Culinary Partner', 'Jacksonville, FL', 'Avondale resident passionate about Jacksonville''s diverse food scene. Want to find someone to explore seafood, Southern cuisine, and local favorites with.', ARRAY['Food', 'Seafood', 'Southern Cuisine'], 18),
('River', 30, 'Beaches Enthusiast Seeks Ocean Partner', 'Jacksonville, FL', 'Beaches enthusiast who loves the ocean and coastal lifestyle. Looking for someone to explore Jacksonville''s beaches, water sports, and coastal culture with.', ARRAY['Ocean', 'Beaches', 'Water Sports'], 19),
('Phoenix', 32, 'Mandarin Local Seeks Authentic Connection', 'Jacksonville, FL', 'Mandarin local who values authenticity and community. Seeking genuine connection and someone to share Jacksonville''s laid-back Florida lifestyle with.', ARRAY['Authenticity', 'Community', 'Florida Lifestyle'], 15);

-- Insert 5 posts for Fort Worth
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Ocean', 29, 'Stockyards Artist Seeks Western Inspiration', 'Fort Worth, TX', 'Stockyards artist who finds inspiration in Fort Worth''s Western heritage. Looking for someone to explore the city''s cowboy culture and creative scene with.', ARRAY['Art', 'Western Culture', 'Stockyards'], 17),
('Alex', 31, 'Sundance Square Professional Wants Downtown Adventures', 'Fort Worth, TX', 'Sundance Square professional seeking someone to share downtown adventures with. Love exploring Fort Worth''s shopping, dining, and entertainment district.', ARRAY['Downtown Adventures', 'Shopping', 'Dining'], 16),
('Sam', 28, 'West 7th Foodie Looking for Culinary Partner', 'Fort Worth, TX', 'West 7th resident passionate about Fort Worth''s incredible food scene. Want to find someone to explore BBQ, Tex-Mex, and local favorites with.', ARRAY['Food', 'BBQ', 'Tex-Mex'], 18),
('Taylor', 30, 'Cultural District Enthusiast Seeks Culture Partner', 'Fort Worth, TX', 'Cultural District enthusiast who loves art and culture. Looking for someone to explore Fort Worth''s museums, theaters, and cultural events with.', ARRAY['Culture', 'Museums', 'Theaters'], 17),
('Casey', 32, 'TCU Local Seeks Authentic Connection', 'Fort Worth, TX', 'TCU local who values authenticity and community. Seeking genuine connection and someone to share Fort Worth''s college town charm and culture with.', ARRAY['Authenticity', 'Community', 'TCU'], 15);

-- Insert 5 posts for Columbus
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Morgan', 29, 'Short North Artist Seeks Creative Inspiration', 'Columbus, OH', 'Short North artist who finds inspiration in Columbus''s vibrant arts district. Looking for someone to explore the city''s galleries, studios, and creative community with.', ARRAY['Art', 'Creativity', 'Short North'], 17),
('Riley', 31, 'Arena District Professional Wants Entertainment Partner', 'Columbus, OH', 'Arena District professional seeking someone to share entertainment adventures with. Love exploring Columbus''s sports, concerts, and nightlife scene.', ARRAY['Entertainment', 'Sports', 'Nightlife'], 16),
('Quinn', 28, 'German Village Foodie Looking for Culinary Partner', 'Columbus, OH', 'German Village resident passionate about Columbus''s diverse food scene. Want to find someone to explore international cuisine, breweries, and local favorites with.', ARRAY['Food', 'International Cuisine', 'Breweries'], 18),
('Avery', 30, 'OSU Enthusiast Seeks College Town Partner', 'Columbus, OH', 'OSU enthusiast who loves the energy of college life. Looking for someone to explore Columbus''s university culture, sports, and academic community with.', ARRAY['College Life', 'Sports', 'OSU'], 17),
('Blake', 32, 'Clintonville Local Seeks Authentic Connection', 'Columbus, OH', 'Clintonville local who values authenticity and community. Seeking genuine connection and someone to share Columbus''s laid-back neighborhood charm with.', ARRAY['Authenticity', 'Community', 'Clintonville'], 15);

-- Insert 5 posts for Charlotte
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Skyler', 29, 'NoDa Artist Seeks Creative Inspiration', 'Charlotte, NC', 'NoDa artist who finds inspiration in Charlotte''s creative district. Looking for someone to explore the city''s art scene and cultural community with.', ARRAY['Art', 'Creativity', 'NoDa'], 16),
('Rowan', 31, 'Uptown Professional Wants City Adventures', 'Charlotte, NC', 'Uptown professional seeking someone to share city adventures with. Love exploring Charlotte''s downtown culture, shopping, and entertainment scene.', ARRAY['City Adventures', 'Downtown', 'Shopping'], 17),
('Sage', 28, 'South End Foodie Looking for Culinary Partner', 'Charlotte, NC', 'South End resident passionate about Charlotte''s incredible food scene. Want to find someone to explore restaurants, food trucks, and local favorites with.', ARRAY['Food', 'Restaurants', 'Food Trucks'], 18),
('River', 30, 'Plaza Midwood Enthusiast Seeks Culture Partner', 'Charlotte, NC', 'Plaza Midwood enthusiast who loves culture and community. Looking for someone to explore Charlotte''s diverse neighborhoods and cultural heritage with.', ARRAY['Culture', 'Community', 'Plaza Midwood'], 17),
('Phoenix', 32, 'Dilworth Local Seeks Authentic Connection', 'Charlotte, NC', 'Dilworth local who values authenticity and charm. Seeking genuine connection and someone to share Charlotte''s historic neighborhood culture with.', ARRAY['Authenticity', 'Charm', 'Dilworth'], 15);

-- Insert 5 posts for Indianapolis
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Ocean', 29, 'Broad Ripple Artist Seeks Creative Inspiration', 'Indianapolis, IN', 'Broad Ripple artist who finds inspiration in Indianapolis''s artistic community. Looking for someone to explore the city''s galleries, studios, and creative spaces with.', ARRAY['Art', 'Creativity', 'Broad Ripple'], 16),
('Alex', 31, 'Mass Ave Professional Wants Cultural Adventures', 'Indianapolis, IN', 'Mass Ave professional seeking someone to share cultural adventures with. Love exploring Indianapolis''s theaters, galleries, and cultural district.', ARRAY['Cultural Adventures', 'Theaters', 'Galleries'], 17),
('Sam', 28, 'Fountain Square Foodie Looking for Culinary Partner', 'Indianapolis, IN', 'Fountain Square resident passionate about Indianapolis''s diverse food scene. Want to find someone to explore local restaurants, breweries, and food festivals with.', ARRAY['Food', 'Local Restaurants', 'Breweries'], 18),
('Taylor', 30, 'Downtown Enthusiast Seeks City Partner', 'Indianapolis, IN', 'Downtown enthusiast who loves urban culture and energy. Looking for someone to explore Indianapolis''s downtown scene, sports, and entertainment with.', ARRAY['Urban Culture', 'Sports', 'Entertainment'], 17),
('Casey', 32, 'Carmel Local Seeks Authentic Connection', 'Indianapolis, IN', 'Carmel local who values authenticity and community. Seeking genuine connection and someone to share Indianapolis''s suburban charm and culture with.', ARRAY['Authenticity', 'Community', 'Carmel'], 15);

-- Insert 5 posts for Seattle
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Morgan', 29, 'Capitol Hill Artist Seeks Creative Inspiration', 'Seattle, WA', 'Capitol Hill artist who finds inspiration in Seattle''s vibrant arts scene. Looking for someone to explore the city''s galleries, music venues, and creative community with.', ARRAY['Art', 'Creativity', 'Capitol Hill'], 18),
('Riley', 31, 'Fremont Professional Wants Neighborhood Adventures', 'Seattle, WA', 'Fremont professional seeking someone to share neighborhood adventures with. Love exploring Seattle''s quirky culture, parks, and local charm.', ARRAY['Neighborhood Adventures', 'Culture', 'Parks'], 17),
('Quinn', 28, 'Ballard Foodie Looking for Culinary Partner', 'Seattle, WA', 'Ballard resident passionate about Seattle''s incredible food scene. Want to find someone to explore seafood, breweries, and local favorites with.', ARRAY['Food', 'Seafood', 'Breweries'], 19),
('Avery', 30, 'Queen Anne Enthusiast Seeks View Partner', 'Seattle, WA', 'Queen Anne enthusiast who loves Seattle''s stunning views and parks. Looking for someone to explore the city''s scenic overlooks and outdoor spaces with.', ARRAY['Views', 'Parks', 'Queen Anne'], 18),
('Blake', 32, 'Green Lake Local Seeks Authentic Connection', 'Seattle, WA', 'Green Lake local who values authenticity and outdoor lifestyle. Seeking genuine connection and someone to share Seattle''s active culture and natural beauty with.', ARRAY['Authenticity', 'Outdoor Lifestyle', 'Green Lake'], 16);

-- Insert 5 posts for Denver
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Skyler', 29, 'RiNo Artist Seeks Creative Inspiration', 'Denver, CO', 'RiNo artist who finds inspiration in Denver''s creative district. Looking for someone to explore the city''s art scene, breweries, and cultural community with.', ARRAY['Art', 'Creativity', 'RiNo'], 17),
('Rowan', 31, 'LoDo Professional Wants Downtown Adventures', 'Denver, CO', 'LoDo professional seeking someone to share downtown adventures with. Love exploring Denver''s historic district, restaurants, and nightlife scene.', ARRAY['Downtown Adventures', 'History', 'Nightlife'], 16),
('Sage', 28, 'Highland Foodie Looking for Culinary Partner', 'Denver, CO', 'Highland resident passionate about Denver''s diverse food scene. Want to find someone to explore restaurants, food trucks, and local favorites with.', ARRAY['Food', 'Restaurants', 'Food Trucks'], 18),
('River', 30, 'Wash Park Enthusiast Seeks Outdoor Partner', 'Denver, CO', 'Wash Park enthusiast who loves outdoor activities and nature. Looking for someone to explore Denver''s parks, trails, and mountain views with.', ARRAY['Outdoors', 'Parks', 'Mountain Views'], 19),
('Phoenix', 32, 'Cherry Creek Local Seeks Authentic Connection', 'Denver, CO', 'Cherry Creek local who values authenticity and outdoor lifestyle. Seeking genuine connection and someone to share Denver''s active culture and mountain culture with.', ARRAY['Authenticity', 'Outdoor Lifestyle', 'Mountain Culture'], 16);

-- Insert 5 posts for Washington
INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
('Ocean', 29, 'Capitol Hill Artist Seeks Political Inspiration', 'Washington, DC', 'Capitol Hill artist who finds inspiration in Washington''s political energy. Looking for someone to explore the city''s museums, monuments, and cultural scene with.', ARRAY['Art', 'Politics', 'Capitol Hill'], 17),
('Alex', 31, 'Georgetown Professional Wants Historic Adventures', 'Washington, DC', 'Georgetown professional seeking someone to share historic adventures with. Love exploring Washington''s historic district, shopping, and cultural heritage.', ARRAY['Historic Adventures', 'Georgetown', 'Shopping'], 16),
('Sam', 28, 'Adams Morgan Foodie Looking for Culinary Partner', 'Washington, DC', 'Adams Morgan resident passionate about Washington''s diverse food scene. Want to find someone to explore international cuisine, restaurants, and local favorites with.', ARRAY['Food', 'International Cuisine', 'Restaurants'], 18),
('Taylor', 30, 'National Mall Enthusiast Seeks Culture Partner', 'Washington, DC', 'National Mall enthusiast who loves culture and history. Looking for someone to explore Washington''s museums, monuments, and cultural institutions with.', ARRAY['Culture', 'Museums', 'Monuments'], 19),
('Casey', 32, 'Dupont Circle Local Seeks Authentic Connection', 'Washington, DC', 'Dupont Circle local who values authenticity and intellectual community. Seeking genuine connection and someone to share Washington''s sophisticated culture and political scene with.', ARRAY['Authenticity', 'Intellectual Community', 'Dupont Circle'], 17);

-- Show the results
SELECT 
    location,
    COUNT(*) as post_count,
    AVG(age) as avg_age,
    AVG(likes) as avg_likes
FROM posts 
GROUP BY location 
ORDER BY post_count DESC, location;

-- Total post count
SELECT COUNT(*) as total_posts FROM posts;
