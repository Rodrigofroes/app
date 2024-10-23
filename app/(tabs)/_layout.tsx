import { Tabs } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../constants/colors.constant";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let iconName: string = '';

                    if (route.name === 'index') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'cliente') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'servico') {
                        iconName = focused ? 'construct' : 'construct-outline';
                    } else if (route.name === 'historico') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={Colors.primary} />;
                },
                tabBarActiveTintColor: Colors.black,
                tabBarInactiveTintColor: Colors.primary,
                tabBarStyle: {
                    paddingBottom: 5, 
                    height: 60, 
                    borderTopWidth: 0, 
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12, 
                    fontWeight: 'bold', 
                    color: Colors.primary,
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Início',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="cliente"
                options={{
                    tabBarLabel: 'Clientes',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="servico"
                options={{
                    tabBarLabel: 'Serviços',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="historico"
                options={{
                    tabBarLabel: 'Transações',
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
