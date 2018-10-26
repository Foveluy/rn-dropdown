import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform
} from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const Arrow = ({ active }) => (
  <View
    style={[
      styles.arrow,
      {
        transform: [{ rotate: active ? "135deg" : "-45deg" }],
        marginBottom: active ? 0 : 2
      }
    ]}
  />
);

export default class Dropdown extends React.PureComponent {
  static defaultProps = {
    headers: [],
    onAnimationStart: () => {},
    onAnimationEnd: () => {},
    onCloseStart: () => {},
    onCloseEnd: () => {},
    renderHeaderItem: void 666,
    activeTextColor: "#1890ff"
  };

  state = {
    isVisiable: false,
    activateIndex: -1,
    opacity: new Animated.Value(0),
    contentHeight: new Animated.Value(0),
    headerPosition: {
      height: 0,
      y: 0
    }
  };

  handleOnItemClick = index => {
    if (index === this.state.activateIndex) {
      this.close();
      return;
    }

    const indexOfHeaders = this.props.headers[index];

    this._headerRoot.measure((ox, oy, width, height, px, py) => {
      this.props.onAnimationStart();

      Animated.stagger(0, [
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 233
        }),
        Animated.spring(this.state.contentHeight, {
          toValue: indexOfHeaders.height || 300,
          tension: 30,
          friction: 7
        })
      ]).start(() => {
        this.props.onAnimationEnd();
      });

      this.setState({
        activateIndex: index,
        isVisiable: true,
        headerPosition: {
          height,
          y: py
        }
      });
    });
  };

  close = () => {
    this.props.onCloseStart();
    Animated.stagger(0, [
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 120
      }),
      Animated.timing(this.state.contentHeight, {
        toValue: 0,
        duration: 120
      })
    ]).start(() => {
      this.props.onCloseEnd();
      this.setState({
        isVisiable: false,
        activateIndex: -1,
        opacity: new Animated.Value(0),
        contentHeight: new Animated.Value(0)
      });
    });
  };

  renderHeaders = () => {
    return this.props.headers.map(
      (item, idx) =>
        this.props.renderHeaderItem ? (
          this.props.renderHeaderItem(
            item,
            idx,
            this.state.activateIndex === idx
          )
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.handleOnItemClick(idx)}
            style={[styles.headerItem]}
            key={item.key}
          >
            <View
              style={[
                styles.headerItemInside,
                {
                  borderRightWidth:
                    idx === this.props.headers.length - 1 ? 0 : 0.5
                }
              ]}
            >
              <Text
                style={{
                  color:
                    this.state.activateIndex === idx
                      ? this.props.activeTextColor
                      : "rgba(0,0,0,0.45)"
                }}
              >
                {item.title}
              </Text>
              <Arrow active={this.state.activateIndex === idx} />
            </View>
          </TouchableOpacity>
        )
    );
  };

  renderContent = () => {
    return (
      <Animated.View
        style={{ height: this.state.contentHeight, backgroundColor: "white" }}
      >
        {this.props.children[this.state.activateIndex]}
      </Animated.View>
    );
  };

  render() {
    const Header = ({ style }) => (
      <View
        ref={node => (this._headerRoot = node)}
        style={[styles.headers, style]}
      >
        {this.renderHeaders()}
      </View>
    );

    const backdropStyle = { opacity: this.state.opacity };

    return (
      <React.Fragment>
        <Header />
        <Modal
          transparent={Platform.select({ ios: false, android: true })}
          onRequestClose={() => this.close()}
          visible={this.state.isVisiable}
        >
          <Header
            style={{
              marginTop: this.state.headerPosition.y
            }}
          />
          {this.renderContent()}
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.backdropContainer]}
            onPress={this.close}
          >
            <Animated.View style={[styles.backdrop, backdropStyle]} />
          </TouchableOpacity>
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center"
  },
  headers: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(150,150,150,0.1)",
    backgroundColor: "white"
  },
  headerItem: {
    flex: 1,
    paddingVertical: 8
  },
  headerItemInside: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "rgba(150,150,150,0.1)"
  },
  backdropContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: -1
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    left: 0,
    top: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  },
  arrow: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    height: 6,
    width: 6,
    marginLeft: 8,

    borderColor: "rgba(0,0,0,0.45)"
  }
});
