import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getTableFields,
  updateCustomQuery,
  getTableNames
} from '../../store/customizedQueryReducer'
import CustomizedQuerySelect from './CustomizedQuerySelect'
import _ from 'lodash'

export class CustomizedQueryTable extends Component {
  constructor() {
    super()
    this.state = {
      selectedTable: '',
      count: [1]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  componentDidMount() {
    this.props.loadTableNames()
  }

  handleChange(event) {
    this.props.loadTableFields(event.target.value)

    this.setState({
      selectedTable: event.target.value
    })

    this.props.updateCustomQuery({
      tableName: event.target.value
    })
  }

  handleAddClick() {
    this.setState({count: [...this.state.count, 1]})
  }

  handleRemoveClick() {
    let updatedState = [...this.state.count]
    updatedState.pop()
    this.setState({count: updatedState})
  }
  render() {
    console.log('TABLE PROPS', this.props)
    console.log('TABLE STATE', this.state)

    const tableNames = this.props.tableNames
    const customQuery = this.props.customQuery
    const selectedTable = this.state.selectedTable
    const selectedColumns = this.props.tableFields
    // const menus = 'menus'
    // const waiters = 'waiters'
    return (
      <div className="custom-analytics-container">
        <select onChange={() => this.handleChange(event)}>
          <option>Please Select</option>
          {tableNames.map((element, idx) => {
            return (
              <option value={element} key={idx}>
                {_.capitalize(element)}
              </option>
            )
          })}
        </select>
        <div>
          {customQuery && customQuery.length ? (
            <div>
              <CustomizedQuerySelect
                selectedTable={customQuery[customQuery.length - 1].tableName}
              />
            </div>
          ) : null}
          {/* <CustomizedQuerySelect selectedTable={menus} />
          <CustomizedQuerySelect selectedTable={waiters} />
          <CustomizedQuerySelect selectedTable={menus} /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tableNames: state.customizedQuery.metaData.map(element => {
      return Object.keys(element)[0]
    }),
    tableFields: state.customizedQuery.tableFields,
    customQuery: state.customizedQuery.customQuery
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadTableNames: () => {
      dispatch(getTableNames())
    },
    loadTableFields: tableName => {
      dispatch(getTableFields(tableName))
    },
    updateCustomQuery: queryObject => {
      dispatch(updateCustomQuery(queryObject))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  CustomizedQueryTable
)

// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getTableFields} from '../../store/customizedQueryReducer'
// import CustomizedQuerySelect from './CustomizedQuerySelect'
// import CustomizedQueryJoin from './CustomizedQueryJoin'

// export class CustomizedQueryPage extends Component {
//   constructor() {
//     super()
//     this.state = {
//       selectedTable: '',
//       count: [1]
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleAddClick = this.handleAddClick.bind(this)
//     this.handleRemoveClick = this.handleRemoveClick.bind(this)
//   }

//   handleChange(event) {
//     this.props.loadTableFields(event.target.value)
//     this.setState({selectedTable: event.target.value})
//   }

//   handleAddClick() {
//     this.setState({count: [...this.state.count, 1]})
//   }

//   handleRemoveClick() {
//     let updatedState = [...this.state.count]
//     updatedState.pop()
//     this.setState({count: updatedState})
//   }
//   render() {
//     const selectedTable = this.state.selectedTable
//     const selectedColumns = this.props.tableFields
//     return (
//       <div className="custom-analytics-container">
//         <select onChange={() => this.handleChange(event)}>
//           <option>Please Select</option>
//           <option value="menus">Menu</option>
//           <option value="waiters">Waiters</option>
//           <option value="orders">Orders</option>
//         </select>
//         <div>
//           {/* {selectedTable ? (
//             <CustomizedQueryJoin selectedTable={selectedTable} />
//           ) : null} */}
//           {selectedColumns.length ? (
//             <div>
//               <div>
//                 {this.state.count.map((element, index) => {
//                   return (
//                     <div key={index}>
//                       <CustomizedQuerySelect
//                         selectedTable={selectedTable}
//                         columnNames={selectedColumns}
//                       />
//                     </div>
//                   )
//                 })}
//               </div>
//               {this.state.count.length < selectedColumns.length ? (
//                 <button type="button" onClick={() => this.handleAddClick()}>
//                   Add
//                 </button>
//               ) : null}
//               {this.state.count.length ? (
//                 <button type="button" onClick={() => this.handleRemoveClick()}>
//                   Remove
//                 </button>
//               ) : null}
//             </div>
//           ) : null}
//         </div>
//         <div>
//           <button type="button">Join</button>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     tableFields: state.customizedQuery.tableFields
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadTableFields: tableName => {
//       dispatch(getTableFields(tableName))
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(CustomizedQueryPage)