import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import ButtonPrimary from "./components/button.primary.component";
import Input from "./components/input.component";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "./components/button.component";
import LoginService from "./service/login.service";
import { router } from "expo-router";
import showToast from "./components/toast.component";


export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState({});
  let [isPressed, setIsPressed] = useState(false);

  function validarInput() {
    let objeto = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      objeto = { ...objeto, email: "Email não pode ser vazio" };
    }

    if (!password) {
      objeto = { ...objeto, password: "Senha não pode ser vazio" };
    }

    if (!emailRegex.test(email)) {
      objeto = { ...objeto, email: "Email inválido" };
    }

    setError(objeto);
    return Object.keys(objeto).length === 0;
  }

  function cleanInput() {
    setEmail("");
    setPassword("");
    setError({});
}


  async function handleLogin() {
    setIsPressed(true);

    if (validarInput()) {
      let service = new LoginService();
      let response = await service.login(email, password);
      if (response) {

        cleanInput();

        showToast({
          type: "success",
          title: "Sucesso",
          message: "Login efetuado com sucesso"
        });

        router.push("/(tabs)/");
        setIsPressed(false);
        return;
        
      }
    }

    showToast({
      type: "error",
      title: "Erro",
      message: "Erro ao efetuar login"
    });
    setIsPressed(false);
    return;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Bem-vindo</Text>
          </View>
        </View>
        <View style={styles.corpo}>
          <View style={styles.input}>
            <Input
              name="Email:"
              placeholder="Digite seu email"
              value={email}
              onChange={setEmail}
            />
            {error.email && <Text style={styles.error}>* {error.email}</Text>}
            <Input
              name="Senha:"
              placeholder="Digite sua senha"
              value={password}
              onChange={setPassword}
              isPassword={true}
            />
            {error.password && <Text style={styles.error}>* {error.password}</Text>}
          </View>
        </View>
        <View style={styles.senha}>
          <Button title="Esqueceu sua senha?" onPress={() => { }} />
        </View>
        <View>
          <ButtonPrimary title="Entrar" onPress={handleLogin} isPressed={isPressed} />
        </View>
        <View style={styles.cadastrar}>
          <Text>Não tem uma conta?</Text>
          <Button title="Cadastre-se" onPress={() => { }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    gap: 15,
  },
  logoText: {
    fontSize: RFValue(40),
    fontWeight: "bold",
  },
  corpo: {
    marginBottom: 20,
  },
  senha: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  cadastrar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 10
  },
  error: {
    color: "red",
    fontSize: RFValue(14),
    fontWeight: "semibold",
  }
});
