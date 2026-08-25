import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/lib/queryClient";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../src/store/authStore";
import { Loading } from "../src/components/Loading";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { isAuthenticated, isOnboardingComplete, restoreSession } =
    useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
          restoreSession(token);
        }
      } catch (error) {
        // Handle error silently
      } finally {
        setIsReady(true);
      }
    };
    checkAuth();
  }, []);

  // Global Auth Guard
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to auth if not logged in
      router.replace("/(auth)/welcome");
    } else if (isAuthenticated) {
      if (!isOnboardingComplete && !inOnboardingGroup) {
        // Force onboarding if incomplete
        router.replace("/(main)/(tabs)");
      } else if (
        isOnboardingComplete &&
        (inAuthGroup || inOnboardingGroup || segments.length === 0)
      ) {
        // If fully setup and trying to access auth/onboarding/root, go to home
        router.replace("/(main)/(tabs)");
      }
    }
  }, [isAuthenticated, isOnboardingComplete, segments, isReady]);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(onboarding)" options={{ animation: "fade" }} />
          <Stack.Screen name="(main)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="profile/[id]"
            options={{ headerShown: true, title: "Profile" }}
          />
          <Stack.Screen
            name="membership/index"
            options={{
              headerShown: true,
              title: "Membership",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="notifications/index"
            options={{ headerShown: true, title: "Notifications" }}
          />
          <Stack.Screen
            name="settings/index"
            options={{ headerShown: false, title: "Settings" }}
          />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
