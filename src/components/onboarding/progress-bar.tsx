import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/** `progress` is between 0 and 1. */
export function ProgressBar({ progress }: { progress: number }) {
  const theme = useTheme();
  const width = `${Math.min(1, Math.max(0, progress)) * 100}%` as const;

  return (
    <View style={[styles.track, { backgroundColor: theme.backgroundSelected }]}>
      <View style={[styles.fill, { width, backgroundColor: theme.primary }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
