import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../src/theme/colors";
import { spacing, borderRadius } from "../../../src/theme/spacing";
import { mockProfiles } from "../../../src/lib/mockData";

type NotificationType = 'like' | 'interest' | 'view' | 'system' | 'premium' | 'shortlist' | 'offer';

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
  avatarUrl?: string;
};

const notificationsData: { title: string; data: NotificationItem[] }[] = [
  {
    title: "New",
    data: [
      {
        id: "1",
        type: "like",
        title: "Priya Sharma liked your profile",
        message: "View her profile and send interest",
        time: "2m ago",
        isUnread: true,
        avatarUrl: mockProfiles[0].profilePhotoUrl,
      },
      {
        id: "2",
        type: "interest",
        title: "Ananya Nair sent you an interest",
        message: "You have a new interest received",
        time: "10m ago",
        isUnread: true,
        avatarUrl: mockProfiles[1].profilePhotoUrl,
      },
      {
        id: "3",
        type: "view",
        title: "Your profile was viewed",
        message: "Someone viewed your profile",
        time: "25m ago",
        isUnread: true,
      },
      {
        id: "4",
        type: "system",
        title: "Welcome to VivahaMatri!",
        message: "Complete your profile to get better matches",
        time: "1h ago",
        isUnread: true,
      },
    ]
  },
  {
    title: "Earlier",
    data: [
      {
        id: "5",
        type: "interest",
        title: "Sneha Iyer accepted your interest",
        message: "You both showed interest",
        time: "3h ago",
        isUnread: false,
        avatarUrl: mockProfiles[2].profilePhotoUrl,
      },
      {
        id: "6",
        type: "premium",
        title: "Your premium plan is active",
        message: "Valid till 20 Aug 2025",
        time: "1d ago",
        isUnread: false,
      },
      {
        id: "7",
        type: "shortlist",
        title: "Divya M. added you to shortlist",
        message: "Check out who shortlisted you",
        time: "2d ago",
        isUnread: false,
        avatarUrl: mockProfiles[6].profilePhotoUrl,
      },
      {
        id: "8",
        type: "offer",
        title: "Special offer just for you!",
        message: "Upgrade to Premium and get 20% off",
        time: "3d ago",
        isUnread: false,
      },
    ]
  }
];

const FilterPill = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) => (
  <TouchableOpacity
    style={[styles.filterPill, isActive && styles.filterPillActive]}
    onPress={onPress}
  >
    <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const NotificationIcon = ({ type, avatarUrl }: { type: NotificationType; avatarUrl?: string }) => {
  if (avatarUrl) {
    return <Image source={{ uri: avatarUrl }} style={styles.notificationAvatar} />;
  }
  
  let iconName: keyof typeof MaterialCommunityIcons.glyphMap = "bell";
  let iconColor = colors.primary;
  let bgColor = "#FFF0F3";
  
  switch (type) {
    case 'view':
      iconName = "eye-outline";
      iconColor = "#00B4D8";
      bgColor = "#E0FBFC";
      break;
    case 'system':
      iconName = "bell-outline";
      iconColor = "#F4A261";
      bgColor = "#FAE1DD";
      break;
    case 'premium':
      iconName = "shield-crown-outline";
      iconColor = colors.primary;
      bgColor = "#FFF0F3";
      break;
    case 'shortlist':
      iconName = "bookmark-outline";
      iconColor = "#E76F51";
      bgColor = "#FFE5D9";
      break;
    case 'offer':
      iconName = "gift-outline";
      iconColor = "#9D4EDD";
      bgColor = "#E0AAFF30";
      break;
    default:
      iconName = "account-multiple-outline";
      iconColor = "#6C63FF";
      bgColor = "#6C63FF20";
  }

  return (
    <View style={[styles.notificationIconContainer, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
    </View>
  );
};

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Matches", "Interests", "System"];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filters.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {notificationsData.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.data.map((item) => (
              <View key={item.id} style={styles.notificationItem}>
                <NotificationIcon type={item.type} avatarUrl={item.avatarUrl} />
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                </View>
                <View style={styles.notificationRight}>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                  {item.isUnread && <View style={styles.unreadDot} />}
                </View>
              </View>
            ))}
          </View>
        ))}
        {/* Extra padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  markReadText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  filtersContainer: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterPillText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  filterPillTextActive: {
    color: colors.white,
  },
  scrollContent: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.md,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  notificationAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  notificationRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
});
