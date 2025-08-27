import { Text, StyleSheet } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: string;
}) {
  // Simple unicode mapping for consistency
  const iconMap: Record<string, string> = {
    'house.fill': '🏠',
    'paperplane.fill': '📤',
    'chevron.left.forwardslash.chevron.right': '⌨️',
    'chevron.right': '▶️',
  };

  return (
    <Text
      style={[
        styles.icon,
        {
          fontSize: size,
          color: color,
        },
        style,
      ]}
    >
      {iconMap[name] || '📱'}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    lineHeight: 24,
  },
});
