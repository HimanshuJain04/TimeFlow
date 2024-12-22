import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type RenderProgressBarProps = {
  label: string;
  progress: number;
  remaining: number;
};

export function RenderProgressBar({
  label,
  progress,
  remaining,
}: RenderProgressBarProps) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.box}>
        <Text style={styles.label}> {label} Progress: </Text>
        <Text style={styles.value}>{progress.toFixed(4)}%</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {/* Filled Gradient */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#101422', '#435F6D']}
          style={[styles.filled, {width: `${progress}%`}]}
        />

        {/* Remaining Part */}
        <View style={[styles.remaining, {width: `${100 - progress}%`}]}>
          {Array.from({length: 100 - progress}).map((_, index) => (
            <View key={index} style={styles.stripe} />
          ))}
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Remaining:</Text>
        <Text style={styles.value}>
          {remaining} {label === 'Day' ? 'hours' : 'days'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#93D5E1',
    padding: 8,
    borderRadius: 8,
  },

  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },

  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#576977',
    fontSize: 16,
    alignSelf: 'flex-start',
  },

  value: {
    color: 'black',
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 16,
  },

  progressBar: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    height: 30,
    borderRadius: 50,
    overflow: 'hidden',
  },

  filled: {
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  remaining: {
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'row',
    gap: 6,
  },

  stripe: {
    height: '100%',
    width: 1,
    transform: [{rotate: '45deg'}],
    backgroundColor: 'black',
  },
});
