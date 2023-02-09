import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isExpired } from "react-jwt";

export default function Login({ navigation }) {
  const [user, setUser] = useState({
    cpf: "",
    senha: "",
  });

  const [mensagemErro, setMensagemErro] = useState("");

  async function handleLogin() {
    try {
      const response = await api.post("/tecnicos/login", user);

      setUser({
        cpf: "",
        senha: "",
      });

      setMensagemErro("");

      console.log(response);

      await AsyncStorage.setItem("user", JSON.stringify([response.data.token]));

      navigation.navigate("Logado");
    } catch (error) {
      setMensagemErro("CPF ou senha inválidos.");
      console.log(error);
      setUser({
        cpf: "",
        senha: "",
      });
    }
  }

  useEffect(() => {
    async function isLogado() {
      try {
        const user = await AsyncStorage.getItem("user");

        if (user === null) {
          await AsyncStorage.setItem("user", JSON.stringify({}));
        } else {
          const userLocal = JSON.parse(user);

          if (userLocal.length !== 0) {
            const expired = isExpired(userLocal[0]);

            if (!expired) {
              navigation.navigate("Logado");
            } else {
              await AsyncStorage.setItem("user", JSON.stringify({}));
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    isLogado();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function goToCadastrar() {
    navigation.navigate("Cadastro");
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_login}>
        <Text style={styles.login}>Login</Text>
      </View>

      <View style={styles.container_TextoInput}>
        <TextInput
          style={styles.TextoInput}
          placeholder="CPF"
          placeholderTextColor="#909090"
          value={user.cpf}
          onChangeText={(e) => setUser({ ...user, cpf: e })}
          keyboardType="numeric"
          maxLength={11}
        />
        <TextInput
          style={styles.TextoSenha}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#909090"
          value={user.senha}
          onChangeText={(e) => setUser({ ...user, senha: e })}
        />
        {mensagemErro.length !== 0 ? (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            {mensagemErro}
          </Text>
        ) : null}
        <TouchableOpacity style={styles.Botao} onPress={() => handleLogin()}>
          <Text style={styles.TextoBotao}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container_link}>
        <Text>Ainda não é um técnico?</Text>

        <TouchableOpacity
          style={styles.LinkCadastro}
          onPress={() => goToCadastrar()}
        >
          <Text style={styles.TextoLinkCadastro}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container_link2}>
        <Text>Esqueceu a senha? Recuperar senha</Text>

        <TouchableOpacity style={styles.LinkCadastro} onPress={() => ""}>
          <Text style={styles.TextoLinkCadastro}>Recuperar senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // width: "100%",
  },

  container_login: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: "2%",
    paddingLeft: "1%",
  },

  login: {
    padding: "2%",
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },

  container_TextoInput: {
    width: "100%",
    alignItems: "center",
  },

  TextoInput: {
    width: "95%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    padding: 15,
  },

  TextoSenha: {
    width: "95%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    padding: 15,
    marginTop: 10,
  },

  Botao: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: "95%",
    height: 52,
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  TextoBotao: {
    color: "#fff",
  },

  container_link: {
    paddingTop: "15%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  TextoLinkCadastro: {
    paddingLeft: 5,
    color: "#23AFFF",
  },

  container_link2: {
    paddingTop: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});