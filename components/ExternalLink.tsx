import { Linking, TouchableOpacity, Text, Platform } from 'react-native';
import { type ComponentProps } from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style, ...rest }: Props) {
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      // Open the link in the device's default browser
      await Linking.openURL(href);
    } else {
      // For web, open in new tab
      window.open(href, '_blank');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style} {...rest}>
      <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
