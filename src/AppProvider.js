import React, { Component } from 'react';
import Context from './context/Context';
import Axios from 'axios';

class AppProvider extends Component {
  state = {
    initialData: []
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    Axios.get(`http://frontend.interview.dingi.work/user/data/`, {
      headers: { Authorization: `JWT ${token}` }
    })
      .then(res => {
        this.setState({ initialData: res.data });
      })
      .catch(console.log);
  }
  render() {
    const getUniqData = mixData => Array.from(new Set(mixData)).sort();

    const allDates = this.state.initialData.map(item => {
      return item.date;
    });
    const allProducts = this.state.initialData.map(item => {
      return item.product;
    });
    const allDistrict = this.state.initialData.map(item => {
      return item.district;
    });

    const setOfDistrict = getUniqData(allDistrict);
    const setOfDates = getUniqData(allDates);
    const setOfProducts = getUniqData(allProducts);

    const getFilterData = (category, dataItem) => {
      return category.map(item => {
        return setOfDates.map(date => {
          const dateArray = this.state.initialData
            .filter(singleData => {
              if (singleData.date === date && singleData[dataItem] === item) {
                // console.log(singleData.order_quantity);
                return singleData?.order_quantity;
              }
            })
            .map(item => {
              return item.order_quantity;
            });

          return dateArray.length > 0 ? dateArray.reduce((acc, curr) => acc + curr) : 0;
        });
      });
    };
    const getChartData = (label, data) => {
      return {
        type: 'bar',
        data: {
          labels: setOfDates,
          datasets: [
            {
              label: label[0],
              data: data[0],
              backgroundColor: 'rgba(140, 114, 114, 0.8)',
              hoverBackgroundColor: 'rgba(56, 45, 45, 0.8)'
            },
            {
              label: label[1],
              data: data[1],
              backgroundColor: 'rgba(16, 135, 171, 0.5)',
              hoverBackgroundColor: 'rgba(16, 135, 171, 0.65)'
            },
            {
              label: label[2],
              data: data[2],
              backgroundColor: 'rgba(16, 65, 171, 0.65)',
              hoverBackgroundColor: 'rgba(16, 65, 171, 0.35)'
            },
            {
              label: label[3],
              data: data[3],
              backgroundColor: 'rgba(122, 16, 171, 0.64)',
              hoverBackgroundColor: 'rgba(122, 16, 171, 0.54)'
            }
          ]
        },
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize: 11
                },
                scaleLabel: {
                  display: false
                },
                gridLines: {},
                stacked: true
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: '#fff',
                  zeroLineColor: '#fff',
                  zeroLineWidth: 0
                },
                ticks: {
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize: 11
                },
                stacked: true
              }
            ]
          }
        }
      };
    };
    const getPieData = (labels, data) => {
      return {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: '# of Votes',
              data: data.map(arrOfSales => {
                return arrOfSales.reduce((acc, curr) => acc + curr);
              }),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
    };
    const salesDataFilter = getFilterData(setOfProducts, 'product');
    const customerDataFilter = getFilterData(setOfDistrict, 'district');

    const salesBarData = getChartData(setOfProducts, salesDataFilter);
    const customerBarData = getChartData(setOfDistrict, customerDataFilter);
    const salesPaiData = getPieData(setOfProducts, salesDataFilter);
    const customerPaiData = getPieData(setOfDistrict, customerDataFilter);

    const dingiData = this.state.initialData;

    const value = {
      salesBarData,
      salesPaiData,
      customerBarData,
      customerPaiData,
      dingiData
    };

    return <Context.Provider value={value}>{this.props.children}</Context.Provider>;
  }
}

export default AppProvider;
