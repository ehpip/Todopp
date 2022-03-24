import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      todos: ["Let's", 'Get', 'Started'],
      text: '',
    };
  }

  addTodo() {
    const {text, todos} = this.state;

    this.setState({
      todos: [text, ...todos],
    });
  }

  removeTodo = index => {
    this.setState({
      todos: this.state.todos.filter((todo, id) => id !== index),
    });
  };

  componentDidUpdate() {
    AsyncStorage.setItem('DataTodos', JSON.stringify(this.state.todos));
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const data = await AsyncStorage.getItem('DataTodos');
    if (data !== null) {
      const json = JSON.parse(data);
      this.setState({todos: json});
      console.log(json);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <ScrollView style={{marginTop: 10, marginBottom: 30}}>
          {this.state.todos.map((value, index) => {
            return (
              <View style={styles.addTodo} key={index}>
                <View style={styles.data}>
                  <Text style={styles.textData}>{value}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.setState({
                      todos: this.state.todos.filter(
                        (value, id) => id !== index,
                      ),
                    });
                  }}>
                  <Text style={styles.textButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.a}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.TextInput}
              placeholder={"What's on your mind?"}
              onChangeText={input => this.setState({text: input})}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addTodo()}>
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginTop: 30,
    fontWeight: '300',
  },
  textInput: {
    width: 250,
    height: 50,
    backgroundColor: '#fff',
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  addTodo: {
    flexDirection: 'row',
    marginTop: 30,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  TextInput: {
    marginHorizontal: 10,
  },
  data: {
    width: 250,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 10,
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textData: {
    color: '#000',
  },
  a: {
    flexDirection: 'row',
    marginBottom: 30,
  },
});
