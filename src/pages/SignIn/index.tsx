import React, {useState, useContext} from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import {
  Container,
  Input,
  Button,
  ButtonText,
  Title,
  ButtonRegister,
  RegisterText,
  PasswordContainer
} from "./styles";
import { Feather } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../../contexts/AuthContext";
import { Logo } from "../../components/Logo";

export default function SignIn() {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hidePass, setHidePass] = useState(true);

  async function handleLogin() {
    if (email === "" || password === "") return;

    await signIn({ email, password });
  }

  function handleRegisterUser() {

      navigation.navigate('SignUp');
      
  }

  return (
    <Container>
      <Animatable.View animation="fadeInDown" delay={500}>
          <Logo />
      </Animatable.View>

      <Animatable.View
        animation="fadeIn"
        delay={1500}
        style={styles.inputContainer}
      >
        <Title>Email</Title>
        <Input 
          placeholder="Digite um email..." 
          value={email}
          onChangeText={setEmail}
        />

        <Title>Senha</Title>
        <PasswordContainer>
            <Input 
              placeholder="Digite sua senha..." 
              secureTextEntry={hidePass} 
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setHidePass(!hidePass)}
              style={{position: 'absolute', right: 20, top: 5}}
            >
                {
                  hidePass ? ( <Feather name="eye-off" size={25} /> ) : (<Feather name="eye" size={25} />)
                }
            </Pressable>
        </PasswordContainer>

        <Button onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>

        <ButtonRegister onPress={handleRegisterUser}>
          <RegisterText>Não possui uma conta? Cadastre-se</RegisterText>
        </ButtonRegister>
      </Animatable.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "95%",
    alignItens: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
});
