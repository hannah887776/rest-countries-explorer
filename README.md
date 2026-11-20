# REST Countries Explorer

A responsive country explorer built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

Explore countries around the world, search by country name, filter by region, and discover detailed information about each country.

## Features

- Browse countries from around the world.
- Search countries by name.
- Filter countries by region.
- View detailed country information.
- Explore neighboring countries through border links.
- Switch between light and dark themes.
- Remember the selected theme using local storage.
- Responsive layout for desktop and mobile devices.
- Loading skeletons and error handling.

## Built With

- Next.js
- React
- TypeScript
- Tailwind CSS
- REST Countries API

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/hannah887776/rest-countries-explorer.git
```

### 2. Navigate to the project directory

```bash
cd rest-countries-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the API key

Create a file named `.env.local` in the root directory and add your REST Countries API key:

```env
REST_COUNTRIES_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your own API key.

**Important:** Never commit your `.env.local` file or expose your API key publicly.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
rest-countries-explorer/
├── app/
│   ├── api/
│   │   └── countries/
│   ├── components/
│   ├── context/
│   ├── country/
│   ├── types/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .gitignore
├── package.json
└── README.md
```

## API

Country data is provided by the [REST Countries API](https://restcountries.com/).

## Author

GitHub: [@hannah887776](https://github.com/hannah887776)
