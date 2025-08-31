# 🧠 Alzico - Alzheimer's Detection App

A comprehensive mobile application for early detection and assessment of Alzheimer's disease and cognitive impairments through validated cognitive tests.

## 🌟 Features

### 🧪 **Cognitive Testing Suite**
- **13 Validated Cognitive Tests** including MMSE, ADAS-Cog13, CDR, Clock Drawing, Trail Making, and more
- **Multiple Question Types**: Multiple choice, text input, recall, recognition, drawing, timed, and sequence tasks
- **Adaptive Scoring**: Intelligent scoring system based on test type and performance
- **Time Management**: Built-in timers and time-based scoring for performance assessment

### 📊 **Advanced Results & Analytics**
- **Comprehensive Scoring**: Raw scores, percentage scores, and severity assessments
- **Clinical Interpretation**: Evidence-based interpretations with severity levels (Normal, Mild, Moderate, Severe)
- **Personalized Recommendations**: Test-specific recommendations based on results
- **Progress Tracking**: Historical performance analysis and trend identification

### 🔐 **User Management & Security**
- **Authentication System**: Secure login and signup with demo credentials
- **User Profiles**: Personalized user experience and result storage
- **Data Privacy**: Local storage with optional backup/export capabilities

### 📱 **Modern Mobile Interface**
- **Cross-Platform**: React Native app supporting iOS, Android, and Web
- **Responsive Design**: Optimized for various screen sizes and orientations
- **Accessibility**: User-friendly interface designed for elderly users
- **Dark/Light Themes**: Adaptive theming system

## 🚀 Getting Started

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

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your preferred platform**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

### Demo Credentials
- **Email**: `demo@alzico.com`
- **Password**: `password123`

## 🧪 Available Cognitive Tests

### 1. **MMSE (Mini-Mental State Examination)**
- **Category**: Global Cognitive Assessment
- **Duration**: 10 minutes
- **Questions**: 10 orientation questions
- **Scoring**: 0-30 points (higher is better)

### 2. **ADAS-Cog13 (Alzheimer's Disease Assessment Scale)**
- **Category**: Alzheimer's Specific
- **Duration**: 20 minutes
- **Questions**: 13 comprehensive cognitive tasks
- **Scoring**: 0-85 points (lower is better)

### 3. **CDR (Clinical Dementia Rating Scale)**
- **Category**: Dementia Staging
- **Duration**: 15 minutes
- **Questions**: 6 functional domain assessments
- **Scoring**: 0-3 points (higher indicates more severe dementia)

### 4. **Clock Drawing Test**
- **Category**: Visuospatial & Executive
- **Duration**: 5 minutes
- **Questions**: 1 drawing task
- **Scoring**: 0-10 points (higher is better)

### 5. **Trail Making Test**
- **Category**: Attention & Executive
- **Duration**: 8 minutes
- **Questions**: 2 timed connection tasks
- **Scoring**: 0-20 points (higher is better)

### 6. **Verbal Fluency Test (FAS)**
- **Category**: Language & Executive
- **Duration**: 6 minutes
- **Questions**: 3 timed word generation tasks
- **Scoring**: 0-15 points (higher is better)

### 7. **Digit Span Test**
- **Category**: Memory & Attention
- **Duration**: 7 minutes
- **Questions**: 2 sequence recall tasks
- **Scoring**: 0-16 points (higher is better)

### 8. **Boston Naming Test**
- **Category**: Language & Memory
- **Duration**: 8 minutes
- **Questions**: 15 object naming tasks
- **Scoring**: 0-15 points (higher is better)

### 9. **Rey Auditory Verbal Learning Test**
- **Category**: Memory & Learning
- **Duration**: 12 minutes
- **Questions**: 4 word recall trials
- **Scoring**: 0-20 points (higher is better)

### 10. **Stroop Test**
- **Category**: Executive Function
- **Duration**: 8 minutes
- **Questions**: 3 color-word interference tasks
- **Scoring**: 0-15 points (higher is better)

### 11. **Category Fluency Test**
- **Category**: Language & Memory
- **Duration**: 5 minutes
- **Questions**: 1 timed category generation task
- **Scoring**: 0-10 points (higher is better)

### 12. **Block Design Test**
- **Category**: Visuospatial & Construction
- **Duration**: 10 minutes
- **Questions**: 3 geometric pattern copying tasks
- **Scoring**: 0-15 points (higher is better)

### 13. **Logical Memory Test**
- **Category**: Memory & Comprehension
- **Duration**: 8 minutes
- **Questions**: 2 story recall tasks
- **Scoring**: 0-15 points (higher is better)

## 🏗️ Architecture

### **Frontend (React Native)**
- **Screens**: 20+ comprehensive screens for all app functionality
- **Navigation**: Stack-based navigation with proper routing
- **State Management**: React Context for authentication and app state
- **UI Components**: Custom components with consistent theming

### **Backend Services**
- **Test Engine**: Comprehensive test execution and scoring engine
- **Results Management**: Advanced result storage, analysis, and reporting
- **Data Persistence**: AsyncStorage for local data management
- **Export/Import**: JSON and CSV export capabilities

### **Data Models**
- **Cognitive Tests**: Structured test definitions with questions and scoring
- **User Results**: Comprehensive result storage with metadata
- **Scoring Systems**: Evidence-based scoring algorithms
- **Interpretations**: Clinical interpretation guidelines

