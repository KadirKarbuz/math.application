import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  /** 1–5 */
  value: number;
  caption: string;
  color: string;
};

/** Five-segment meter for a 1–5 level. */
export function LevelMeter({ label, value, caption, color }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        <ThemedText type="small" themeColor="textSecondary">
          {label}
        </ThemedText>
        <ThemedText type="smallBold">{caption}</ThemedText>
      </View>
      <View style={styles.segments}>
        {[1, 2, 3, 4, 5].map((n) => {
          const fill = Math.min(1, Math.max(0, value - (n - 1)));
          return (
            <View key={n} style={[styles.segment, { backgroundColor: theme.backgroundSelected }]}>
              <View style={[styles.fill, { width: `${fill * 100}%`, backgroundColor: color }]} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: Spacing.one,
  },
  texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segments: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  segment: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
