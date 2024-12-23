import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import {RenderProgressBar} from './components';

type ProgressState = {
  yearProgress: number;
  monthProgress: number;
  dayProgress: number;
  yearRemaining: number;
  monthRemaining: number;
  dayRemaining: number;
};

export default function App() {
  const [state, setState] = useState<ProgressState>({
    yearProgress: 0,
    monthProgress: 0,
    dayProgress: 0,
    yearRemaining: 0,
    monthRemaining: 0,
    dayRemaining: 0,
  });

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();

      // Year calculations
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);
      const totalYearDays =
        (startOfNextYear.getTime() - startOfYear.getTime()) /
        (1000 * 60 * 60 * 24);
      const daysRemainingInYear =
        totalYearDays -
        (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
      const yearProgress =
        ((now.getTime() - startOfYear.getTime()) /
          (startOfNextYear.getTime() - startOfYear.getTime())) *
        100;

      // Month calculations
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1,
      );
      const totalMonthDays =
        (startOfNextMonth.getTime() - startOfMonth.getTime()) /
        (1000 * 60 * 60 * 24);
      const daysRemainingInMonth =
        totalMonthDays -
        (now.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24);
      const monthProgress =
        ((now.getTime() - startOfMonth.getTime()) /
          (startOfNextMonth.getTime() - startOfMonth.getTime())) *
        100;

      // Day calculations
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const startOfNextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
      const totalDayHours = 24;
      const hoursRemainingInDay =
        totalDayHours -
        (now.getTime() - startOfDay.getTime()) / (1000 * 60 * 60);
      const dayProgress =
        ((now.getTime() - startOfDay.getTime()) /
          (startOfNextDay.getTime() - startOfDay.getTime())) *
        100;

      // Update state
      setState({
        yearProgress,
        monthProgress,
        dayProgress,
        yearRemaining: Math.ceil(daysRemainingInYear),
        monthRemaining: Math.ceil(daysRemainingInMonth),
        dayRemaining: Math.ceil(hoursRemainingInDay),
      });
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* year */}
      <RenderProgressBar
        remaining={state.yearRemaining}
        label="Year"
        progress={state.yearProgress}
      />

      {/* month */}
      <RenderProgressBar
        remaining={state.monthRemaining}
        label="Month"
        progress={state.monthProgress}
      />

      {/* day  */}
      <RenderProgressBar
        remaining={state.dayRemaining}
        label="Day"
        progress={state.dayProgress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'black',
    flexDirection: 'column',
    gap: 40,
  },
});