## 📱 App Screens

### **Authentication & Onboarding**
- Welcome Screen (Login/Signup)
- Consent Screen
- Profile Setup

### **Main Application**
- Home Screen (Dashboard)
- Test List Screen
- Test Interface Screen
- Results Screen
- History Screen
- Profile Screen
- Settings Screen

### **Support & Information**
- Help Screen
- About Screen
- SOS Screen (Emergency Help)

## 🔧 Technical Implementation

### **Core Technologies**
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation management
- **AsyncStorage**: Local data persistence
- **React Native Paper**: Material Design components

### **Key Utilities**
- **Test Engine**: Handles test execution, timing, and scoring
- **Results Manager**: Manages result storage, analysis, and export
- **Cognitive Tests**: Comprehensive test definitions and scoring
- **Authentication**: Secure user management system

### **Performance Features**
- **Lazy Loading**: Efficient test loading and execution
- **Memory Management**: Optimized for elderly device usage
- **Offline Capability**: Full functionality without internet connection
- **Data Compression**: Efficient storage of test results

## 📊 Data & Analytics

### **Result Analysis**
- **Statistical Analysis**: Confidence intervals, anomaly detection
- **Trend Analysis**: Performance tracking over time
- **Comparative Analysis**: Test-specific vs. overall performance
- **Severity Assessment**: Clinical severity level determination

### **Reporting Features**
- **Individual Reports**: Detailed test result reports
- **Progress Tracking**: Historical performance visualization
- **Export Options**: JSON and CSV data export
- **Backup/Restore**: Data backup and restoration capabilities

## 🎯 Use Cases

### **Healthcare Professionals**
- **Screening Tool**: Quick cognitive assessment in clinical settings
- **Progress Monitoring**: Track patient cognitive changes over time
- **Referral Support**: Evidence-based referral recommendations
- **Research Tool**: Data collection for cognitive research studies

### **Individuals & Families**
- **Self-Assessment**: Regular cognitive health monitoring
- **Early Detection**: Identify potential cognitive concerns early
- **Progress Tracking**: Monitor cognitive training effectiveness
- **Healthcare Communication**: Share results with healthcare providers

### **Research & Education**
- **Clinical Studies**: Standardized cognitive assessment tool
- **Training Programs**: Educational tool for healthcare students
- **Population Studies**: Large-scale cognitive health research
- **Validation Studies**: Test validation and reliability research

## 🔒 Security & Privacy

### **Data Protection**
- **Local Storage**: All data stored locally on device
- **No Cloud Sync**: No automatic data transmission
- **User Control**: Full user control over data export/sharing
- **Encryption**: Secure storage of sensitive information

### **Privacy Features**
- **Anonymous Testing**: Optional anonymous test taking
- **Data Export**: User-controlled data sharing
- **Backup Control**: User-managed backup and restore
- **Deletion Rights**: Full user control over data deletion

## 🚀 Deployment

### **Mobile App Stores**
- **iOS App Store**: Available for iPhone and iPad
- **Google Play Store**: Available for Android devices
- **Web Version**: Accessible via web browsers

### **Enterprise Deployment**
- **Healthcare Organizations**: Custom deployment options
- **Research Institutions**: Specialized research versions
- **Government Agencies**: Compliance-ready deployments

## 🤝 Contributing

### **Development Guidelines**
- **Code Style**: Follow TypeScript and React Native best practices
- **Testing**: Comprehensive testing for all cognitive tests
- **Documentation**: Maintain detailed code documentation
- **Accessibility**: Ensure elderly-friendly user experience

### **Areas for Contribution**
- **New Cognitive Tests**: Add validated cognitive assessment tools
- **UI/UX Improvements**: Enhance user experience and accessibility
- **Performance Optimization**: Improve app performance and efficiency
- **Localization**: Add support for multiple languages and cultures

## 📚 Research & Validation

### **Evidence Base**
- **Clinical Validation**: Tests based on peer-reviewed research
- **Population Norms**: Age and education-adjusted scoring
- **Reliability Studies**: Test-retest reliability validation
- **Validity Research**: Concurrent and predictive validity studies

### **Scientific References**
- **MMSE**: Folstein et al. (1975) - Mini-mental state examination
- **ADAS-Cog**: Rosen et al. (1984) - Alzheimer's disease assessment scale
- **CDR**: Morris (1993) - Clinical dementia rating scale
- **Additional Tests**: Comprehensive validation studies for all included tests

## 📞 Support & Contact

### **Technical Support**
- **Documentation**: Comprehensive app documentation
- **User Guides**: Step-by-step usage instructions
- **FAQ**: Common questions and answers
- **Contact**: Direct support contact information

### **Clinical Support**
- **Healthcare Providers**: Professional consultation recommendations
- **Research Support**: Academic and research collaboration
- **Training Programs**: Healthcare professional training
- **Validation Studies**: Ongoing research collaboration opportunities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Research Community**: Cognitive assessment researchers and clinicians
- **Open Source**: React Native and related open source projects
- **Healthcare Professionals**: Clinical validation and feedback
- **Users**: Patient and family feedback and testing

---

**Alzico** - Empowering early detection and monitoring of cognitive health through validated assessment tools.

*Built with ❤️ for better cognitive health outcomes.* 
