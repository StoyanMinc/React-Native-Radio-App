import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Stations from "./src/components/stations/Stations";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#1e1e1e', // your desired background color
                        borderTopColor: '#333',      // optional: change top border color
                        height: 80,                  // optional: adjust height
                    },
                    tabBarActiveTintColor: 'red',   // color of active icon/text
                    tabBarInactiveTintColor: 'gray',      // color of inactive icon/text
                }}>
                <Tab.Screen
                    name='Home'
                    component={() => null}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size + 4} color={color} /> // slightly bigger icon
                        ),
                    }}
                />
                <Tab.Screen
                    name='Stations'
                    component={Stations}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="radio" size={size + 4} color={color} /> // slightly bigger icon
                        ),
                    }}
                />
                <Tab.Screen
                    name='Favorites'
                    component={() => null}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size + 4} color={color} /> // slightly bigger icon
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}