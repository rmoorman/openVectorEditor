import React, { PropTypes } from 'react';

import { Decorator as Cerebral } from 'cerebral-view-react';
import { propTypes } from './react-props-decorators.js';

const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

import AddBoxIcon from 'material-ui/lib/svg-icons/content/add-box';
import IndeterminateCheckBoxIcon from 'material-ui/lib/svg-icons/toggle/indeterminate-check-box';
import IconButton from 'material-ui/lib/icon-button';

@Cerebral({
})
@propTypes({
    data: PropTypes.object.isRequired,
    annotationType: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired
})
export default class AnnotationTable extends React.Component {

    constructor() {
        super(arguments);

        this.state = {
            selectedRows: []
        };
    }

    onRowSelection(selectedRows) {
        this.setState({ selectedRows: selectedRows });
    }

    deleteFeatures() {
        var featureIds = [];

        this.state.selectedRows.forEach(el => {
            featureIds.push(this.props.data[el].id);
        });

        this.props.signals.deleteFeatures({ featureIds: featureIds });
        this.setState({ selectedRows: [] });
    }

    addFeature() {
        this.props.signals.addAnnotations({
            annotationType: 'features',

            annotationsToInsert: [
                { name: 'unnamed feature' }
            ],

            throwErrors: false
        });
    }

    render() {
        var {
            data,
            annotationType,
            filter
        } = this.props;

        var tableHeaderCells = [];
        for (let i = 0; i < filter.length; i++) {
            tableHeaderCells.push((<TableHeaderColumn key={i}>{filter[i]}</TableHeaderColumn>));
        }

        var tableDataRows = [];
        for (let i = 0; i < data.length; i++) {
            let tableDataCells = [];
            let feature = data[i];

            for (let j = 0; j < filter.length; j++) {
                let column = filter[j];
                let data = '';

                if (feature[column] !== null && feature[column] !== undefined) {
                    data = feature[column].toString();
                }

                tableDataCells.push((<TableRowColumn key={j}>{data}</TableRowColumn>));
            }

            tableDataRows.push((<TableRow key={i} selected={this.state.selectedRows.indexOf(i) !== -1}>{tableDataCells}</TableRow>));
        }

        if (this.state.selectedRows.length === 1) {
            let displayedRow = data[this.state.selectedRows[0]];

            let rowDataItems = [];

            for (let key in displayedRow) {
                rowDataItems.push((<dt>{key}</dt>));
                rowDataItems.push((<dd>{displayedRow[key]}</dd>));
            }

            var rowDataList = React.createElement('dl', {}, rowDataItems);
        }

        if (annotationType === 'features') {
            var controls = (
                <div>
                    <IconButton onClick={this.addFeature.bind(this)} tooltip={"add"}>
                        <AddBoxIcon />
                    </IconButton>

                    <IconButton onClick={this.deleteFeatures.bind(this)} disabled={this.state.selectedRows.length === 0}tooltip={"delete"}>
                        <IndeterminateCheckBoxIcon />
                    </IconButton>
                </div>
            );
        }

        return (
            <div>
              <Table ref="annotationTable" multiSelectable={true} onRowSelection={this.onRowSelection.bind(this)}>
                <TableHeader>
                  <TableRow>{tableHeaderCells}</TableRow>
                </TableHeader>
                <TableBody>{tableDataRows}</TableBody>
              </Table>

              {controls}

              {rowDataList}
            </div>
        );
    }
}
