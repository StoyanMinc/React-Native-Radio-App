import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Stations from "./src/components/stations/Stations";
import Favorites from "./src/components/favorites/Favorites";
import Home from "./src/components/home/Home";
import { FavoritesProvider } from "./src/hooks/useFavorites";
import { AudioPlayerProvider } from "./src/hooks/useAudioPlayer";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <AudioPlayerProvider>
                <FavoritesProvider>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarStyle: {
                                backgroundColor: '#1e1e1e',
                                borderTopColor: '#333',
                                height: 80,
                            },
                            tabBarActiveTintColor: 'red',
                            tabBarInactiveTintColor: 'gray',
                        }}>
                        <Tab.Screen
                            name='Home'
                            component={Home}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="home" size={size + 4} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name='Stations'
                            component={Stations}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="radio" size={size + 4} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name='Favorites'
                            component={Favorites}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="heart" size={size + 4} color={color} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </FavoritesProvider>
            </AudioPlayerProvider>
        </NavigationContainer>
    );
}