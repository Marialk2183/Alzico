# 🚀 Quick Start Guide - Alzico Alzheimer's Detection App

Get your cognitive assessment app running in under 5 minutes!

## ⚡ **Super Quick Start (Web Only)**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the web app:**
   ```bash
   npm run web
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3002`

4. **🎉 You're done!** Start using the app immediately.

## 📱 **Full Platform Setup**

### **Prerequisites Check**
- ✅ Node.js 16+ installed
- ✅ npm or yarn package manager
- ✅ Git (for cloning)

### **Step-by-Step Setup**

#### **1. Clone & Install**
```bash
git clone <your-repo-url>
cd alzico
npm install
```

#### **2. Web Version (Easiest)**
```bash
npm run web
```
- Opens automatically in browser
- No additional setup required
- Works on all operating systems

#### **3. Android Version**
```bash
# Install Android Studio first
# Set ANDROID_HOME environment variable
npm run android
```

#### **4. iOS Version (macOS only)**
```bash
# Install Xcode first
cd ios && pod install && cd ..
npm run ios
```

## 🎯 **What You'll See**

1. **Welcome Screen** - App introduction
2. **Login Screen** - Enter patient information
3. **Consent Screen** - Assessment agreement
4. **Main Dashboard** - Progress tracking
5. **Test Selection** - Choose cognitive tests
6. **Test Interface** - Interactive assessments
7. **Results Display** - Performance feedback

## 🧪 **Available Tests**

- **Memory Test** - Pattern recognition
- **Attention Test** - Focus exercises
- **Processing Speed** - Reaction time
- **Language Test** - Communication skills
- **Visuospatial** - Spatial awareness
- **Executive Function** - Planning abilities

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Port Already in Use**
```bash
# Windows
netstat -ano | findstr :3002
taskkill /F /PID <PID>

# macOS/Linux
lsof -ti:3002 | xargs kill -9
```

#### **Dependencies Issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### **Webpack Issues**
```bash
npm run build
npm run web
```

### **Still Having Problems?**

1. **Check Node.js version:** `node --version` (should be 16+)
2. **Clear npm cache:** `npm cache clean --force`
3. **Restart terminal/command prompt**
4. **Check firewall/antivirus settings**

## 📚 **Next Steps**

- **Customize Tests** - Modify test content in `screens/`
- **Add Features** - Extend functionality in `components/`
- **Style Changes** - Update colors in `constants/Colors.ts`
- **Deploy** - Build for production with `npm run build`

## 🆘 **Need Help?**

- 📖 **Full Documentation:** See `README.md`
- 🐛 **Report Issues:** Create GitHub issue
- 💬 **Community:** Join our Discord/Forum
- 📧 **Direct Support:** support@alzico.com

---

**🎯 Goal: Get you testing cognitive functions in minutes, not hours!**

**Ready to start? Run `npm run web` and begin your cognitive health journey! 🧠✨** 