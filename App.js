import { StyleSheet, TouchableOpacity, Text, View, Image,Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';


import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReelsScreen from './screens/ReelsScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import ActivityScreen from './screens/ActivityScreen';
import FriendProfileScreen from './screens/FriendProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';

import { userImg } from './components/home/Post';
import { Ionicons } from '@expo/vector-icons';

import Status from './components/home/Status';
import SignupForm from './components/signup/SignupForm';

import ForgotPassword from './components/login/ForgotPassword';

import UserVerification from './components/auth/UserVerification.js';
import UserVerificationStep4 from './components/auth/UserVerificationStep4.js';
import UserVerificationStep3 from './components/auth/UserVerificationStep3.js';
import UserVerificationStep2 from './components/auth/UserVerificationStep2.js';
import UserVerificationStep1 from './components/auth/UserVerificationStep1.js';
import UserVerificationSummary from './components/auth/UserVerificationSummary.js';


import { Provider } from 'react-redux';
import store from './store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 50,
          backgroundColor: 'black'
        },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? "home-sharp" : "home-outline";
            size = focused ? size + 4 : size + 2;
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "ios-search-outline";
            size = focused ? size + 4 : size + 2;
          } else if (route.name === "NewPost") {
            iconName = focused ? "add-circle-outline" : "add-circle-outline";
            size = focused ? size + 4 : size + 2;
          } else if (route.name === "Reels") {
            iconName = focused ? "film" : "film-outline";
            size = focused ? size + 4 : size + 2;
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
            size = focused ? size + 4 : size + 2;
          }
          return <Ionicons style={focused ? styles.active : null} name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                alignItems: 'center',
                borderBottomWidth: props.accessibilityState.selected ? 5 : 0,
                borderColor: 'skyblue',
                borderRadius: 50,
              }}
            >
              <Ionicons name="add-circle-outline" size={50} color='white' />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[focused ? styles.active : null, { padding: 5 }]}>
              <Image
                style={[styles.userCircle, focused ? { borderWidth: 3 } : null]}
                source={{ uri: userImg }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Login">
                {props => <LoginScreen {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="Signup" component={SignupForm} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: '비밀번호 찾기' }} />
              <Stack.Screen name="UserVerificationStep1" component={UserVerificationStep1} options={{ headerShown: false }} />
              <Stack.Screen name="UserVerificationStep2" component={UserVerificationStep2} options={{ headerShown: false }} />
              <Stack.Screen name="UserVerificationStep3" component={UserVerificationStep3} options={{ headerShown: false }} />
              <Stack.Screen name="UserVerificationStep4" component={UserVerificationStep4} options={{ headerShown: false }} />
              <Stack.Screen name="UserVerificationSummary">
                {props => <UserVerificationSummary {...props} setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="BottomTab" component={BottomTabScreen} />
              <Stack.Screen name="Activity" component={ActivityScreen} />
              <Stack.Screen name="FriendProfile" component={FriendProfileScreen} />
              <Stack.Screen name="Status" component={Status} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 3,
    borderColor:'#00ccbb',
    borderRadius: 10,
    padding:5,
  },
  userCircle: {
    height: 30,
    width: 30,
    padding: 5,
    marginTop: 3,
    borderRadius: 50,
    borderColor:'#00ccbb',
  },
});

export default App;
