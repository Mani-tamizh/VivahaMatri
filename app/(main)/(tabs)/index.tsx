import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "../../../src/components/Screen";
import { typography } from "../../../src/theme/typography";
import { colors } from "../../../src/theme/colors";
import { spacing, borderRadius } from "../../../src/theme/spacing";
import { mockProfiles, mockCurrentUser } from "../../../src/lib/mockData";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const tabBarHeight = Platform.OS === "ios" ? 85 : 30;

  // Quick Actions Data
  const quickActions = [
    { id: "1", title: "Matches", icon: "heart", color: "#FF4B72", badge: "12" },
    {
      id: "2",
      title: "Interests",
      icon: "account-group",
      color: "#6C63FF",
      badge: "8",
    },
    {
      id: "3",
      title: "Shortlist",
      icon: "bookmark",
      color: "#FF9500",
      badge: "15",
    },
    {
      id: "4",
      title: "Profile Views",
      icon: "eye",
      color: "#34C759",
      badge: "23",
    },
    { id: "5", title: "Premium", icon: "crown", color: "#FF4B72" },
  ];

  const recommendedProfiles = mockProfiles.slice(0, 5);
  const recentlyJoined = mockProfiles.slice(2, 8);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        <View
          style={[
            styles.hero,
            {
              paddingTop: Platform.OS === "ios" ? insets.top : insets.top,
              minHeight: width * 0.6,
            },
          ]}
        >
          <Image
            source={require("../../../assets/images/bg.png")}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "145%",
              height: "140%",
              resizeMode: "cover",
            }}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push("/more")}>
              <Feather name="menu" size={24} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={styles.heroLogo}
                resizeMode="contain"
              />
            </View>

            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Feather name="bell" size={24} color={colors.text} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.greeting}>
              Good Morning,{" "}
              <Text style={{ fontWeight: "bold", color: "#1A1A1A" }}>
                {mockCurrentUser.name.split(" ")[0]}
              </Text>{" "}
              👋
            </Text>
            <Text style={styles.heroTitle}>
              Find your perfect{"\n"}life partner 💕
            </Text>

            <View style={styles.premiumBadge}>
              <MaterialCommunityIcons
                name="shield-crown"
                size={32}
                color={colors.primary}
              />
              <View style={{ marginLeft: spacing.xs }}>
                <Text style={styles.premiumText}>Premium Member</Text>
                <Text style={styles.validityText}>Valid till 20 Aug 2025</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            position: "relative",
            top: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 15,
            marginTop: 5,
          }}
        >
          {/* <View style={styles.searchShadow}>
            <View style={styles.searchContainer}>
              <Feather
                name="search"
                size={20}
                color={colors.primary}
                style={styles.searchIcon}
              />

              <TextInput
                placeholder="Search by name, location, community..."
                placeholderTextColor={colors.textSecondary}
                style={styles.searchInput}
              />

              <TouchableOpacity style={styles.filterButton}>
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </View> */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionItem}>
                <View
                  style={[
                    styles.quickActionIcon,
                    { backgroundColor: `${action.color}15` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={action.icon as any}
                    size={28}
                    color={action.color}
                  />
                  {action.badge && (
                    <View style={styles.actionBadge}>
                      <Text style={styles.actionBadgeText}>{action.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended For You</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {recommendedProfiles.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.recommendedCard}
                  onPress={() => router.push(`/profile/${profile.id}`)}
                >
                  <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: profile.profilePhotoUrl }}
                      style={styles.cardImage}
                    />
                    {profile.isOnline && <View style={styles.onlineDot} />}
                    <TouchableOpacity style={styles.heartButton}>
                      <Ionicons
                        name="heart-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardContent}>
                    <View style={styles.cardNameRow}>
                      <Text style={styles.cardName} numberOfLines={1}>
                        {profile.name}, {profile.age}
                      </Text>
                      {profile.isVerified && (
                        <MaterialCommunityIcons
                          name="check-decagram"
                          size={16}
                          color={colors.success}
                          style={{ marginLeft: 4 }}
                        />
                      )}
                    </View>

                    <View style={styles.cardDetailRow}>
                      <Feather
                        name="briefcase"
                        size={12}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.cardDetailText} numberOfLines={1}>
                        {profile.occupation}
                      </Text>
                    </View>
                    <View style={styles.cardDetailRow}>
                      <Feather
                        name="map-pin"
                        size={12}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.cardDetailText} numberOfLines={1}>
                        {profile.location}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Joined</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {recentlyJoined.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.recentItem}
                  onPress={() => router.push(`/profile/${profile.id}`)}
                >
                  <View>
                    <Image
                      source={{ uri: profile.profilePhotoUrl }}
                      style={styles.recentImage}
                    />
                    {profile.isOnline && (
                      <View style={styles.recentOnlineDot} />
                    )}
                  </View>
                  <Text style={styles.recentName} numberOfLines={1}>
                    {profile.name.split(" ")[0]}, {profile.age}
                  </Text>
                  <Text style={styles.recentLocation} numberOfLines={1}>
                    {profile.location.split(",")[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.premiumBanner}>
            <View style={styles.premiumBannerContent}>
              <View style={styles.premiumBannerIcon}>
                <MaterialCommunityIcons
                  name="crown"
                  size={32}
                  color={colors.white}
                />
              </View>
              <View style={styles.premiumBannerTextContainer}>
                <Text style={styles.premiumBannerTitle}>
                  Unlock Full Access
                </Text>
                <Text style={styles.premiumBannerDesc}>
                  Get contact details & connect{"\n"}with your perfect match 💕
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.premiumBannerButton}
              onPress={() => router.push("/membership")}
            >
              <View>
                <Text style={styles.premiumBannerButtonPrice}>₹1,000</Text>
                <Text style={styles.premiumBannerButtonValidity}>
                  1 Year Validity
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD", // Slightly cleaner white than the default background
  },
  hero: {
    width: "100%",
    paddingBottom: spacing.lg, // Extra space for overlapping search bar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    ...typography.title,
    color: colors.primary,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  heroLogo: {
    width: 220,
    height: 60,
  },
  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF0F5",
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  heroContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  greeting: {
    ...typography.body,
    color: "#4A4A4A",
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    ...typography.heading,
    fontSize: 26,
    fontWeight: "600",
    color: "#1A1A1A",
    lineHeight: 38,
    marginBottom: spacing.md,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  premiumText: {
    ...typography.body,
    fontWeight: "700",
    color: colors.primary,
    fontSize: 15,
  },
  validityText: {
    ...typography.caption,
    color: "#1A1A1A",
    fontSize: 12,
    marginTop: 2,
  },
  searchShadow: {
    marginHorizontal: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  searchContainer: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.white,

    paddingHorizontal: spacing.sm,

    borderRadius: 18,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    ...typography.body,
    height: 48,
    paddingVertical: 0,
  },

  filterButton: {
    width: 40,
    height: 40,

    backgroundColor: colors.primary,

    borderRadius: 13,

    justifyContent: "center",
    alignItems: "center",
  },
  quickActionsScroll: {
    paddingVertical: spacing.md,
    gap: spacing.md,
    alignItems: "center",
  },
  quickActionItem: {
    alignItems: "center",
    width: 65,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  actionBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  actionBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  quickActionText: {
    ...typography.caption,
    textAlign: "center",
    fontSize: 12,
    color: colors.text,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.title,
    fontSize: 18,
  },
  seeAllText: {
    ...typography.button,
    color: colors.primary,
    fontSize: 14,
  },
  horizontalList: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    gap: spacing.xs,
  },
  recommendedCard: {
    width: 130,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  cardImageContainer: {
    width: "100%",
    height: 120,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  onlineDot: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  heartButton: {
    position: "absolute",
    bottom: -12,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 8,
    paddingTop: 14,
    paddingBottom: 10,
  },
  cardNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardName: {
    ...typography.title,
    fontSize: 12,
    flexShrink: 1,
  },
  cardDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  cardDetailText: {
    ...typography.caption,
    fontSize: 10,
    marginLeft: spacing.xs,
    flexShrink: 1,
  },
  recentItem: {
    alignItems: "center",
    width: 80,
  },
  recentImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: spacing.sm,
  },
  recentOnlineDot: {
    position: "absolute",
    bottom: spacing.sm,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  recentName: {
    ...typography.body,
    fontSize: 14,
    fontWeight: "600",
  },
  recentLocation: {
    ...typography.caption,
    fontSize: 12,
  },
  premiumBanner: {
    marginHorizontal: spacing.sm,
    backgroundColor: "#FFF0F5", // Soft pink background
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "#FFE0EB",
  },
  premiumBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  premiumBannerIcon: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  premiumBannerTextContainer: {
    flex: 1,
  },
  premiumBannerTitle: {
    ...typography.title,
    fontSize: 18,
    marginBottom: 2,
  },
  premiumBannerDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  premiumBannerButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  premiumBannerButtonPrice: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  premiumBannerButtonValidity: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
});
