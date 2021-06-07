import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

import * as Location from "expo-location";

const NOTIFICATION_KEY = "udaciFlashcards:notifications";

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

export const getDailyReminderValue = () => {
  return {
    today: "👋 Don't forget to take a quiz today!",
  };
};

function createNotification() {
  return {
    title: "Its Quiz Time!",
    body: "👋 Don't forget to take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync().then(({ granted }) => {
          if (granted) {
            Notifications.cancelAllScheduledNotificationsAsync().then(() => {
              // let tomorrow = new Date();
              // tomorrow.setDate(tomorrow.getDate() + 1);
              // tomorrow.setHours(20);
              // tomorrow.setMinutes(0);
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Its Quiz Time!",
                  body: "👋 Don't forget to take a quiz today!",
                  ios: {
                    sound: true,
                    priority: "high",
                    sticky: true,
                    vibrate: true,
                  },
                  android: {
                    sound: true,
                    priority: "high",
                    sticky: true,
                    vibrate: true,
                  },
                },
                trigger: {
                  seconds: 24 * 60 * 60,
                },
              }).then((res) => {
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              });
              // Notifications.getAllScheduledNotificationsAsync().then(
              //   (res) => {}
              // );
            });
          }
        });
      }
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
