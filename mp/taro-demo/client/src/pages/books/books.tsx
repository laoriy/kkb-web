import { Component, PropsWithChildren } from "react";
import Taro, { Config } from "@tarojs/taro";
import { AtCard } from "taro-ui";
import { View, Text } from "@tarojs/components";
import "./books.scss";

export default class Books extends Component<PropsWithChildren> {
  state = {
    books: [] as any[]
  };
  db = Taro.cloud.database();

  componentWillMount() {}

  componentDidMount() {
    this.db
      .collection("book")
      .get()
      .then(res => {
        console.log(res);

        this.setState({
          books: res.data
        });
      });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    return (
      <View className="books">
        {this.state.books.map((book, index) => {
          return (
            <AtCard
              note="小Tips"
              extra={`${book.id}`}
              title={book.title}
              thumb={book.cover_url}
              key={book.id}
            >
              {book.abstract}
            </AtCard>
          );
        })}
      </View>
    );
  }
}
