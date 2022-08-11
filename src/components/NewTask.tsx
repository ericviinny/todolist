import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";

import { Feather } from "@expo/vector-icons";

type InputProps = {
  focused: boolean;
}

type NewTaskProps = {
  onSend: (task: string) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onSend }: NewTaskProps) => {

  const [focus, setFocus] = useState(false);
  const [task, setTask] = useState("");

  const theme = useTheme();

  function sendTask() {
    onSend(task);
    setTask("");
  }

  return (
    <Container>
      <Input 
        placeholder="Adicione uma nova tarefa" 
        placeholderTextColor={theme.colors.gray300}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        focused={focus}
        onChangeText={setTask}
        value={task}
      />
      <Icon onPress={() => sendTask()}>
        <Feather name="plus-circle" color={theme.colors.gray100} size={20} />
      </Icon>
    </Container>
  );

}

export default NewTask;

const Container = styled.View`
  width: 100%;
  padding: 0 24px;

  flex-direction: row;

  align-items: center;

  margin-top: -30px;
`;

const Input = styled.TextInput<InputProps>`
  flex: 1;
  padding: 15px 24px;

  background-color: ${({ theme }) => theme.colors.gray500};
  color: ${({ theme }) => theme.colors.gray100};
  font-size: 16px;

  border-radius: 5px;

  border-width: 1px;
  border-color: ${({ theme, focused }) => focused ? theme.colors.purple : theme.colors.gray500};
`;

const Icon = styled.TouchableOpacity`
  width: 52px;
  height: 52px;

  background: ${({ theme }) => theme.colors.blue_dark};

  margin-left: 5px;

  border-radius: 5px;

  justify-content: center;
  align-items: center;
`;