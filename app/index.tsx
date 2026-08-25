import { Redirect } from 'expo-router';

// Root level auth routing is now handled by the global Auth Guard in app/_layout.tsx
export default function Index() {
  return <Redirect href="/(auth)/welcome" />;
}
