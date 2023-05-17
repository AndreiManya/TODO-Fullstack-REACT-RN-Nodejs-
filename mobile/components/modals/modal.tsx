import React from 'react';
import { 
    Modal, 
    StyleSheet, 
    Text, 
    Pressable, 
    View,
    TextInput
} from 'react-native';

export interface ModalProps {
    value?: string,
    changeValue: Function,
    open: boolean,
    onOk: Function, 
    onCancel: Function
}

const EditModal = ({open, changeValue, value, onOk, onCancel}: ModalProps) => {
  return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <TextInput
                        style={styles.input}
                        inputMode="text"
                        value={value}
                        onChangeText={(e) => changeValue(e)}
                    />
                    <View
                        style={{flexDirection: 'row', marginTop: 20}}
                    >
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => onCancel()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonSub]}
                            onPress={() => value && onOk()}
                        >
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'red',
    marginRight: 20
  },
  buttonSub: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: { 
    width: 200,
    height: 50,
    padding: 8,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10
  }
});

export default EditModal;