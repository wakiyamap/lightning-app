import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import SeedEntry from '../component/seed-entry';
import { Button, BackButton, GlasButton } from '../component/button';
import { H1Text } from '../component/text';
import { FormSubText } from '../component/form';
import Background from '../component/background';
import MainContent from '../component/main-content';
import { Header } from '../component/header';
import Card from '../component/card';

//
// Restore Wallet Seed View
//

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    maxHeight: 350,
    maxWidth: 680,
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 50,
  },
});

class RestoreSeedView extends React.Component {
  initNextPage() {
    this.props.wallet.initNextRestorePage();
    this._input.focus();
  }

  render() {
    const { store, wallet } = this.props;
    return (
      <Background image="purple-gradient-bg">
        <Header>
          <BackButton onPress={() => wallet.initPrevRestorePage()} />
          <Button disabled onPress={() => {}} />
        </Header>
        <MainContent style={styles.content}>
          <View>
            <H1Text style={styles.title}>Restore your wallet</H1Text>
          </View>
          <Card style={styles.card}>
            <FormSubText>{store.restoreVerifyCopy}</FormSubText>
            {store.restoreVerifyIndexes.map((seedIndex, i) => (
              <SeedEntry
                seedIndex={seedIndex}
                value={store.wallet.restoreSeed[seedIndex - 1]}
                onChangeText={word =>
                  wallet.setRestoreSeed({ word, index: seedIndex - 1 })
                }
                key={i}
                autoFocus={i === 0}
                ref={component => (i === 0 ? (this._input = component) : null)}
                onSubmitEditing={() => wallet.initNextRestorePage()}
              />
            ))}
          </Card>
          <GlasButton onPress={() => this.initNextPage()}>Next</GlasButton>
        </MainContent>
      </Background>
    );
  }
}

RestoreSeedView.propTypes = {
  store: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
};

export default observer(RestoreSeedView);
