// import React, { useEffect, useState } from 'react';
// import './App.css';
// import List from './components/List';
// import withListLoading from './components/withListLoading';
// import axios from 'axios'

// function App() {
//   const ListLoading = withListLoading(List);
//   const [appState, setAppState] = useState({
//     loading: false,
//     busRoutes: null,
//     selectedBusRoute: null,
//   });

//   useEffect(() => {
//     setAppState({ loading: true });
//     const apiUrl = 'https://svc.metrotransit.org/nextripv2/routes';
//     axios.get(apiUrl).then((busRoutes) => {
//       const allbusRoutes = busRoutes.data;
//       console.log(allbusRoutes)
//       setAppState({ loading: false, busRoutes: allbusRoutes });
//     });
//   }, [setAppState]);

//   return (
//     <div className='App'>
//       <div className='container'>
//         <h1>My busRoutesitories</h1>
//       </div>
//       <div className='busRoute-container'>
//         <ListLoading isLoading={appState.loading} busRoutes={appState.busRoutes} />
//       </div>
//     </div>
//   );
// }
// export default App;

import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      id: "",
      name: '',
      // selectDirection:'',
      // selectDirection:[]
    }
  }

 async getOptions(){
    const res = await axios.get('https://svc.metrotransit.org/nextripv2/routes')
    const data = res.data

    const options = data.map(r => ({
      "value" : r.route_id,
      "label" : r.route_label
    }))

    this.setState({selectOptions: options})

  }

  // getDirections(){
  //   const dir = await axios.get(`https://svc.metrotransit.org/nextripv2/directions/{id}`)
  //   const dirData = dir.data

  //   const dirOptions = dirData.map(d => ({
  //     "value" : d.direction_id,
  //     "label" : d.direction_name
  //   }))

  //   this.setState({selectedDirection: dirOptions})

  // }

  getDirections() {
    console.log(this.state.id)
    axios.get(`https://svc.metrotransit.org/nextripv2/directions/{id}`).then(res => {
       console.log(res)
    });

 };


  handleBusRoute(e){
   this.setState({id:e.value, name:e.label})
   this.getDirections()
  }


  handleDirection(e){
    this.setState({id:e.value, name:e.label})
   }

  componentDidMount(){
      this.getOptions()
  }




  render() {
    console.log(this.state.selectOptions)
    return (
      <div>
        <Select options={this.state.selectOptions} onChange={this.handleBusRoute.bind(this)} />
        <Select disabled={!this.state.id} />
        <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>
      </div>
    )
  }
}