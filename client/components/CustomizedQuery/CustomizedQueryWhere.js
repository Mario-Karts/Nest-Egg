import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getValueOptionsForString} from '../../store/customizedQueryReducer'
import IntegersInputField from './IntegersInputField'
import TimeFrameField from './TimeFrameField'
import CheckBoxField from './CheckBoxField'

class CustomizedQueryWhere extends Component {
  render() {
    const {selectedTable, selectedColumn, metaData} = this.props

    const {options, dataType} = optionsMapping(
      selectedTable,
      selectedColumn,
      metaData
    )

    const isIntegerField = dataType === 'integer'

    return (
      <div>
        {options.length ? (
          <div>
            <h3>WHERE:</h3>
            {/* <select onChange={() => this.handleSelect(event)} multiple>
              <option defaultValue>Please Select</option>
              {options.length &&
                options.map((valueOptionName, idx) => {
                  return (
                    <option type="checkbox" key={idx} value={valueOptionName}>
                      {formatValueOptionName(valueOptionName)}
                    </option>
                  )
                })}
            </select> */}
            <CheckBoxField options={options} />
          </div>
        ) : (
          <div>
            {isIntegerField ? (
              <IntegersInputField dataType={dataType} />
            ) : (
              <TimeFrameField dataType={dataType} />
            )}
          </div>
        )}
      </div>
    )
  }
}

function formatValueOptionName(name) {
  name = name.replace(/([A-Z])/g, ' $1') // CONVERTS NAMES OF DB COLUMNS INTO READABLE TEXT
  name = name[0].toUpperCase() + name.slice(1)
  return name
}

const mapStateToProps = state => {
  return {
    metaData: state.customizedQuery.metaData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadValueOptionsForString: (tableName, columnName) =>
      dispatch(getValueOptionsForString(tableName, columnName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CustomizedQueryWhere
)

function optionsMapping(tableName, columnName, array) {
  return array
    .filter(element => {
      return Object.keys(element)[0] === tableName
    })[0]
    [tableName].filter(columnElement => {
      return Object.keys(columnElement)[0] === columnName
    })[0][columnName]
}
