import React, { useState } from "react";
import { FlatList, ProgressViewIOSComponent } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Header from "../components/Header";
import NewTask from "../components/NewTask";

import { Feather } from "@expo/vector-icons";

type TaskProps = {
  id: number;
  task: string;
  done: boolean;
}

const Home: React.FC = () => {

  const theme = useTheme();
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function addTask(task: string) {
    if (!(task.length > 0)) return;
    setTasks(state => [{ id: new Date().getTime(), task, done: false }, ...state]);
  }

  function delTask(task: TaskProps) {
    setTasks(state => state.filter(t => t.id !== task.id));
  }

  function markTaskAsDone(task: TaskProps) {
    const aTask = tasks.filter((t: TaskProps) => t.id === task.id)[0];
    const data = {
      id: aTask.id,
      task: aTask.task,
      done: !aTask.done
    }

    const nTask = tasks.filter((t: TaskProps) => t.id !== data.id);
    if (data.done) {
      setTasks([...nTask, data]);
    } else {
      setTasks([data, ...nTask]);
    }
  }

  return (
    <Container>
      <Header />
      <NewTask onSend={addTask} />
      <Content>
        <TasksInfo>
          <TaskInfoItem>
            <TaskInfoTitle style={{ color: theme.colors.blue }}>Criadas</TaskInfoTitle>
            <TaskInfoCounter>{tasks.length}</TaskInfoCounter>
          </TaskInfoItem>
          <TaskInfoItem>
            <TaskInfoTitle style={{ color: theme.colors.purple }}>Concluídas</TaskInfoTitle>
            <TaskInfoCounter>{tasks.filter(t => t.done === true).length}</TaskInfoCounter>
          </TaskInfoItem>
        </TasksInfo>
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => `${index}`}

          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (
            <TaskItem>
              <TaskMarkDone 
                style={{ backgroundColor: item.done ? theme.colors.blue : 'transparent' }} 
                onPress={() => markTaskAsDone(item)} 
              />
              <TaskText style={{ textDecorationLine: item.done ? 'line-through' : 'none', color: item.done ? theme.colors.gray300 : theme.colors.gray100 }} >{item.task}</TaskText>
              <Feather
                name="trash-2"
                onPress={() => delTask(item)}
                color={theme.colors.gray100} size={24}
              />
            </TaskItem>
          )}

          ListEmptyComponent={() => (
            <EmptyContent>
              <Feather name="clipboard" color={theme.colors.gray100} size={54} />
              <EmptyText>Você ainda não tem tarefas cadastradas</EmptyText>
              <EmptySubtext>Crie tarefas e organize seus itens a fazer</EmptySubtext>
            </EmptyContent>
          )}
        />
      </Content>
    </Container>
  );

}

export default Home;

const Container = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.colors.gray600};
`;

const Content = styled.View`
  flex: 1;

  padding: 0 24px;
  margin-top: 32px;
`;

const TasksInfo = styled.View`
  width: 100%;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

const TaskInfoItem = styled.View`
  flex-direction: row;

  align-items: center;
`;

const TaskInfoTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray200};
`;

const TaskInfoCounter = styled.Text`
  margin-left: 8px;

  padding: 8px;

  font-size: 12px;
  font-weight: bold;

  border-radius: 100px;

  background-color: ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.gray200};
`;

const TaskItem = styled.View`
  width: 100%;
  height: 64px;

  border-radius: 5px;

  padding: 10px;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;

  background: ${({ theme }) => theme.colors.gray500};
`;

const TaskText = styled.Text`
  font-size: 14px;

  color: ${({ theme }) => theme.colors.gray100};
`;

const TaskMarkDone = styled.TouchableOpacity<TaskProps>`
  width: 24px;
  height: 24px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.blue};

  border-radius: 24px;
`;

const EmptyContent = styled.View`
  flex: 1;

  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray400};

  align-items: center;

  padding-top: 50px;
`;

const EmptyText = styled.Text`
  font-size: 14px;
  font-weight: bold;

  color: ${({ theme }) => theme.colors.gray300};

  margin-top: 16px;
`;

const EmptySubtext = styled.Text`
  font-size: 14px;

  color: ${({ theme }) => theme.colors.gray300};
`;