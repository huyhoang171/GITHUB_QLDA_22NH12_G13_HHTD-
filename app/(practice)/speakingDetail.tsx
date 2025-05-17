import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const BACKEND_TRANSCRIPTION_URL = 'http://172.20.10.7:5000/transcribe';

interface Dialogue {
  english: string;
  phonetic: string;
  vietnamese: string;
  audio: string;
}

const topicFiles: Record<string, any> = {
  greetings: require('../../assets/json/pronunciation/greetings.json'),
  introductions: require('../../assets/json/pronunciation/introductions.json'),
  'daily-conversations': require('../../assets/json/pronunciation/daily-conversations.json'),
  travel: require('../../assets/json/pronunciation/travel.json'),
  work: require('../../assets/json/pronunciation/work.json'),
};

const audioFiles: Record<string, any> = {
  // Greetings
  'hello_how_are_you.mp3': require('../../assets/audio/greetings/hello_how_are_you.mp3'),
  'good_morning.mp3': require('../../assets/audio/greetings/good_morning.mp3'),
  'good_afternoon.mp3': require('../../assets/audio/greetings/good_afternoon.mp3'),
  'good_evening.mp3': require('../../assets/audio/greetings/good_evening.mp3'),
  'nice_to_meet_you.mp3': require('../../assets/audio/greetings/nice_to_meet_you.mp3'),
  'long_time_no_see.mp3': require('../../assets/audio/greetings/long_time_no_see.mp3'),
  'how_is_it_going.mp3': require('../../assets/audio/greetings/how_is_it_going.mp3'),
  'whats_up.mp3': require('../../assets/audio/greetings/whats_up.mp3'),
  'how_have_you_been.mp3': require('../../assets/audio/greetings/how_have_you_been.mp3'),
  'hey_good_to_see_you.mp3': require('../../assets/audio/greetings/hey_good_to_see_you.mp3'),
  'hi_there.mp3': require('../../assets/audio/greetings/hi_there.mp3'),
  'how_do_you_do.mp3': require('../../assets/audio/greetings/how_do_you_do.mp3'),
  'pleased_to_meet_you.mp3': require('../../assets/audio/greetings/pleased_to_meet_you.mp3'),
  'hows_everything.mp3': require('../../assets/audio/greetings/hows_everything.mp3'),
  'hows_your_family.mp3': require('../../assets/audio/greetings/hows_your_family.mp3'),
  'its_nice_to_see_you_again.mp3': require('../../assets/audio/greetings/its_nice_to_see_you_again.mp3'),
  'welcome.mp3': require('../../assets/audio/greetings/welcome.mp3'),
  'hows_life.mp3': require('../../assets/audio/greetings/hows_life.mp3'),
  'good_to_see_you_again.mp3': require('../../assets/audio/greetings/good_to_see_you_again.mp3'),
  'how_are_things.mp3': require('../../assets/audio/greetings/how_are_things.mp3'),
  'whats_new.mp3': require('../../assets/audio/greetings/whats_new.mp3'),
  'hows_your_day_going.mp3': require('../../assets/audio/greetings/hows_your_day_going.mp3'),
  'hows_work.mp3': require('../../assets/audio/greetings/hows_work.mp3'),
  'hows_school.mp3': require('../../assets/audio/greetings/hows_school.mp3'),
  'hows_your_weekend.mp3': require('../../assets/audio/greetings/hows_your_weekend.mp3'),
  'hows_your_morning.mp3': require('../../assets/audio/greetings/hows_your_morning.mp3'),
  'hows_your_evening.mp3': require('../../assets/audio/greetings/hows_your_evening.mp3'),
  'hows_your_health.mp3': require('../../assets/audio/greetings/hows_your_health.mp3'),
  'hows_your_job.mp3': require('../../assets/audio/greetings/hows_your_job.mp3'),
  'hows_your_study.mp3': require('../../assets/audio/greetings/hows_your_study.mp3'),
  'hows_your_trip.mp3': require('../../assets/audio/greetings/hows_your_trip.mp3'),
  'hows_your_holiday.mp3': require('../../assets/audio/greetings/hows_your_holiday.mp3'),
  'hows_your_family_doing.mp3': require('../../assets/audio/greetings/hows_your_family_doing.mp3'),
  'hows_your_project_going.mp3': require('../../assets/audio/greetings/hows_your_project_going.mp3'),
  'hows_your_friend.mp3': require('../../assets/audio/greetings/hows_your_friend.mp3'),
  'hows_your_boss.mp3': require('../../assets/audio/greetings/hows_your_boss.mp3'),
  'hows_your_teacher.mp3': require('../../assets/audio/greetings/hows_your_teacher.mp3'),
  'hows_your_pet.mp3': require('../../assets/audio/greetings/hows_your_pet.mp3'),
  'hows_your_house.mp3': require('../../assets/audio/greetings/hows_your_house.mp3'),
  'hows_your_car.mp3': require('../../assets/audio/greetings/hows_your_car.mp3'),
  'hows_your_weekend_going.mp3': require('../../assets/audio/greetings/hows_your_weekend_going.mp3'),
  'hows_your_day_so_far.mp3': require('../../assets/audio/greetings/hows_your_day_so_far.mp3'),
  'hows_your_morning_been.mp3': require('../../assets/audio/greetings/hows_your_morning_been.mp3'),
  'hows_your_afternoon.mp3': require('../../assets/audio/greetings/hows_your_afternoon.mp3'),
  'hows_your_night.mp3': require('../../assets/audio/greetings/hows_your_night.mp3'),
  'hows_your_semester.mp3': require('../../assets/audio/greetings/hows_your_semester.mp3'),
  'hows_your_exam.mp3': require('../../assets/audio/greetings/hows_your_exam.mp3'),
  'hows_your_vacation.mp3': require('../../assets/audio/greetings/hows_your_vacation.mp3'),
  'hows_your_weekend_so_far.mp3': require('../../assets/audio/greetings/hows_your_weekend_so_far.mp3'),
  'hows_your_new_job.mp3': require('../../assets/audio/greetings/hows_your_new_job.mp3'),
  'hows_your_new_house.mp3': require('../../assets/audio/greetings/hows_your_new_house.mp3'),
  'hows_your_new_school.mp3': require('../../assets/audio/greetings/hows_your_new_school.mp3'),
  'hows_your_new_friend.mp3': require('../../assets/audio/greetings/hows_your_new_friend.mp3'),
  'hows_your_new_teacher.mp3': require('../../assets/audio/greetings/hows_your_new_teacher.mp3'),
  'hows_your_new_boss.mp3': require('../../assets/audio/greetings/hows_your_new_boss.mp3'),
  'hows_your_new_pet.mp3': require('../../assets/audio/greetings/hows_your_new_pet.mp3'),
  'hows_your_new_car.mp3': require('../../assets/audio/greetings/hows_your_new_car.mp3'),
  // Daily Conversations
  'how_was_your_day.mp3': require('../../assets/audio/daily-conversations/how_was_your_day.mp3'),
  'i_am_going_to_the_market.mp3': require('../../assets/audio/daily-conversations/i_am_going_to_the_market.mp3'),
  'can_you_help_me.mp3': require('../../assets/audio/daily-conversations/can_you_help_me.mp3'),
  'what_time_is_it.mp3': require('../../assets/audio/daily-conversations/what_time_is_it.mp3'),
  'i_am_hungry.mp3': require('../../assets/audio/daily-conversations/i_am_hungry.mp3'),
  'lets_go_for_a_walk.mp3': require('../../assets/audio/daily-conversations/lets_go_for_a_walk.mp3'),
  'i_am_watching_tv.mp3': require('../../assets/audio/daily-conversations/i_am_watching_tv.mp3'),
  'please_wait_a_moment.mp3': require('../../assets/audio/daily-conversations/please_wait_a_moment.mp3'),
  'i_am_tired_today.mp3': require('../../assets/audio/daily-conversations/i_am_tired_today.mp3'),
  'lets_have_lunch.mp3': require('../../assets/audio/daily-conversations/lets_have_lunch.mp3'),
  'did_you_sleep_well.mp3': require('../../assets/audio/daily-conversations/did_you_sleep_well.mp3'),
  'what_are_your_plans_for_today.mp3': require('../../assets/audio/daily-conversations/what_are_your_plans_for_today.mp3'),
  'lets_meet_at_the_coffee_shop.mp3': require('../../assets/audio/daily-conversations/lets_meet_at_the_coffee_shop.mp3'),
  'hows_the_weather_today.mp3': require('../../assets/audio/daily-conversations/hows_the_weather_today.mp3'),
  'do_you_want_some_coffee.mp3': require('../../assets/audio/daily-conversations/do_you_want_some_coffee.mp3'),
  'i_have_a_lot_of_work_to_do.mp3': require('../../assets/audio/daily-conversations/i_have_a_lot_of_work_to_do.mp3'),
  'lets_go_shopping.mp3': require('../../assets/audio/daily-conversations/lets_go_shopping.mp3'),
  'i_am_feeling_great_today.mp3': require('../../assets/audio/daily-conversations/i_am_feeling_great_today.mp3'),
  'can_i_call_you_later.mp3': require('../../assets/audio/daily-conversations/can_i_call_you_later.mp3'),
  'i_am_learning_english.mp3': require('../../assets/audio/daily-conversations/i_am_learning_english.mp3'),
  'whats_your_favorite_food.mp3': require('../../assets/audio/daily-conversations/whats_your_favorite_food.mp3'),
  'i_need_some_rest.mp3': require('../../assets/audio/daily-conversations/i_need_some_rest.mp3'),
  'lets_watch_a_movie.mp3': require('../../assets/audio/daily-conversations/lets_watch_a_movie.mp3'),
  'i_am_going_out_now.mp3': require('../../assets/audio/daily-conversations/i_am_going_out_now.mp3'),
  'do_you_have_any_siblings.mp3': require('../../assets/audio/daily-conversations/do_you_have_any_siblings.mp3'),
  'i_am_not_sure.mp3': require('../../assets/audio/daily-conversations/i_am_not_sure.mp3'),
  'lets_take_a_break.mp3': require('../../assets/audio/daily-conversations/lets_take_a_break.mp3'),
  'i_am_coming.mp3': require('../../assets/audio/daily-conversations/i_am_coming.mp3'),
  'can_you_repeat_that.mp3': require('../../assets/audio/daily-conversations/can_you_repeat_that.mp3'),
  'i_am_sorry_i_am_late.mp3': require('../../assets/audio/daily-conversations/i_am_sorry_i_am_late.mp3'),
  'lets_eat_dinner_together.mp3': require('../../assets/audio/daily-conversations/lets_eat_dinner_together.mp3'),
  'i_am_going_to_bed.mp3': require('../../assets/audio/daily-conversations/i_am_going_to_bed.mp3'),
  'what_do_you_do.mp3': require('../../assets/audio/daily-conversations/what_do_you_do.mp3'),
  'i_am_a_student.mp3': require('../../assets/audio/daily-conversations/i_am_a_student.mp3'),
  'lets_go_to_the_park.mp3': require('../../assets/audio/daily-conversations/lets_go_to_the_park.mp3'),
  'i_am_thirsty.mp3': require('../../assets/audio/daily-conversations/i_am_thirsty.mp3'),
  'can_you_show_me_the_way.mp3': require('../../assets/audio/daily-conversations/can_you_show_me_the_way.mp3'),
  'i_am_just_looking.mp3': require('../../assets/audio/daily-conversations/i_am_just_looking.mp3'),
  'lets_take_a_photo.mp3': require('../../assets/audio/daily-conversations/lets_take_a_photo.mp3'),
  'i_am_not_feeling_well.mp3': require('../../assets/audio/daily-conversations/i_am_not_feeling_well.mp3'),
  'can_you_speak_more_slowly.mp3': require('../../assets/audio/daily-conversations/can_you_speak_more_slowly.mp3'),
  'i_am_happy_to_help.mp3': require('../../assets/audio/daily-conversations/i_am_happy_to_help.mp3'),
  'lets_celebrate.mp3': require('../../assets/audio/daily-conversations/lets_celebrate.mp3'),
  'i_am_on_my_way.mp3': require('../../assets/audio/daily-conversations/i_am_on_my_way.mp3'),
  'can_i_ask_you_something.mp3': require('../../assets/audio/daily-conversations/can_i_ask_you_something.mp3'),
  'i_am_ready.mp3': require('../../assets/audio/daily-conversations/i_am_ready.mp3'),
  'lets_get_started.mp3': require('../../assets/audio/daily-conversations/lets_get_started.mp3'),
  'i_am_looking_forward_to_it.mp3': require('../../assets/audio/daily-conversations/i_am_looking_forward_to_it.mp3'),
  'can_you_give_me_a_hand.mp3': require('../../assets/audio/daily-conversations/can_you_give_me_a_hand.mp3'),
  'i_am_almost_done.mp3': require('../../assets/audio/daily-conversations/i_am_almost_done.mp3'),
  'lets_keep_in_touch.mp3': require('../../assets/audio/daily-conversations/lets_keep_in_touch.mp3'),
  // Introductions
  'my_name_is_anna.mp3': require('../../assets/audio/introductions/my_name_is_anna.mp3'),
  'i_am_from_vietnam.mp3': require('../../assets/audio/introductions/i_am_from_vietnam.mp3'),
  'this_is_my_friend_john.mp3': require('../../assets/audio/introductions/this_is_my_friend_john.mp3'),
  'nice_to_meet_you1.mp3': require('../../assets/audio/introductions/nice_to_meet_you1.mp3'),
  'whats_your_name.mp3': require('../../assets/audio/introductions/whats_your_name.mp3'),
 // 'i_am_a_student.mp3': require('../../assets/audio/introductions/i_am_a_student.mp3'),
  'how_old_are_you.mp3': require('../../assets/audio/introductions/how_old_are_you.mp3'),
  'where_do_you_live.mp3': require('../../assets/audio/introductions/where_do_you_live.mp3'),
  'i_work_as_a_teacher.mp3': require('../../assets/audio/introductions/i_work_as_a_teacher.mp3'),
  'let_me_introduce_myself.mp3': require('../../assets/audio/introductions/let_me_introduce_myself.mp3'),
  // Travel
  'where_is_the_bus_stop.mp3': require('../../assets/audio/travel/where_is_the_bus_stop.mp3'),
  'id_like_to_book_a_room.mp3': require('../../assets/audio/travel/id_like_to_book_a_room.mp3'),
  'how_much_is_the_ticket.mp3': require('../../assets/audio/travel/how_much_is_the_ticket.mp3'),
  'i_am_lost_can_you_help_me.mp3': require('../../assets/audio/travel/i_am_lost_can_you_help_me.mp3'),
  'where_can_i_eat.mp3': require('../../assets/audio/travel/where_can_i_eat.mp3'),
  'is_there_wifi_here.mp3': require('../../assets/audio/travel/is_there_wifi_here.mp3'),
  'can_i_have_the_menu.mp3': require('../../assets/audio/travel/can_i_have_the_menu.mp3'),
  'what_time_does_it_open.mp3': require('../../assets/audio/travel/what_time_does_it_open.mp3'),
  'i_need_a_taxi.mp3': require('../../assets/audio/travel/i_need_a_taxi.mp3'),
  'how_far_is_the_airport.mp3': require('../../assets/audio/travel/how_far_is_the_airport.mp3'),
  'can_you_show_me_the_way_to_the_train_station.mp3': require('../../assets/audio/travel/can_you_show_me_the_way_to_the_train_station.mp3'),
  'is_this_seat_taken.mp3': require('../../assets/audio/travel/is_this_seat_taken.mp3'),
  'how_long_does_the_journey_take.mp3': require('../../assets/audio/travel/how_long_does_the_journey_take.mp3'),
  'can_i_get_a_map_of_the_city.mp3': require('../../assets/audio/travel/can_i_get_a_map_of_the_city.mp3'),
  'what_is_the_best_way_to_get_downtown.mp3': require('../../assets/audio/travel/what_is_the_best_way_to_get_downtown.mp3'),
  'do_you_have_any_recommendations_for_restaurants.mp3': require('../../assets/audio/travel/do_you_have_any_recommendations_for_restaurants.mp3'),
  'can_i_pay_by_credit_card.mp3': require('../../assets/audio/travel/can_i_pay_by_credit_card.mp3'),
  'where_is_the_nearest_atm.mp3': require('../../assets/audio/travel/where_is_the_nearest_atm.mp3'),
  'what_time_is_check_out.mp3': require('../../assets/audio/travel/what_time_is_check_out.mp3'),
  'can_i_have_a_wake_up_call.mp3': require('../../assets/audio/travel/can_i_have_a_wake_up_call.mp3'),
  'is_breakfast_included.mp3': require('../../assets/audio/travel/is_breakfast_included.mp3'),
  'can_i_get_a_late_check_out.mp3': require('../../assets/audio/travel/can_i_get_a_late_check_out.mp3'),
  'where_can_i_rent_a_car.mp3': require('../../assets/audio/travel/where_can_i_rent_a_car.mp3'),
  'is_there_a_pharmacy_nearby.mp3': require('../../assets/audio/travel/is_there_a_pharmacy_nearby.mp3'),
  'can_you_take_a_picture_of_us.mp3': require('../../assets/audio/travel/can_you_take_a_picture_of_us.mp3'),
  'how_do_i_get_to_the_museum.mp3': require('../../assets/audio/travel/how_do_i_get_to_the_museum.mp3'),
  'is_there_a_hospital_nearby.mp3': require('../../assets/audio/travel/is_there_a_hospital_nearby.mp3'),
  'can_i_have_a_non_smoking_room.mp3': require('../../assets/audio/travel/can_i_have_a_non_smoking_room.mp3'),
  'what_is_the_exchange_rate.mp3': require('../../assets/audio/travel/what_is_the_exchange_rate.mp3'),
  'can_i_get_a_receipt_please.mp3': require('../../assets/audio/travel/can_i_get_a_receipt_please.mp3'),
  'where_is_the_tourist_information_center.mp3': require('../../assets/audio/travel/where_is_the_tourist_information_center.mp3'),
  'is_there_a_supermarket_nearby.mp3': require('../../assets/audio/travel/is_there_a_supermarket_nearby.mp3'),
  'can_i_get_a_ticket_to_the_city_center.mp3': require('../../assets/audio/travel/can_i_get_a_ticket_to_the_city_center.mp3'),
  'what_platform_does_the_train_leave_from.mp3': require('../../assets/audio/travel/what_platform_does_the_train_leave_from.mp3'),
  'is_there_a_direct_bus_to_the_airport.mp3': require('../../assets/audio/travel/is_there_a_direct_bus_to_the_airport.mp3'),
  'can_i_have_a_window_seat.mp3': require('../../assets/audio/travel/can_i_have_a_window_seat.mp3'),
  'how_much_is_a_ticket_to_paris.mp3': require('../../assets/audio/travel/how_much_is_a_ticket_to_paris.mp3'),
  'can_you_recommend_a_good_hotel.mp3': require('../../assets/audio/travel/can_you_recommend_a_good_hotel.mp3'),
  'is_there_a_bus_to_the_beach.mp3': require('../../assets/audio/travel/is_there_a_bus_to_the_beach.mp3'),
  'can_i_have_a_glass_of_water.mp3': require('../../assets/audio/travel/can_i_have_a_glass_of_water.mp3'),
  'where_is_the_nearest_police_station.mp3': require('../../assets/audio/travel/where_is_the_nearest_police_station.mp3'),
  'can_i_get_a_sim_card_here.mp3': require('../../assets/audio/travel/can_i_get_a_sim_card_here.mp3'),
  'is_there_a_laundry_service.mp3': require('../../assets/audio/travel/is_there_a_laundry_service.mp3'),
  'can_i_have_the_bill_please.mp3': require('../../assets/audio/travel/can_i_have_the_bill_please.mp3'),
  'what_time_does_the_museum_close.mp3': require('../../assets/audio/travel/what_time_does_the_museum_close.mp3'),
  'is_there_a_public_restroom_nearby.mp3': require('../../assets/audio/travel/is_there_a_public_restroom_nearby.mp3'),
  'can_i_have_a_blanket_please.mp3': require('../../assets/audio/travel/can_i_have_a_blanket_please.mp3'),
  'where_can_i_buy_souvenirs.mp3': require('../../assets/audio/travel/where_can_i_buy_souvenirs.mp3'),
  'how_do_i_get_to_the_city_center.mp3': require('../../assets/audio/travel/how_do_i_get_to_the_city_center.mp3'),
  'is_there_a_currency_exchange_nearby.mp3': require('../../assets/audio/travel/is_there_a_currency_exchange_nearby.mp3'),
  'can_i_have_a_taxi_to_the_airport.mp3': require('../../assets/audio/travel/can_i_have_a_taxi_to_the_airport.mp3'),
  'where_is_the_embassy.mp3': require('../../assets/audio/travel/where_is_the_embassy.mp3'),
  'can_i_get_a_guidebook.mp3': require('../../assets/audio/travel/can_i_get_a_guidebook.mp3'),
  'is_there_a_place_to_store_luggage.mp3': require('../../assets/audio/travel/is_there_a_place_to_store_luggage.mp3'),
  'can_i_have_a_vegetarian_meal.mp3': require('../../assets/audio/travel/can_i_have_a_vegetarian_meal.mp3'),
  'how_do_i_get_to_the_nearest_metro_station.mp3': require('../../assets/audio/travel/how_do_i_get_to_the_nearest_metro_station.mp3'),
  'is_there_a_doctor_available.mp3': require('../../assets/audio/travel/is_there_a_doctor_available.mp3'),
  'can_i_have_a_room_with_a_view.mp3': require('../../assets/audio/travel/can_i_have_a_room_with_a_view.mp3'),
  'where_can_i_buy_a_ticket.mp3': require('../../assets/audio/travel/where_can_i_buy_a_ticket.mp3'),
  'is_there_a_shuttle_bus_to_the_hotel.mp3': require('../../assets/audio/travel/is_there_a_shuttle_bus_to_the_hotel.mp3'),
  // Work
  'i_have_a_meeting_at_10_am.mp3': require('../../assets/audio/work/i_have_a_meeting_at_10_am.mp3'),
  'please_send_me_the_report.mp3': require('../../assets/audio/work/please_send_me_the_report.mp3'),
  'i_am_working_on_a_project.mp3': require('../../assets/audio/work/i_am_working_on_a_project.mp3'),
  'i_need_more_time.mp3': require('../../assets/audio/work/i_need_more_time.mp3'),
 // 'lets_take_a_break.mp3': require('../../assets/audio/work/lets_take_a_break.mp3'),
  'can_we_talk_later.mp3': require('../../assets/audio/work/can_we_talk_later.mp3'),
  'whats_the_deadline.mp3': require('../../assets/audio/work/whats_the_deadline.mp3'),
  'the_client_is_waiting.mp3': require('../../assets/audio/work/the_client_is_waiting.mp3'),
  'ill_finish_it_by_tomorrow.mp3': require('../../assets/audio/work/ill_finish_it_by_tomorrow.mp3'),
  'lets_schedule_a_call.mp3': require('../../assets/audio/work/lets_schedule_a_call.mp3'),
};

