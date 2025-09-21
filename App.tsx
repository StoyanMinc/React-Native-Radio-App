import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
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
                    component={() => null}
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