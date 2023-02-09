import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chamados from "../pages/Chamados";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";
import NavigationButton from "../components/NavigationButton";

const { Screen, Navigator } = createBottomTabNavigator();

export default function TabRoutes({ route }) {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          alignItems: "center",
          height: 60,
        },
      }}
    >
      <Screen
        name="Chamados"
        component={Chamados}
        options={{
          tabBarButton: (props) => {
            return (
              <NavigationButton
                {...props}
                name="clipboard-list-outline"
                pageName="Chamados"
              />
            );
          },
        }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => {
            return <NavigationButton {...props} name="home" pageName="Home" />;
          },
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        initialParams={{ dataTecnico: route.params }}
        options={{
          tabBarButton: (props) => {
            return (
              <NavigationButton {...props} name="account" pageName="Perfil" />
            );
          },
        }}
      />
    </Navigator>
  );
}