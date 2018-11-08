import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../component/text';
import { InputField } from '../component/field';
import { color, font } from '../component/style';

//
// Seed Entry
//

const entryStyles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    borderBottomColor: color.greyText,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  index: {
    color: color.greyText,
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM,
    width: 35,
  },
  input: {
    flex: 1,
    textAlign: 'left',
    borderBottomWidth: 0,
  },
});

class SeedEntry extends Component {
  focus() {
    this._input.focus();
  }

  render() {
    const { seedIndex, ...props } = this.props;
    return (
      <View style={entryStyles.wrapper}>
        <Text style={entryStyles.index}>{seedIndex}.</Text>
        <InputField
          ref={component => (this._input = component)}
          style={entryStyles.input}
          {...props}
        />
      </View>
    );
  }
}

SeedEntry.propTypes = {
  seedIndex: PropTypes.number,
};

export default SeedEntry;
