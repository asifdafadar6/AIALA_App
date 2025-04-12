import { Stack, useRouter } from "expo-router";
import { ContextProvider, MyContext } from "../components/provider/contextApi";
import { useContext, useEffect } from "react";
import { ActivityIndicator, StatusBar, View, Image } from "react-native";

function RootLayoutInner() {
  const { existingUser, isLoading } = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    console.log("Checking existingUser:", existingUser);
    console.log("isLoading:", isLoading);

    if (!isLoading && existingUser) {
      console.log("User type:", existingUser.usertype);

      setTimeout(() => { 
        switch (existingUser.usertype) {
          case "teacher":
            router.replace("(drawer)");
            break;
          case "student":
            router.replace("(drawerst)");
            break;
          case "pending":
            router.replace("(auth)/Questionnaire");
            break;
          default:
            router.replace("(auth)");
        }
      }, 3000); 
    }
  }, [existingUser, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.loaderContainer}>
          <Image source={require("../assets/images/tabIcon.png")} style={styles.loaderImage} />
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="(drawerst)" />
        <Stack.Screen name="(auth)/Questionnaire" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ContextProvider>
      <RootLayoutInner />
    </ContextProvider>
  );
}
