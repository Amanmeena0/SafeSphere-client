# SafeSphere: Public Safety Reimagined

SafeSphere is a comprehensive digital platform dedicated to crime awareness, reporting, and emergency support. Built for security, transparency, and rapid response, it empowers citizens with real-time data and accessible safety tools.

## 🚀 Key Features

- **Intelligence Dashboard**: Real-time visualization of crime clusters and statistical analytics across regions.
- **Online E-FIR System**: Secure and confidential reporting for theft, cybercrime, missing persons, and more.
- **Emergency SOS Services**: GPS-enabled emergency signal transmission to response teams.
- **Real-time Awareness**: Interactive maps showing safety alerts and crime patterns in neighborhoods.
- **AI-Powered Guidance**: Intelligent chatbot for immediate safety protocols and legal guidance.
- **Secure Profile Management**: Personal reporting history and status tracking powered by Clerk.

## 🛠 Technology Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) (Functional Components, Hooks, Suspense)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **State Management**: React Hooks & Context API
- **Routing**: [React Router 7](https://reactrouter.com/)

### Services & Integration
- **Authentication**: [Clerk](https://clerk.com/)
- **Maps & Geolocation**: [Mapbox GL](https://www.mapbox.com/) & [Leaflet](https://leafletjs.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **API Client**: [Axios](https://axios-http.com/) with JWT interceptors

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI primitives and layouts
│   ├── layout/          # Main application shell
│   ├── pages/           # Feature-based page components
│   │   ├── sos_components/      # Emergency services logic
│   │   ├── FIRS_Component/     # FIR reporting modules
│   │   └── Statics_components/ # Analytics & Dashboards
│   └── ui/              # Atomic Radix-based components
├── hooks/               # Custom React hooks (auth, location, etc.)
├── lib/                 # Shared utilities and API configuration
└── App.jsx              # Main routing and provider setup
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/safe-sphere.git
   cd safe-sphere/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_backend_url
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🛡 Security & Quality

- **Production-Grade Auth**: Managed identity via Clerk.
- **Performance**: Automated code splitting and lazy loading for faster TTFB.
- **Responsive**: Mobile-first design architecture using Tailwind's grid/flex system.
- **Modern Standards**: ESLint and PostCSS configured for high-quality code.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
