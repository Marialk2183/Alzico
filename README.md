# 🧠 Alzico - Alzheimer's Detection App

A comprehensive React Native application for early detection and monitoring of cognitive changes, designed for patients and family members.

## ✨ Features

### 🧪 **Cognitive Tests (13 Standard Tests)**
- **Memory Test** - Short-term memory and recall abilities
- **Attention Test** - Focus and attention span measurement
- **Processing Speed** - Information processing speed evaluation
- **Language Test** - Language skills assessment
- **Visuospatial Test** - Spatial awareness evaluation
- **Executive Function** - Planning and decision-making abilities
- **Word Recognition** - Pattern recognition and memory
- **Orientation** - Time and place awareness
- **Commands** - Following instructions
- **Naming** - Object identification
- **Ideational Praxis** - Object use demonstration
- **Comprehension** - Understanding instructions
- **Delayed Recall** - Long-term memory assessment

### 🎮 **Engaging Activities**
- Daily cognitive challenges
- Progress tracking
- Achievement system
- Interactive test interfaces

### 🆘 **Safety Features**
- **SOS Button** - Emergency help access
- **Help Section** - Comprehensive guidance
- **Emergency Contacts** - Quick access to support

### 🎨 **User Experience**
- Modern, attractive UI/UX design
- Accessible design for elderly users
- Responsive layout for all devices
- Smooth animations and transitions
- Professional yet friendly color theme

## 🚀 **Getting Started**

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alzico
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### **Web Version**
```bash
npm run web
```
The app will open in your browser at `http://localhost:3002`

#### **Android**
```bash
npm run android
```

#### **iOS (macOS only)**
```bash
npm run ios
```

## 📱 **Platform Support**

- ✅ **iOS** - Native iOS app
- ✅ **Android** - Native Android app  
- ✅ **Web** - Progressive web app

## 🏗️ **Project Structure**

```
alzico/
├── navigation/           # Navigation configuration
│   └── AppNavigator.tsx # Main navigation stack
├── screens/             # App screens
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ConsentScreen.tsx
│   ├── MainScreen.tsx
│   ├── TestListScreen.tsx
│   ├── TestInterfaceScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── HelpScreen.tsx
│   └── SOSScreen.tsx
├── components/          # Reusable components
├── services/           # Business logic and API calls
├── utils/             # Helper functions
├── assets/            # Images, fonts, etc.
└── public/            # Web-specific files
    └── index.html     # Web app entry point
```

## 🧪 **Cognitive Test Implementation**

### Test Types
1. **Memory Tests**
   - Word recall exercises
   - Pattern recognition
   - Delayed recall tasks

2. **Attention Tests**
   - Focus exercises
   - Distraction filtering
   - Sustained attention tasks

3. **Processing Speed Tests**
   - Reaction time measurement
   - Information processing tasks
   - Visual scanning exercises

### Scoring System
- **0-40%** - Poor performance
- **40-60%** - Fair performance  
- **60-80%** - Good performance
- **80-100%** - Excellent performance

## 🔧 **Configuration**

### Environment Variables
Create a `.env` file in the root directory:
```env
API_URL=your_api_endpoint
ENVIRONMENT=development
```

### Webpack Configuration
The web version uses a custom webpack configuration for optimal performance and compatibility.

## 📊 **Data Management**

### Local Storage
- Test results are stored locally using AsyncStorage
- User preferences and progress are maintained
- Offline functionality for core features

### Data Export
- Results can be exported as PDF reports
- Sharing capabilities with healthcare professionals
- Data backup and synchronization

## 🎯 **Target Users**

- **Patients** - Individuals experiencing cognitive changes
- **Family Members** - Caregivers and family support
- **Healthcare Professionals** - Doctors and therapists
- **Researchers** - Clinical study participants

## 🔒 **Privacy & Security**

- **HIPAA Compliant** - Patient data protection
- **Local Storage** - Data stays on device
- **Encrypted Communication** - Secure API calls
- **User Consent** - Explicit permission required

## 🚨 **Emergency Features**

### SOS Button
- Quick access to emergency contacts
- Direct dialing to emergency services
- Location sharing capabilities
- Medical information display

### Help System
- Comprehensive user guides
- Video tutorials
- FAQ sections
- Support contact information

## 🎨 **Design System**

### Color Palette
- **Primary**: #4A90E2 (Blue)
- **Secondary**: #666 (Gray)
- **Success**: #34C759 (Green)
- **Warning**: #FF9500 (Orange)
- **Error**: #FF6B6B (Red)

### Typography
- **Headings**: Bold, large fonts for clarity
- **Body**: Readable, medium-sized text
- **Buttons**: Clear, prominent styling

### Accessibility
- High contrast colors
- Large touch targets
- Voice navigation support
- Screen reader compatibility

## 📈 **Performance Optimization**

- **Lazy Loading** - Components load on demand
- **Image Optimization** - Compressed assets
- **Code Splitting** - Efficient bundle sizes
- **Caching** - Smart data management

## 🧪 **Testing**

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Test Coverage
- Unit tests for components
- Integration tests for navigation
- E2E tests for critical flows
- Accessibility testing

## 🚀 **Deployment**

### Web Deployment
```bash
npm run build
```
Deploy the `dist/` folder to your web hosting service.

### Mobile App Stores
- **iOS**: Build and submit to App Store
- **Android**: Build and submit to Google Play Store

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Email**: support@alzico.com
- **Phone**: 1-800-ALZICO

## 🙏 **Acknowledgments**

- React Native community
- Medical professionals for guidance
- Alzheimer's research organizations
- Patient and family feedback

---

**Made with ❤️ for better cognitive health**
"# Alzico" 
