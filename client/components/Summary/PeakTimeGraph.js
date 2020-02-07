import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPeakTimeOrders} from '../../store/summaryReducer'
import {Bar} from 'react-chartjs-2'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core'
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class PeakTimeGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: 'month'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.loadPeakTimeOrders(this.state.selectedOption)
  }

  handleChange(event) {
    this.setState({selectedOption: event.target.value})
    if (!Object.keys(this.props.peakTimeOrders[event.target.value]).length) {
      this.props.loadPeakTimeOrders(event.target.value)
    }
  }

  render() {
    const labels = [
      '11am',
      '12pm',
      '1pm',
      '2pm',
      '3pm',
      '4pm',
      '5pm',
      '6pm',
      '7pm',
      '8pm',
      '9pm',
      '10pm'
    ]
    const arrPerc = this.props.peakTimeOrders[this.state.selectedOption]

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Percentage',
          data: arrPerc,
          backgroundColor: 'yellow'
        }
      ]
    }
    return (
      <div className="peak-time-div">
        <div />
        <Card
          // {...rest}
          className={clsx('classes.root, className')}
        >
          <CardHeader
            action={
              // <Button
              //   size="small"
              //   variant="text"
              // >
              //   Last 7 days <ArrowDropDownIcon />
              // </Button>
              <select onChange={this.handleChange}>
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="week">Week</option>
              </select>
            }
            title="Peak Time"
          />
          <Divider />
          <CardContent>
            <div className="classes.chartContainer">
              <Bar
                data={chartData}
                options={{
                  title: {
                    display: true,
                    text: 'Peak Times'
                  },
                  scales: {
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          suggestedMin: 35000, // minimum will be 0, unless there is a lower value.
                          // OR //
                          beginAtZero: true, // minimum value will be 0.
                          suggestedMax: 125000
                        }
                      }
                    ]
                  }
                }}
              />
            </div>
          </CardContent>
          <Divider />
          <CardActions className="classes.actions">
            <Button color="primary" size="small" variant="text">
              {/* Overview <ArrowRightIcon /> */}
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    peakTimeOrders: state.summary.peakTimeOrdersVsTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPeakTimeOrders: timeInterval =>
      dispatch(getPeakTimeOrders(timeInterval))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeakTimeGraph)

// import { data, options } from './chart';

// const useStyles = makeStyles(() => ({
//   root: {},
//   chartContainer: {
//     height: 400,
//     position: 'relative'
//   },
//   actions: {
//     justifyContent: 'flex-end'
//   }
// }));

// const LatestSales = props => {
//   const { className, ...rest } = props;

//   const classes = useStyles();

//   return (

//   );
// };
