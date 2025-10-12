# MovieVillage 🎬

A modern, responsive movie search application built with React that allows users to discover and explore movies using the OMDB API.

## ✨ Features

- **Real-time Search**: Debounced search with 500ms delay for optimal performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive error handling for API failures and network issues
- **Loading States**: Visual feedback during search operations
- **Accessibility**: Full ARIA support and keyboard navigation
- **Image Fallbacks**: Graceful handling of missing movie posters
- **Modern UI**: Beautiful dark theme with smooth animations and hover effects

## 🚀 Recent Improvements

This codebase has been significantly improved with the following enhancements:

### Security & Dependencies
- ✅ Fixed 46 security vulnerabilities using `npm audit fix`
- ✅ Updated to React 18 with modern `createRoot` API
- ✅ Moved API key to environment variables

### Code Quality
- ✅ Added comprehensive error handling for API calls
- ✅ Implemented proper loading states with user feedback
- ✅ Added debounced search to reduce API calls
- ✅ Fixed missing key props in mapped components
- ✅ Standardized file extensions (.jsx for React components)
- ✅ Added proper TypeScript-style prop destructuring

### Accessibility (WCAG 2.1 Compliant)
- ✅ Added ARIA labels and roles for screen readers
- ✅ Implemented keyboard navigation support
- ✅ Added semantic HTML structure with proper headings
- ✅ Included live regions for dynamic content updates
- ✅ Enhanced focus management and visual indicators

### User Experience
- ✅ Added search form with proper submit handling
- ✅ Implemented image loading states and error handling
- ✅ Enhanced empty states with helpful messaging
- ✅ Added visual feedback for disabled states
- ✅ Improved responsive design for all screen sizes

### SEO & Performance
- ✅ Updated HTML title and meta descriptions
- ✅ Added proper meta tags for social sharing
- ✅ Optimized images with object-fit for better loading
- ✅ Implemented efficient re-rendering with useCallback

### Testing
- ✅ Added comprehensive unit tests for components
- ✅ Included accessibility testing
- ✅ Added error scenario testing
- ✅ Implemented loading state testing

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## 🔧 Environment Setup

1. Create a `.env` file in the root directory
2. Add your OMDB API key:
   ```
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```
3. Get your free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)

## 📱 Responsive Breakpoints

- **Desktop**: > 600px
- **Tablet**: 400px - 600px  
- **Mobile**: < 400px

## 🎨 Design System

### Colors
- **Background**: `#212426`
- **Primary Text**: `#f9d3b4`
- **Secondary Text**: `#a1a1a1`
- **Cards**: `#343739`
- **Search**: `#1f2123`
- **Error**: `#ff6b6b`

### Typography
- **Headings**: Roboto Slab
- **Body Text**: Raleway

## 🧪 Testing

The application includes comprehensive tests covering:
- Component rendering
- User interactions
- Error handling
- Accessibility features
- Loading states

Run tests with: `npm test`

## 🚀 Deployment

The app is ready for deployment. Build with `npm run build` and deploy the `build` folder to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
