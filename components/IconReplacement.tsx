import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Simple unicode icon mapping to replace Expo vector icons
const iconMap: Record<string, string> = {
  // Navigation icons
  'chevron-back': '◀️',
  'chevron-forward': '▶️',
  'arrow-back': '⬅️',
  'arrow-forward': '➡️',
  
  // Common UI icons
  'home': '🏠',
  'person': '👤',
  'settings': '⚙️',
  'info': 'ℹ️',
  'close': '❌',
  'checkmark': '✅',
  'add': '➕',
  'remove': '➖',
  'edit': '✏️',
  'delete': '🗑️',
  'search': '🔍',
  'filter': '🔧',
  'sort': '📊',
  'download': '⬇️',
  'upload': '⬆️',
  'share': '📤',
  'bookmark': '🔖',
  'heart': '❤️',
  'star': '⭐',
  'like': '👍',
  'dislike': '👎',
  
  // Medical/Health icons
  'medical': '🏥',
  'pill': '💊',
  'heart-beat': '💓',
  'thermometer': '🌡️',
  'stethoscope': '🩺',
  
  // Test/Assessment icons
  'clipboard': '📋',
  'document': '📄',
  'chart': '📈',
  'timer': '⏱️',
  'calendar': '📅',
  'clock': '🕐',
  
  // Action icons
  'play': '▶️',
  'pause': '⏸️',
  'stop': '⏹️',
  'refresh': '🔄',
  'reload': '🔄',
  'sync': '🔄',
  'camera': '📷',
  'image': '🖼️',
  'video': '🎥',
  'microphone': '🎤',
  'speaker': '🔊',
  'mute': '🔇',
  
  // Status icons
  'success': '✅',
  'error': '❌',
  'warning': '⚠️',
  'info-circle': 'ℹ️',
  'question': '❓',
  'exclamation': '❗',
  
  // Default fallback
  'default': '📱'
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon = ({ name, size = 24, color = '#000', style }: IconProps) => {
  const icon = iconMap[name] || iconMap['default'];
  
  return (
    <Text 
      style={[
        styles.icon,
        { 
          fontSize: size,
          color: color,
        },
        style
      ]}
    >
      {icon}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Icon; 