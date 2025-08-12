# Newspaper Dating App

A unique dating app with a newspaper aesthetic, featuring city-specific posts and authentic connections.

## Features

- **Newspaper Design**: Classic newspaper layout with authentic typography
- **City-Specific Posts**: Each city has unique, culturally relevant dating profiles
- **Random Post Generation**: Posts are randomly generated with varying numbers per city
- **Responsive Layout**: Works on desktop and mobile devices
- **Add New Posts**: Users can create and submit their own dating profiles

## Random Post Generation

The app automatically generates random dating posts for each city:
- **Cities with templates**: Generate 3-8 random posts each
- **Other cities**: Generate 2-5 random posts each
- **Content variety**: Names, titles, descriptions, and interests are randomly selected from curated templates
- **City switching**: Change cities to see new random posts each time

## Cities with Custom Templates

- **New York**: NYC culture, Brooklyn art, Wall Street professionals
- **Los Angeles**: Venice Beach, Hollywood, Silver Lake music scene
- **San Francisco**: Mission District food, Marina tech, North Beach poetry
- **Chicago**: Wicker Park art, Lincoln Park adventures, Lakeview food scene
- **Austin**: East Austin music, South Congress food, tech professionals
- **Houston**: Montrose art, Rice Village, Heights food scene
- **Phoenix**: Scottsdale creativity, Tempe music, desert culture

## Font Setup

The app uses a hybrid font system for authentic newspaper aesthetics:
- **NYTImperial**: Self-hosted custom font (you provide the files)
- **Futura**: Automatically loaded from Google Fonts
- **Fallbacks**: Times New Roman, Arial Black for missing weights

See `FONTS_SETUP.md` for detailed instructions on adding the required fonts.

## Getting Started

1. Install dependencies: `npm install`
2. Add required fonts to `public/fonts/` directory (see FONTS_SETUP.md)
3. Start development server: `npm start`
4. Build for production: `npm run build`

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- Hybrid font system (self-hosted + Google Fonts)
- Responsive design principles
