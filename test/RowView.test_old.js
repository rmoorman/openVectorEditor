import {mount} from 'enzyme'
import React from 'react'
import {RowView, RowViewUnconnected, updateEditor} from '../src'
import HarnessComponent from './HarnessComponent'
import testStore from './testStore'
import exampleSequenceData from '../src/createVectorEditor/exampleSequenceData'

class Wrapper extends React.Component {
  render(){
    return <HarnessComponent>
      <RowView editorName={'testEditor'}></RowView>
    </HarnessComponent>
  }
}

describe('RowView', function() {
  it('renders with no data', function() {
    const node = mount(
      <Wrapper></Wrapper>
    );
    node.exists()
  })
  it('renders with data', function() {
    updateEditor(testStore, 'testEditor', {
      sequenceData: exampleSequenceData,
      readOnly: false
    })

    const node = mount(
      <Wrapper></Wrapper>
    );
    const subnode = node.find(RowViewUnconnected)
    const p = subnode.props()
  })

})