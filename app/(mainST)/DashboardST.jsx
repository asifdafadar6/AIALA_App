import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import HeroSection from './HeroSection';
import Carousel from './carousal';
import PendingTest1 from './pendingTest/pendingTest1';
import ProgressSection from './progressSection';
import FlashCards from './FlashCards';
import OngoingClass from './OngoingClass';
import Schedule from './Schedule';
import CalenderSection from './calenderSection';
import UpcomingSchedule from './UpcomingSchedule';
import ExamSchedule from './ExamSchedule';
import UpcomingTask from './UpcomingTask';
import LearningPathways from './LearningPathways';
import HourSpent from './HourSpent';
import ToDoContainer from './ToDoContainer';
import Notifications from './Notifications';
import GraphBar from './GraphBar';


export default function DashBoardST() {
  return (
    <ScrollView style={styles.container}>
      <HeroSection />
      <Carousel />
      <GraphBar />
      <PendingTest1 />
      <ProgressSection />
      <FlashCards />
      <OngoingClass />
      <Schedule />
      <CalenderSection />
      <UpcomingSchedule />
      <ExamSchedule />
      <UpcomingTask />
      <LearningPathways />
      <HourSpent />
      <ToDoContainer />
      <Notifications />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
});