export default function SpeakingDetail() {
  const { topicId } = useLocalSearchParams();
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playbackUri, setPlaybackUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<{ text: string; accuracy: number | null } | null>(null);

  // Animation values for buttons
  const buttonScale = useSharedValue(1);
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  useEffect(() => {
    if (!topicId || typeof topicId !== 'string') {
      console.error('Invalid or missing topicId param');
      setIsLoading(false);
      return;
    }

    try {
      const dialoguesData = topicFiles[topicId];
      if (dialoguesData && Array.isArray(dialoguesData)) {
        setDialogues(dialoguesData);
      } else {
        setDialogues([]);
      }
    } catch (error) {
      console.error('Error loading dialogues JSON for topic:', topicId, error);
      setDialogues([]);
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  const startRecording = async () => {
    setPlaybackUri(null);
    setTranscriptionResult(null);
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Microphone access is required!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
      });
      const recordingOptions = Audio.RecordingOptionsPresets.HIGH_QUALITY;
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Recording Error', 'Unable to start recording.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) setPlaybackUri(uri);
      else Alert.alert('Error', 'No recording file found.');
    } catch (err) {
      console.error('Failed to stop recording', err);
    } finally {
      setRecording(null);
    }
  };

  const playRecording = async () => {
    if (!playbackUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: playbackUri }, { shouldPlay: true });
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) await sound.unloadAsync();
      });
    } catch (err) {
      console.error('Failed to play recording', err);
      Alert.alert('Playback Error', 'Unable to play recording.');
    }
  };

  const playAudio = async (audioFileName: string | undefined) => {
    if (!audioFileName) return;
    try {
      const audioResource = audioFiles[audioFileName];
      if (!audioResource) {
        Alert.alert('File Error', `Audio file not found: ${audioFileName}`);
        return;
      }
      const { sound } = await Audio.Sound.createAsync(audioResource, { shouldPlay: true });
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) await sound.unloadAsync();
      });
    } catch (err) {
      console.error('Failed to play reference audio', err);
      Alert.alert('Audio Error', 'Unable to play sample audio.');
    }
  };

  const transcribeWithBackend = async (recordingUri: string): Promise<string> => {
    const fileExtension = recordingUri.split('.').pop()?.toLowerCase();
    if (!fileExtension) throw new Error('Cannot determine file format.');
    const fileName = `recording.${fileExtension}`;
    const mimeType = Platform.OS === 'ios' ? (fileExtension === 'caf' ? 'audio/x-caf' : 'audio/m4a') : 'audio/m4a';

    const formData = new FormData();
    formData.append('audio', { uri: recordingUri, name: fileName, type: mimeType } as any);

    try {
      const response = await axios.post(BACKEND_TRANSCRIPTION_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });
      if (response.status === 200 && response.data.transcription) {
        return response.data.transcription;
      }
      throw new Error(response.data?.error || 'Unknown backend error');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Network error: Check backend connection.');
      }
      throw new Error(error.message);
    }
  };

  const calculateAccuracy = (original: string, transcript: string): number | null => {
    if (!original || !transcript) return 0;
    const cleanText = (text: string) =>
      text
        .toLowerCase()
        .replace(/[\.,!?;:"'()\-\[\]{}]/g, '')
        .trim()
        .split(/\s+/);
    const originalWords = cleanText(original);
    const transcriptWords = cleanText(transcript);
    if (originalWords.length === 0) return 0;
    let matchCount = 0;
    const minLength = Math.min(originalWords.length, transcriptWords.length);
    for (let i = 0; i < minLength; i++) {
      if (originalWords[i] === transcriptWords[i]) matchCount++;
    }
    return parseFloat(((matchCount / originalWords.length) * 100).toFixed(2));
  };

  const handleTranscription = async () => {
    if (!playbackUri || !currentDialogue) return;
    setIsTranscribing(true);
    setTranscriptionResult(null);
    try {
      const transcript = await transcribeWithBackend(playbackUri);
      const accuracy = calculateAccuracy(currentDialogue.english, transcript);
      setTranscriptionResult({ text: transcript, accuracy });
    } catch (error: any) {
      Alert.alert('Transcription Error', error.message);
      setTranscriptionResult({ text: 'Transcription failed', accuracy: null });
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleNext = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
      setPlaybackUri(null);
      setTranscriptionResult(null);
    }
  };

  const handlePrevious = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(currentDialogueIndex - 1);
      setPlaybackUri(null);
      setTranscriptionResult(null);
    }
  };

  const currentDialogue = dialogues[currentDialogueIndex];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <LinearGradient colors={['#6C63FF', '#4834D4']} style={styles.header}>
        <Text style={styles.headerTitle}>Pronunciation Practice</Text>
        <Text style={styles.headerSubtitle}>Master your speaking skills</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentDialogue ? (
          <View style={styles.dialogueCard}>
            <LinearGradient colors={['#FFFFFF', '#F8F9FA']} style={styles.cardGradient}>
              <Text style={styles.label}>English</Text>
              <Text style={styles.english}>{currentDialogue.english}</Text>
              <Text style={styles.label}>Phonetic</Text>
              <Text style={styles.phonetic}>{currentDialogue.phonetic}</Text>
              <Text style={styles.label}>Vietnamese</Text>
              <Text style={styles.vietnamese}>{currentDialogue.vietnamese}</Text>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => {
                  buttonScale.value = withSpring(0.95, {}, () => (buttonScale.value = withSpring(1)));
                  playAudio(currentDialogue.audio);
                }}
              >
                <Animated.View style={[styles.audioButtonContent, buttonAnimatedStyle]}>
                  <Ionicons name="play-circle" size={24} color="#FFFFFF" />
                  <Text style={styles.audioButtonText}>Play Sample</Text>
                </Animated.View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <Text style={styles.errorText}>No dialogue data available.</Text>
        )}

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentDialogueIndex + 1} / {dialogues.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentDialogueIndex + 1) / dialogues.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentDialogueIndex === 0 && styles.disabledButton]}
            disabled={currentDialogueIndex === 0 || isTranscribing || !!recording}
            onPress={() => {
              buttonScale.value = withSpring(0.95, {}, () => (buttonScale.value = withSpring(1)));
              handlePrevious();
            }}
          >
            <Animated.View style={[buttonAnimatedStyle]}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentDialogueIndex === dialogues.length - 1 && styles.disabledButton,
            ]}
            disabled={currentDialogueIndex === dialogues.length - 1 || isTranscribing || !!recording}
            onPress={() => {
              buttonScale.value = withSpring(0.95, {}, () => (buttonScale.value = withSpring(1)));
              handleNext();
            }}
          >
            <Animated.View style={[buttonAnimatedStyle]}>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.recordingSection}>
          <Text style={styles.sectionTitle}>Record Your Voice</Text>
          <View style={styles.recordingButtons}>
            <TouchableOpacity
              style={[styles.actionButton, recording && styles.stopButton]}
              onPress={() => {
                buttonScale.value = withSpring(0.95, {}, () => (buttonScale.value = withSpring(1)));
                recording ? stopRecording() : startRecording();
              }}
              disabled={isTranscribing}
            >
              <Animated.View style={[styles.actionButtonContent, buttonAnimatedStyle]}>
                <Ionicons name={recording ? "stop-circle" : "mic-circle"} size={24} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>
                  {recording ? "Stop Recording" : "Start Recording"}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, !playbackUri && styles.disabledButton]}
              onPress={() => {
                buttonScale.value = withSpring(0.95, {}, () => (buttonScale.value = withSpring(1)));
                playRecording();
              }}
              disabled={!playbackUri || !!recording || isTranscribing}
            >
              <Animated.View style={[styles.actionButtonContent, buttonAnimatedStyle]}>
                <Ionicons name="play-circle" size={24} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Play Recording</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        {playbackUri && (
          <View style={styles.transcriptionSection}>
            <Text style={styles.sectionTitle}>Check Your Pronunciation</Text>
            <TouchableOpacity
              style={[styles.actionButton, isTranscribing && styles.disabledButton]}
              onPress={() => {
                buttonScale.value = withSpring(0.95, {}, () => (buttonScale.value = withSpring(1)));
                handleTranscription();
              }}
              disabled={!playbackUri || isTranscribing || !!recording}
            >
              <Animated.View style={[styles.actionButtonContent, buttonAnimatedStyle]}>
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>
                  {isTranscribing ? "Processing..." : "Check Speech"}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            {isTranscribing && <ActivityIndicator style={styles.loader} color="#6C63FF" />}
            {transcriptionResult && !isTranscribing && (
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.resultCard}
              >
                <Text style={styles.resultLabel}>Your Speech:</Text>
                <Text
                  style={[
                    styles.resultText,
                    transcriptionResult.text === "Transcription failed" && { color: '#FF4D4F' },
                  ]}
                >
                  {transcriptionResult.text || "(Not recognized)"}
                </Text>
                {transcriptionResult.accuracy !== null && (
                  <>
                    <Text style={styles.resultLabel}>Accuracy:</Text>
                    <Text
                      style={[
                        styles.resultAccuracy,
                        { color: transcriptionResult.accuracy >= 70 ? '#28A745' : '#FFA500' },
                      ]}
                    >
                      {`${transcriptionResult.accuracy}%`}
                    </Text>
                  </>
                )}
              </LinearGradient>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    height: 110,
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollContent: {
    padding: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F2F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
  },
  dialogueCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  english: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  phonetic: {
    fontSize: 16,
    color: '#4B5563',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  vietnamese: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  audioButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  audioButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 12,
    width: 60,
    alignItems: 'center',
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  recordingSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  recordingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  stopButton: {
    backgroundColor: '#FF4D4F',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  transcriptionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loader: {
    marginTop: 12,
  },
  resultCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  resultText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  resultAccuracy: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#FF4D4F',
    textAlign: 'center',
    marginTop: 20,
  },
});