
import { Feather } from '@expo/vector-icons'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from '../screens/Home';
import { Note } from '../screens/Note';
import Clock from '../components/clock';


const Tabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStackScreen = () => {
    return(
        <Stack.Navigator             
        screenOptions={{ 
            headerShown: true, 
            tabBarShowLabel: true,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
                backgroundColor: "#343A40",
            },
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Clock" component={Clock} />
        </Stack.Navigator>
    )
}

export function AppRoutes() {
    return(
        <Tabs.Navigator 
            screenOptions={{ 
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: "#343A40",
                },
            }}
        >
            <Tabs.Screen 
                name="Home"
                component={HomeStackScreen}
                options={{ 
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name='file-text'
                            size={25}
                            color={ focused ? '#FFFFFF' : '#C0C0C0' }
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="Note"
                component={Note}
                options={{ 
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name='file-plus'
                            size={25}
                            color={ focused ? '#FFFFFF' : '#C0C0C0' }
                        />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}