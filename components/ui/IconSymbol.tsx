// Fallback for using MaterialIcons on Android and web.

import { Text, StyleSheet } from 'react-native';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, string>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to unicode symbol mappings here.
 * This provides a simple fallback that works across all platforms.
 */
const MAPPING = {
  'house.fill': '🏠',
  'paperplane.fill': '📤',
  'chevron.left.forwardslash.chevron.right': '⌨️',
  'chevron.right': '▶️',
} as IconMapping;

/**
 * An icon component that uses unicode symbols across all platforms.
 * Icon `name`s are based on SF Symbols and require manual mapping to unicode.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: string;
}) {
  return (
    <Text 
      style={[
        styles.icon,
        { 
          fontSize: size,
          color: color as string,
        },
        style
      ]}
    >
      {MAPPING[name]}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    lineHeight: 24,
  },
});
